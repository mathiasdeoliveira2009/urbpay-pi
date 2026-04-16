import hashlib
import json
import os
import secrets
import socket
from collections import defaultdict
from datetime import date, datetime, timedelta
from decimal import Decimal
from io import BytesIO
from pathlib import Path

import qrcode
from fastapi import Depends, File, Form, HTTPException, Request, UploadFile
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer
from sqlalchemy import desc, select, text
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.orm import Session, joinedload
from starlette.middleware.sessions import SessionMiddleware

from database import SESSION_SECRET_KEY, engine, get_database_target, get_db
from models import Cartao, Movimentacao, Usuario

BASE_DIR = Path(__file__).resolve().parent
UPLOADS_DIR = BASE_DIR / "static" / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="UrbPay Portal")
app.add_middleware(SessionMiddleware, secret_key=SESSION_SECRET_KEY, same_site="lax")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
qr_signer = URLSafeTimedSerializer(SESSION_SECRET_KEY, salt="urbpay-passage")
CARD_ISSUER_NAME = "UrbPay"

QR_PATTERN = [
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1],
]

CARD_TYPES = [
    {
        "title": "Bilhete UrbPay Estudante",
        "description": "Ideal para estudantes com acesso a beneficios, identificacao e uso diario no transporte.",
        "image": "imgs/front-cartao-urb.png",
    },
    {
        "title": "Bilhete UrbPay Digital",
        "description": "Versao integrada ao perfil do cliente com QR code para validacao e consulta rapida.",
        "image": "imgs/verso-cartao-urb.png",
    },
    {
        "title": "Bilhete UrbPay Escolar",
        "description": "Pensado para instituicoes de ensino com dados do aluno, curso e controle de emissao.",
        "image": "imgs/front-cartao-urb.png",
    },
]

DASHBOARD_SERVICE_MENU = [
    {
        "key": "credito",
        "title": "Compra de credito",
        "icon_paths": [
            "M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z",
            "M3 9.5h18",
            "M7 14h4",
            "M16.5 13a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z",
            "M16.5 11.5v1",
        ],
    },
    {
        "key": "comum",
        "title": "Comum",
        "icon_paths": [
            "M5.5 4.5h13A1.5 1.5 0 0 1 20 6v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V6a1.5 1.5 0 0 1 1.5-1.5Z",
            "M4 9h16",
            "M7 15h5",
        ],
    },
    {
        "key": "estudante",
        "title": "Estudante",
        "icon_paths": [
            "M3 9.5L12 5l9 4.5L12 14L3 9.5Z",
            "M6.5 11.2v4.2L12 18l5.5-2.6v-4.2",
            "M21 9.5v4.7",
        ],
    },
    {
        "key": "professor",
        "title": "Professor",
        "icon_paths": [
            "M6 5.5h10a2 2 0 0 1 2 2v7H8a2 2 0 0 0-2 2V5.5Z",
            "M8 16.5a2 2 0 0 0-2-2H4.5V8A2.5 2.5 0 0 1 7 5.5",
            "M10.5 9h4.5",
            "M10.5 12h3.5",
            "M15.8 18.5l1.1-2.3 2.3-1.1-2.3-1.1-1.1-2.3-1.1 2.3-2.3 1.1 2.3 1.1 1.1 2.3Z",
        ],
    },
]

HOW_IT_WORKS = [
    {
        "title": "Cadastro simples",
        "description": "Crie sua conta, envie sua foto e deixe seu perfil pronto para o cartao digital.",
    },
    {
        "title": "Login salvo",
        "description": "Depois do cadastro, o acesso fica associado ao seu CPF e a sessao permanece ativa no navegador.",
    },
    {
        "title": "Dashboard ativo",
        "description": "Ao entrar, o cliente vai para uma area logada com saldo, gastos recentes e QR Code de passagem.",
    },
    {
        "title": "Simulacao de catraca",
        "description": "O QR Code abre uma pagina de confirmacao e registra a passagem no historico do cartao.",
    },
]

STATUS_MESSAGES = {
    "signup-success": ("success", "Cadastro realizado com sucesso. Sua conta ja entrou no dashboard."),
    "login-success": ("success", "Login realizado com sucesso."),
    "logout-success": ("success", "Sessao encerrada."),
    "qr-ready": ("success", "QR Code pronto para simular a passagem."),
    "qr-success": ("success", "Pagamento efetuado, passagem liberada."),
    "qr-failed": ("error", "Nao foi possivel concluir a passagem com o saldo atual."),
}

