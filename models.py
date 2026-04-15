from datetime import date, datetime

from sqlalchemy import CHAR, DATETIME, DECIMAL, Date, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    cpf: Mapped[str] = mapped_column(CHAR(11), nullable=False, unique=True)
    telefone: Mapped[str | None] = mapped_column(String(15), unique=True)
    endereco: Mapped[str | None] = mapped_column(String(50))
    data_nascimento: Mapped[date | None] = mapped_column(Date)
    data_cadastro: Mapped[datetime] = mapped_column(DATETIME, default=datetime.utcnow)
    senha: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("ATIVO", "INATIVO", name="usuarios_status_enum"),
        default="ATIVO",
        nullable=False,
    )
    foto_perfil: Mapped[str | None] = mapped_column(String(255))

    cartao: Mapped["Cartao | None"] = relationship(back_populates="usuario", uselist=False)


class Cartao(Base):
    __tablename__ = "cartao"

    id_cartao: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    numero_cartao: Mapped[str] = mapped_column(CHAR(16), nullable=False, unique=True)
    cvv: Mapped[str] = mapped_column(CHAR(10), nullable=False)
    nome_impresso: Mapped[str | None] = mapped_column(String(100))
    saldo: Mapped[float] = mapped_column(DECIMAL(10, 2), default=0.00, nullable=False)
    data_validade: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("ATIVO", "BLOQUEADO", "EXPIRADO", name="cartao_status_enum"),
        default="ATIVO",
        nullable=False,
    )
    id_usuario: Mapped[int] = mapped_column(ForeignKey("usuarios.id_usuario"), nullable=False, unique=True)

    usuario: Mapped[Usuario] = relationship(back_populates="cartao")
    movimentacoes: Mapped[list["Movimentacao"]] = relationship(back_populates="cartao")


class Movimentacao(Base):
    __tablename__ = "movimentacoes"

    id_movimentacao: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    valor: Mapped[float] = mapped_column(DECIMAL(10, 2), nullable=False)
    data_movimentacao: Mapped[datetime] = mapped_column(DATETIME, default=datetime.utcnow)
    tipo_operacao: Mapped[str] = mapped_column(
        Enum("RECARGA", "DEBITO", name="movimentacoes_tipo_operacao_enum"),
        nullable=False,
    )
    status_operacao: Mapped[str] = mapped_column(
        Enum("APROVADO", "SALDO_INSUFICIENTE", "RECUSADO", name="movimentacoes_status_operacao_enum"),
        nullable=False,
    )
    localizacao_operacao: Mapped[str | None] = mapped_column(String(150))
    id_cartao: Mapped[int] = mapped_column(ForeignKey("cartao.id_cartao"), nullable=False)
    id_maquina: Mapped[int | None] = mapped_column(Integer)

    cartao: Mapped[Cartao] = relationship(back_populates="movimentacoes")