DEFAULT_PASSAGE_VALUE = Decimal("4.40")
INITIAL_TOPUP = Decimal("50.00")
QR_TOKEN_MAX_AGE_SECONDS = 300
ACTIVE_QR_AUTHORIZATIONS: dict[int, dict[str, object]] = {}
QR_STATUS_DETAILS = {
    "created": {
        "label": "QR gerado",
        "title": "Aguardando leitura",
        "message": "A simulacao fica esperando o cliente abrir o QR Code.",
        "appearance": "pending",
        "is_final": False,
    },
    "opened": {
        "label": "Solicitacao aberta",
        "title": "Cliente visualizando a compra",
        "message": "A tela do passageiro foi aberta e aguarda o clique em Comprar passagem.",
        "appearance": "active",
        "is_final": False,
    },
    "approved": {
        "label": "Catraca liberada",
        "title": "Passagem aprovada",
        "message": "Saldo debitado com sucesso. A catraca pode liberar o embarque.",
        "appearance": "success",
        "is_final": True,
    },
    "failed": {
        "label": "Saldo insuficiente",
        "title": "Passagem recusada",
        "message": "O cartao nao tinha saldo suficiente para concluir a compra.",
        "appearance": "error",
        "is_final": True,
    },
    "expired": {
        "label": "QR expirado",
        "title": "Solicitacao expirada",
        "message": "O tempo da leitura terminou. Gere um novo QR Code para tentar novamente.",
        "appearance": "warning",
        "is_final": True,
    },
    "replaced": {
        "label": "Novo QR gerado",
        "title": "Solicitacao substituida",
        "message": "Um novo QR Code foi emitido e esta solicitacao deixou de ser a ativa.",
        "appearance": "muted",
        "is_final": True,
    },
    "inactive": {
        "label": "Solicitacao encerrada",
        "title": "Acompanhamento indisponivel",
        "message": "Nao ha mais uma solicitacao ativa vinculada a este QR Code.",
        "appearance": "muted",
        "is_final": True,
    },
    "invalid": {
        "label": "QR invalido",
        "title": "Token nao reconhecido",
        "message": "Nao foi possivel identificar esta solicitacao de passagem.",
        "appearance": "error",
        "is_final": True,
    },
}


def normalize_digits(value: str) -> str:
    return "".join(char for char in value if char.isdigit())


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 120000).hex()
    return f"{salt}${digest}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        salt, digest = stored_hash.split("$", maxsplit=1)
    except ValueError:
        return False

    check = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 120000).hex()
    return secrets.compare_digest(check, digest)


def build_card_number() -> str:
    return f"6270{secrets.randbelow(10**12):012d}"


def build_cvv(user_id: int) -> str:
    seed = f"{SESSION_SECRET_KEY}:{user_id}:cvv".encode("utf-8")
    digest = hashlib.sha256(seed).hexdigest()
    return f"{int(digest[:16], 16) % (10**10):010d}"


def save_profile_image(upload: UploadFile | None) -> str | None:
    if not upload or not upload.filename:
        return None

    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    extension = Path(upload.filename).suffix.lower()
    if extension not in allowed_extensions:
        raise ValueError("Envie uma imagem JPG, PNG ou WEBP.")

    filename = f"{secrets.token_hex(12)}{extension}"
    destination = UPLOADS_DIR / filename

    with destination.open("wb") as file_object:
        file_object.write(upload.file.read())

    return f"uploads/{filename}"


def format_card_number(number: str) -> str:
    return " ".join(number[index:index + 4] for index in range(0, len(number), 4))


def format_membership_id(user_id: int) -> str:
    return f"URB-{user_id}"


def format_birth_date(value: date | None) -> str:
    if not value:
        return "Nao informada"
    return value.strftime("%d/%m/%Y")


def format_cpf(value: str) -> str:
    digits = normalize_digits(value)
    if len(digits) != 11:
        return value
    return f"{digits[:3]}.{digits[3:6]}.{digits[6:9]}-{digits[9:]}"


def mask_sensitive(value: str, *, visible_digits: int = 4) -> str:
    if len(value) <= visible_digits:
        return value
    hidden = max(len(value) - visible_digits, 0)
    return ("*" * hidden) + value[-visible_digits:]


def build_profile_identity(user: Usuario, card: Cartao | None) -> dict:
    return {
        "membership_id": format_membership_id(user.id_usuario),
        "issuer_name": CARD_ISSUER_NAME,
        "full_name": user.nome,
        "birth_date_display": format_birth_date(user.data_nascimento),
        "cpf_display": format_cpf(user.cpf),
        "cpf_masked": f"***.***.***-{user.cpf[-2:]}",
        "email_display": user.email,
        "email_masked": mask_sensitive(user.email, visible_digits=min(8, len(user.email))),
        "card_number_display": format_card_number(card.numero_cartao) if card else "--",
        "card_number_masked": format_card_number(mask_sensitive(card.numero_cartao, visible_digits=4)) if card else "--",
        "phone_display": user.telefone or "Nao informado",
        "phone_masked": mask_sensitive(user.telefone, visible_digits=3) if user.telefone else "Nao informado",
    }


def calculate_age(birth_date: date | None) -> int | None:
    if not birth_date:
        return None
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))


def infer_card_badge(user: Usuario, card: Cartao | None) -> dict[str, str]:
    printed_name = (card.nome_impresso or "").upper() if card else ""
    age = calculate_age(user.data_nascimento)

    if "PROF" in printed_name:
        return {"label": "Professor", "service_key": "professor"}
    if "ESTUD" in printed_name or (age is not None and age <= 24):
        return {"label": "Estudante", "service_key": "estudante"}
    if age is not None and age >= 60:
        return {"label": "Pessoa Idosa", "service_key": "idosa"}
    return {"label": "Comum", "service_key": "comum"}


def build_dashboard_cards(user: Usuario, cards: list[Cartao]) -> list[dict[str, str]]:
    if not cards:
        return []

    items: list[dict[str, str]] = []
    for card in cards:
        badge = infer_card_badge(user, card)
        items.append(
            {
                "id": str(card.id_cartao),
                "badge": badge["label"],
                "service_key": badge["service_key"],
                "display_name": card.nome_impresso or user.nome.upper(),
                "cvv": card.cvv,
                "card_number_masked": format_card_number(mask_sensitive(card.numero_cartao, visible_digits=4)),
                "card_number_full": format_card_number(card.numero_cartao),
                "balance": currency(card.saldo),
                "balance_value": f"{Decimal(str(card.saldo)).quantize(Decimal('0.01'))}",
                "validity": card.data_validade.strftime("%m/%Y"),
            }
        )
    return items


def get_user_cards(db: Session, user_id: int) -> list[Cartao]:
    statement = (
        select(Cartao)
        .where(Cartao.id_usuario == user_id)
        .order_by(Cartao.id_cartao)
    )
    return list(db.scalars(statement))


def build_dashboard_services(active_service_key: str | None) -> list[dict[str, object]]:
    services: list[dict[str, object]] = []
    for item in DASHBOARD_SERVICE_MENU:
        services.append(
            {
                **item,
                "is_active": item["key"] == active_service_key,
            }
        )
    return services


def ensure_database_schema() -> None:
    from models import Base

    Base.metadata.create_all(bind=engine)

    with engine.begin() as connection:
        has_profile_photo = connection.execute(
            text("SHOW COLUMNS FROM usuarios LIKE 'foto_perfil'")
        ).fetchone()
        if not has_profile_photo:
            connection.execute(text("ALTER TABLE usuarios ADD COLUMN foto_perfil VARCHAR(255)"))

        has_birth_date = connection.execute(
            text("SHOW COLUMNS FROM usuarios LIKE 'data_nascimento'")
        ).fetchone()
        if not has_birth_date:
            connection.execute(text("ALTER TABLE usuarios ADD COLUMN data_nascimento DATE NULL"))


@app.on_event("startup")
def startup_tasks() -> None:
    ensure_database_schema()


def get_user_from_session(request: Request, db: Session) -> Usuario | None:
    user_id = request.session.get("user_id")
    if not user_id:
        return None

    statement = (
        select(Usuario)
        .options(joinedload(Usuario.cartao))
        .where(Usuario.id_usuario == int(user_id))
    )
    return db.scalar(statement)


def require_user(request: Request, db: Session) -> Usuario:
    user = get_user_from_session(request, db)
    if not user:
        raise HTTPException(status_code=303, detail="Login required")
    return user


def currency(value: Decimal | float | None) -> str:
    amount = Decimal(str(value or 0)).quantize(Decimal("0.01"))
    return f"{amount:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def create_movement(
    db: Session,
    card: Cartao,
    *,
    amount: Decimal,
    operation_type: str,
    status: str,
    location: str,
) -> Movimentacao:
    movement = Movimentacao(
        valor=amount,
        tipo_operacao=operation_type,
        status_operacao=status,
        localizacao_operacao=location,
        id_cartao=card.id_cartao,
    )
    db.add(movement)
    return movement


def seed_initial_activity(db: Session, card: Cartao) -> None:
    card.saldo = INITIAL_TOPUP - DEFAULT_PASSAGE_VALUE
    create_movement(
        db,
        card,
        amount=INITIAL_TOPUP,
        operation_type="RECARGA",
        status="APROVADO",
        location="Recarga de boas-vindas",
    )
    create_movement(
        db,
        card,
        amount=DEFAULT_PASSAGE_VALUE,
        operation_type="DEBITO",
        status="APROVADO",
        location="Terminal Central UrbPay",
    )


def get_recent_movements(db: Session, card_id: int, limit: int = 6) -> list[Movimentacao]:
    statement = (
        select(Movimentacao)
        .where(Movimentacao.id_cartao == card_id)
        .order_by(desc(Movimentacao.data_movimentacao))
        .limit(limit)
    )
    return list(db.scalars(statement))


def get_all_movements(db: Session, card_id: int) -> list[Movimentacao]:
    statement = (
        select(Movimentacao)
        .where(Movimentacao.id_cartao == card_id)
        .order_by(desc(Movimentacao.data_movimentacao))
    )
    return list(db.scalars(statement))


def build_qr_token(user: Usuario, amount: Decimal = DEFAULT_PASSAGE_VALUE) -> str:
    issued_at = datetime.utcnow()
    expires_at = issued_at + timedelta(seconds=QR_TOKEN_MAX_AGE_SECONDS)
    nonce = secrets.token_hex(16)
    payload = {
        "user_id": user.id_usuario,
        "card_id": user.cartao.id_cartao if user.cartao else None,
        "amount": str(amount),
        "issued_at": issued_at.isoformat(),
        "nonce": nonce,
    }
    ACTIVE_QR_AUTHORIZATIONS[user.id_usuario] = {
        "nonce": nonce,
        "card_id": user.cartao.id_cartao if user.cartao else None,
        "amount": str(amount),
        "issued_at": issued_at,
        "expires_at": expires_at,
        "status": "created",
        "opened_at": None,
        "processed_at": None,
        "updated_at": issued_at,
        "result_balance": None,
        "used": False,
    }
    return qr_signer.dumps(payload)


def decode_qr_token(token: str) -> dict:
    try:
        payload = qr_signer.loads(token, max_age=QR_TOKEN_MAX_AGE_SECONDS)
    except SignatureExpired as exc:
        raise HTTPException(status_code=400, detail="Este QR Code expirou. Gere uma nova passagem.") from exc
    except BadSignature as exc:
        raise HTTPException(status_code=400, detail="QR Code invalido ou expirado.") from exc
    return payload


def decode_qr_token_unbounded(token: str) -> dict:
    try:
        payload = qr_signer.loads(token)
    except BadSignature as exc:
        raise HTTPException(status_code=400, detail="QR Code invalido ou expirado.") from exc
    return payload


def validate_qr_authorization(payload: dict) -> dict:
    user_id = int(payload["user_id"])
    authorization = ACTIVE_QR_AUTHORIZATIONS.get(user_id)
    if not authorization:
        raise HTTPException(status_code=400, detail="A autorizacao desta passagem nao esta mais ativa.")

    expires_at = authorization["expires_at"]
    if isinstance(expires_at, datetime) and datetime.utcnow() > expires_at:
        authorization["status"] = "expired"
        authorization["updated_at"] = datetime.utcnow()
        raise HTTPException(status_code=400, detail="Este QR Code expirou. Gere uma nova passagem.")

    if authorization.get("used"):
        raise HTTPException(status_code=400, detail="Este QR Code ja foi utilizado.")

    if (
        authorization.get("nonce") != payload.get("nonce")
        or int(authorization.get("card_id") or 0) != int(payload.get("card_id") or 0)
        or str(authorization.get("amount")) != str(payload.get("amount"))
    ):
        raise HTTPException(status_code=400, detail="A autorizacao desta passagem nao confere com o token atual.")

    return authorization


def update_qr_authorization(user_id: int, **changes: object) -> dict[str, object] | None:
    authorization = ACTIVE_QR_AUTHORIZATIONS.get(user_id)
    if authorization:
        authorization.update(changes)
    return authorization


def mark_qr_authorization_used(user_id: int, *, status: str, balance: Decimal | None = None) -> None:
    authorization = ACTIVE_QR_AUTHORIZATIONS.get(user_id)
    if authorization:
        processed_at = datetime.utcnow()
        authorization["used"] = True
        authorization["status"] = status
        authorization["processed_at"] = processed_at
        authorization["updated_at"] = processed_at
        if balance is not None:
            authorization["result_balance"] = str(balance.quantize(Decimal("0.01")))


def build_qr_status_snapshot(user: Usuario | None, token: str) -> dict[str, object]:
    now = datetime.utcnow()

    try:
        payload = decode_qr_token_unbounded(token)
    except HTTPException:
        payload = {"amount": str(DEFAULT_PASSAGE_VALUE)}
        status_code = "invalid"
        authorization = None
    else:
        user_id = int(payload["user_id"])
        authorization = ACTIVE_QR_AUTHORIZATIONS.get(user_id)

        if not authorization:
            status_code = "inactive"
        elif (
            authorization.get("nonce") != payload.get("nonce")
            or int(authorization.get("card_id") or 0) != int(payload.get("card_id") or 0)
            or str(authorization.get("amount")) != str(payload.get("amount"))
        ):
            status_code = "replaced"
        else:
            expires_at = authorization.get("expires_at")
            if (
                isinstance(expires_at, datetime)
                and now > expires_at
                and not authorization.get("used")
            ):
                authorization["status"] = "expired"
                authorization["updated_at"] = now

            status_code = str(authorization.get("status") or "created")

    descriptor = QR_STATUS_DETAILS.get(status_code, QR_STATUS_DETAILS["inactive"])
    amount = Decimal(str(payload.get("amount") or DEFAULT_PASSAGE_VALUE)).quantize(Decimal("0.01"))
    expires_at = authorization.get("expires_at") if authorization else None
    opened_at = authorization.get("opened_at") if authorization else None
    processed_at = authorization.get("processed_at") if authorization else None
    remaining_seconds = 0

    if isinstance(expires_at, datetime) and status_code in {"created", "opened"}:
        remaining_seconds = max(0, int((expires_at - now).total_seconds()))

    if user and user.cartao:
        balance_value = Decimal(str(user.cartao.saldo)).quantize(Decimal("0.01"))
    elif authorization and authorization.get("result_balance") is not None:
        balance_value = Decimal(str(authorization["result_balance"])).quantize(Decimal("0.01"))
    else:
        balance_value = Decimal("0.00")

    return {
        "code": status_code,
        "label": descriptor["label"],
        "title": descriptor["title"],
        "message": descriptor["message"],
        "appearance": descriptor["appearance"],
        "is_final": bool(descriptor["is_final"]),
        "can_poll": status_code in {"created", "opened"},
        "amount": currency(amount),
        "balance": currency(balance_value),
        "expires_at": expires_at.isoformat() if isinstance(expires_at, datetime) else None,
        "opened_at": opened_at.isoformat() if isinstance(opened_at, datetime) else None,
        "processed_at": processed_at.isoformat() if isinstance(processed_at, datetime) else None,
        "remaining_seconds": remaining_seconds,
    }


def build_history_analytics(movements: list[Movimentacao]) -> dict:
    monthly_totals: dict[str, dict[str, float]] = defaultdict(lambda: {"DEBITO": 0.0, "RECARGA": 0.0})
    status_counts: dict[str, int] = defaultdict(int)
    location_counts: dict[str, int] = defaultdict(int)
    timeline: list[dict[str, object]] = []
    spent_total = Decimal("0.00")
    topup_total = Decimal("0.00")
    approved_total = 0

    ordered_movements = sorted(movements, key=lambda item: item.data_movimentacao)

    for item in ordered_movements:
        amount = Decimal(str(item.valor)).quantize(Decimal("0.01"))
        month_key = item.data_movimentacao.strftime("%b/%y").upper()
        monthly_totals[month_key][item.tipo_operacao] += float(amount)
        status_counts[item.status_operacao] += 1
        location_counts[item.localizacao_operacao or "Rede UrbPay"] += 1

        if item.tipo_operacao == "DEBITO":
            spent_total += amount
        else:
            topup_total += amount

        if item.status_operacao == "APROVADO":
            approved_total += 1

        timeline.append(
            {
                "label": item.data_movimentacao.strftime("%d/%m"),
                "amount": float(amount),
                "type": item.tipo_operacao,
                "status": item.status_operacao,
                "location": item.localizacao_operacao or "Rede UrbPay",
            }
        )

    recent_timeline = timeline[-8:]
    average_ticket = (spent_total / approved_total).quantize(Decimal("0.01")) if approved_total else Decimal("0.00")
    monthly_series = [
        {
            "label": label,
            "debit": values["DEBITO"],
            "topup": values["RECARGA"],
        }
        for label, values in list(monthly_totals.items())[-6:]
    ]
    locations_series = [
        {"label": label, "value": value}
        for label, value in sorted(location_counts.items(), key=lambda pair: pair[1], reverse=True)[:5]
    ]

    return {
        "summary": {
            "total_movements": len(movements),
            "approved_count": approved_total,
            "failed_count": status_counts["SALDO_INSUFICIENTE"] + status_counts["RECUSADO"],
            "spent_total": currency(spent_total),
            "topup_total": currency(topup_total),
            "average_ticket": currency(average_ticket),
        },
        "charts": {
            "monthly": monthly_series,
            "status": [
                {"label": "Aprovado", "value": status_counts["APROVADO"]},
                {"label": "Saldo insuficiente", "value": status_counts["SALDO_INSUFICIENTE"]},
                {"label": "Recusado", "value": status_counts["RECUSADO"]},
            ],
            "locations": locations_series,
            "timeline": recent_timeline,
        },
    }


def build_landing_context(
    request: Request,
    *,
    status: str | None = None,
    form_error: str | None = None,
    open_signup_modal: bool = False,
) -> dict:
    status_kind, status_message = STATUS_MESSAGES.get(status, (None, None))
    return {
        "request": request,
        "card_types": CARD_TYPES,
        "how_it_works": HOW_IT_WORKS,
        "qr_pattern": QR_PATTERN,
        "status_kind": status_kind,
        "status_message": form_error or status_message,
        "open_signup_modal": open_signup_modal,
    }


def build_dashboard_context(
    request: Request,
    db: Session,
    user: Usuario,
    *,
    status: str | None = None,
    qr_token: str | None = None,
) -> dict:
    cards = get_user_cards(db, user.id_usuario)
    card = cards[0] if cards else user.cartao
    dashboard_cards = build_dashboard_cards(user, cards)
    if not dashboard_cards and card:
        dashboard_cards = build_dashboard_cards(user, [card])
    active_service_key = dashboard_cards[0]["service_key"] if dashboard_cards else None
    recent_movements = get_recent_movements(db, card.id_cartao) if card else []
    debit_total = sum(Decimal(str(item.valor)) for item in recent_movements if item.tipo_operacao == "DEBITO")
    topup_total = sum(Decimal(str(item.valor)) for item in recent_movements if item.tipo_operacao == "RECARGA")
    status_kind, status_message = STATUS_MESSAGES.get(status, (None, None))
    profile_identity = build_profile_identity(user, card)

    if not qr_token:
        qr_token = build_qr_token(user)

    qr_url = str(request.url_for("passage_gateway", token=qr_token))
    qr_image_url = str(request.url_for("dashboard_qr_image")) + f"?token={qr_token}"
    qr_simulator_url = str(request.url_for("dashboard_qr_simulator", token=qr_token))
    qr_authorization = ACTIVE_QR_AUTHORIZATIONS.get(user.id_usuario, {})
    expires_at = qr_authorization.get("expires_at")
    expires_iso = expires_at.isoformat() if isinstance(expires_at, datetime) else None
    issued_at = qr_authorization.get("issued_at")
    issued_iso = issued_at.isoformat() if isinstance(issued_at, datetime) else None

    return {
        "request": request,
        "current_user": user,
        "profile_image": user.foto_perfil if user.foto_perfil else "imgs/EPSTEIN.png",
        "profile_identity": profile_identity,
        "card_preview": card,
        "my_cards": dashboard_cards,
        "service_menu": build_dashboard_services(active_service_key),
        "formatted_card_number": format_card_number(card.numero_cartao) if card else None,
        "recent_movements": recent_movements,
        "movement_count": len(recent_movements),
        "debit_total": currency(debit_total),
        "topup_total": currency(topup_total),
        "status_kind": status_kind,
        "status_message": status_message,
        "current_qr_token": qr_token,
        "qr_url": qr_url,
        "qr_image_url": qr_image_url,
        "qr_simulator_url": qr_simulator_url,
        "passage_value": currency(DEFAULT_PASSAGE_VALUE),
        "current_balance": currency(card.saldo if card else Decimal("0.00")),
        "current_card_id": str(card.id_cartao) if card else "",
        "membership_id": profile_identity["membership_id"],
        "qr_expires_at": expires_iso,
        "qr_issued_at": issued_iso,
        "qr_validity_minutes": QR_TOKEN_MAX_AGE_SECONDS // 60,
    }


def build_history_context(request: Request, db: Session, user: Usuario) -> dict:
    card = user.cartao
    movements = get_all_movements(db, card.id_cartao) if card else []
    analytics = build_history_analytics(movements)
    profile_identity = build_profile_identity(user, card)

    movement_rows = [
        {
            "location": item.localizacao_operacao or "Rede UrbPay",
            "type": item.tipo_operacao,
            "status": item.status_operacao,
            "amount_prefix": "-" if item.tipo_operacao == "DEBITO" else "+",
            "amount": f"{Decimal(str(item.valor)).quantize(Decimal('0.01')):.2f}".replace(".", ","),
            "created_at": item.data_movimentacao.strftime("%d/%m/%Y %H:%M"),
        }
        for item in movements
    ]

    return {
        "request": request,
        "current_user": user,
        "profile_image": user.foto_perfil if user.foto_perfil else "imgs/EPSTEIN.png",
        "profile_identity": profile_identity,
        "card_preview": card,
        "formatted_card_number": format_card_number(card.numero_cartao) if card else None,
        "current_balance": currency(card.saldo if card else Decimal("0.00")),
        "analytics_summary": analytics["summary"],
        "analytics_charts_json": json.dumps(analytics["charts"]),
        "movement_rows": movement_rows,
        "membership_id": profile_identity["membership_id"],
    }


@app.get("/", response_class=HTMLResponse)
async def home(request: Request, status: str | None = None, db: Session = Depends(get_db)) -> HTMLResponse:
    user = get_user_from_session(request, db)
    if user:
        return RedirectResponse(url="/dashboard", status_code=303)
    return templates.TemplateResponse("index.html", build_landing_context(request, status=status))


@app.post("/signup")
async def signup(
    request: Request,
    nome: str = Form(...),
    cpf: str = Form(...),
    email: str = Form(...),
    data_nascimento: str = Form(...),
    telefone: str = Form(""),
    endereco: str = Form(""),
    senha: str = Form(...),
    foto_perfil: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
):
    cpf_digits = normalize_digits(cpf)
    telefone_digits = normalize_digits(telefone)
    normalized_email = email.strip().lower()

    try:
        birth_date = date.fromisoformat(data_nascimento)
    except ValueError:
        context = build_landing_context(
            request,
            form_error="Informe uma data de nascimento valida.",
            open_signup_modal=True,
        )
        return templates.TemplateResponse("index.html", context, status_code=400)

    if birth_date > date.today():
        context = build_landing_context(
            request,
            form_error="A data de nascimento nao pode estar no futuro.",
            open_signup_modal=True,
        )
        return templates.TemplateResponse("index.html", context, status_code=400)

    if len(cpf_digits) != 11 or len(senha) < 6:
        context = build_landing_context(
            request,
            form_error="Informe um CPF valido e uma senha com pelo menos 6 caracteres.",
            open_signup_modal=True,
        )
        return templates.TemplateResponse("index.html", context, status_code=400)

    ensure_database_schema()
    existing_user = db.scalar(select(Usuario).where((Usuario.email == normalized_email) | (Usuario.cpf == cpf_digits)))
    if existing_user:
        context = build_landing_context(
            request,
            form_error="Ja existe um cadastro com este e-mail ou CPF.",
            open_signup_modal=True,
        )
        return templates.TemplateResponse("index.html", context, status_code=409)

    try:
        image_path = save_profile_image(foto_perfil)
    except ValueError as exc:
        context = build_landing_context(request, form_error=str(exc), open_signup_modal=True)
        return templates.TemplateResponse("index.html", context, status_code=400)

    usuario = Usuario(
        nome=nome.strip(),
        email=normalized_email,
        cpf=cpf_digits,
        telefone=telefone_digits or None,
        endereco=endereco.strip() or None,
        data_nascimento=birth_date,
        senha=hash_password(senha),
        foto_perfil=image_path,
    )
    db.add(usuario)

    try:
        db.flush()
        cartao = Cartao(
            numero_cartao=build_card_number(),
            cvv=build_cvv(usuario.id_usuario),
            nome_impresso=nome.strip().upper()[:100],
            data_validade=date.today() + timedelta(days=365 * 4),
            id_usuario=usuario.id_usuario,
        )
        db.add(cartao)
        db.flush()
        seed_initial_activity(db, cartao)
        db.commit()
    except IntegrityError:
        db.rollback()
        context = build_landing_context(
            request,
            form_error="Nao foi possivel salvar o cadastro. Verifique CPF, e-mail e telefone.",
            open_signup_modal=True,
        )
        return templates.TemplateResponse("index.html", context, status_code=409)

    request.session["user_id"] = usuario.id_usuario
    return RedirectResponse(url="/dashboard?status=signup-success", status_code=303)


@app.post("/login")
def login(
    request: Request,
    cpf: str = Form(...),
    senha: str = Form(...),
    db: Session = Depends(get_db),
):
    cpf_digits = normalize_digits(cpf)
    statement = select(Usuario).options(joinedload(Usuario.cartao)).where(Usuario.cpf == cpf_digits)
    usuario = db.scalar(statement)

    if not usuario or not verify_password(senha, usuario.senha):
        context = build_landing_context(request, form_error="CPF ou senha invalidos.")
        return templates.TemplateResponse("index.html", context, status_code=401)

    request.session["user_id"] = usuario.id_usuario
    return RedirectResponse(url="/dashboard?status=login-success", status_code=303)


@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request, status: str | None = None, db: Session = Depends(get_db)) -> HTMLResponse:
    user = get_user_from_session(request, db)
    if not user:
        return RedirectResponse(url="/", status_code=303)

    context = build_dashboard_context(request, db, user, status=status)
    return templates.TemplateResponse("dashboard.html", context)


@app.get("/dashboard/extrato", response_class=HTMLResponse)
def dashboard_statement(request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    user = get_user_from_session(request, db)
    if not user:
        return RedirectResponse(url="/", status_code=303)

    context = build_history_context(request, db, user)
    return templates.TemplateResponse("history.html", context)


@app.post("/dashboard/qr/new")
def refresh_dashboard_qr(request: Request, db: Session = Depends(get_db)) -> RedirectResponse:
    user = get_user_from_session(request, db)
    if not user:
        return RedirectResponse(url="/", status_code=303)
    return RedirectResponse(url="/dashboard?status=qr-ready", status_code=303)


@app.get("/dashboard/qr.png", name="dashboard_qr_image")
def dashboard_qr_image(token: str, request: Request, db: Session = Depends(get_db)) -> Response:
    user = get_user_from_session(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Login required.")
    payload = decode_qr_token(token)
    validate_qr_authorization(payload)
    if int(payload["user_id"]) != user.id_usuario:
        raise HTTPException(status_code=403, detail="QR Code nao pertence a este usuario.")

    qr = qrcode.QRCode(box_size=8, border=2)
    qr.add_data(str(request.url_for("passage_gateway", token=token)))
    qr.make(fit=True)
    image = qr.make_image(fill_color="#1f3028", back_color="#f9f4ed")

    buffer = BytesIO()
    try:
        image.save(buffer, format="PNG")
    except TypeError:
        image.save(buffer)
    return Response(content=buffer.getvalue(), media_type="image/png")


@app.get("/dashboard/qr/simulador/{token}", response_class=HTMLResponse, name="dashboard_qr_simulator")
def dashboard_qr_simulator(token: str, request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    user = get_user_from_session(request, db)
    if not user:
        return RedirectResponse(url="/", status_code=303)

    payload = decode_qr_token_unbounded(token)
    if int(payload["user_id"]) != user.id_usuario:
        raise HTTPException(status_code=403, detail="Este QR Code nao pertence a este usuario.")

    if not user.cartao:
        raise HTTPException(status_code=404, detail="Cartao nao encontrado.")

    context = {
        "request": request,
        "token": token,
        "current_user": user,
        "profile_image": user.foto_perfil if user.foto_perfil else "imgs/EPSTEIN.png",
        "amount": currency(Decimal(str(payload["amount"]))),
        "card_number": format_card_number(user.cartao.numero_cartao),
        "current_balance": currency(user.cartao.saldo),
        "qr_status": build_qr_status_snapshot(user, token),
        "qr_status_url": str(request.url_for("dashboard_qr_status", token=token)),
        "qr_customer_url": str(request.url_for("passage_gateway", token=token)),
    }
    return templates.TemplateResponse("passage_simulator.html", context)


@app.get("/dashboard/qr/status/{token}", name="dashboard_qr_status")
def dashboard_qr_status(token: str, request: Request, db: Session = Depends(get_db)) -> dict[str, object]:
    user = get_user_from_session(request, db)
    if not user:
        raise HTTPException(status_code=401, detail="Login required.")

    payload = decode_qr_token_unbounded(token)
    if int(payload["user_id"]) != user.id_usuario:
        raise HTTPException(status_code=403, detail="Este QR Code nao pertence a este usuario.")

    snapshot = build_qr_status_snapshot(user, token)
    snapshot["current_balance"] = currency(user.cartao.saldo if user.cartao else Decimal("0.00"))
    return snapshot


@app.get("/passagem/{token}", response_class=HTMLResponse, name="passage_gateway")
def passage_gateway(token: str, request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    payload = decode_qr_token(token)
    validate_qr_authorization(payload)
    user = db.scalar(
        select(Usuario)
        .options(joinedload(Usuario.cartao))
        .where(Usuario.id_usuario == int(payload["user_id"]))
    )
    if not user or not user.cartao:
        raise HTTPException(status_code=404, detail="Cartao nao encontrado.")

    authorization = ACTIVE_QR_AUTHORIZATIONS.get(user.id_usuario)
    if authorization:
        opened_at = authorization.get("opened_at") or datetime.utcnow()
        update_qr_authorization(
            user.id_usuario,
            status="opened",
            opened_at=opened_at,
            updated_at=datetime.utcnow(),
        )

    context = {
        "request": request,
        "token": token,
        "current_user": user,
        "profile_image": user.foto_perfil if user.foto_perfil else "imgs/EPSTEIN.png",
        "amount": currency(Decimal(payload["amount"])),
        "card_number": format_card_number(user.cartao.numero_cartao),
        "current_balance": currency(user.cartao.saldo),
    }
    return templates.TemplateResponse("passage_gate.html", context)


@app.post("/passagem/{token}/confirmar", response_class=HTMLResponse)
def confirm_passage(token: str, request: Request, db: Session = Depends(get_db)) -> HTMLResponse:
    payload = decode_qr_token(token)
    validate_qr_authorization(payload)
    user = db.scalar(
        select(Usuario)
        .options(joinedload(Usuario.cartao))
        .where(Usuario.id_usuario == int(payload["user_id"]))
    )
    if not user or not user.cartao:
        raise HTTPException(status_code=404, detail="Cartao nao encontrado.")

    amount = Decimal(payload["amount"]).quantize(Decimal("0.01"))
    balance = Decimal(str(user.cartao.saldo)).quantize(Decimal("0.01"))

    if balance >= amount:
        user.cartao.saldo = balance - amount
        create_movement(
            db,
            user.cartao,
            amount=amount,
            operation_type="DEBITO",
            status="APROVADO",
            location="Catraca digital QR UrbPay",
        )
        db.commit()
        mark_qr_authorization_used(user.id_usuario, status="approved", balance=Decimal(str(user.cartao.saldo)))
        status = "qr-success"
    else:
        create_movement(
            db,
            user.cartao,
            amount=amount,
            operation_type="DEBITO",
            status="SALDO_INSUFICIENTE",
            location="Catraca digital QR UrbPay",
        )
        db.commit()
        mark_qr_authorization_used(user.id_usuario, status="failed", balance=Decimal(str(user.cartao.saldo)))
        status = "qr-failed"

    status_kind, status_message = STATUS_MESSAGES[status]
    context = {
        "request": request,
        "status_kind": status_kind,
        "status_message": status_message,
        "current_user": user,
        "profile_image": user.foto_perfil if user.foto_perfil else "imgs/EPSTEIN.png",
        "amount": currency(amount),
        "current_balance": currency(user.cartao.saldo),
    }
    return templates.TemplateResponse("passage_result.html", context)


@app.post("/logout")
def logout(request: Request) -> RedirectResponse:
    request.session.clear()
    return RedirectResponse(url="/?status=logout-success", status_code=303)


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)) -> dict:
    try:
        db.execute(text("SELECT 1"))
    except OperationalError as exc:
        target = get_database_target()
        database_name = target["database"]
        message = str(exc.orig)

        if "Unknown database" in message:
            detail = (
                f"Database '{database_name}' was not found on "
                f"{target['host']}:{target['port']}. Create the database or "
                "update MYSQL_DB in the .env file to an existing one."
            )
        else:
            detail = (
                f"Could not connect to database '{database_name}' on "
                f"{target['host']}:{target['port']}: {message}"
            )

        raise HTTPException(status_code=503, detail=detail) from exc

    return {"ok": True}


def get_local_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("UVICORN_HOST", get_local_ip())
    port = int(os.getenv("UVICORN_PORT", "8000"))

    uvicorn.run("app:app", host=host, port=port, reload=True)
