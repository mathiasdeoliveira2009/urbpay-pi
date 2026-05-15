# urbpay-pi

## Banco

- Localmente, configure o `.env` com `DATABASE_BACKEND=mysql` e as variaveis `MYSQL_*`.
- No Render/PRD, configure `APP_ENV=production`, `DATABASE_BACKEND=postgresql` e `DATABASE_URL`.
- Configure `SESSION_SECRET_KEY` no `.env`; ela assina a sessao do usuario e os tokens de QR code.
- Em Environment Variables no Render, a key deve ser `DATABASE_URL` e o value deve ser apenas a URL, sem aspas e sem `DATABASE_URL=`.
- Para conectar localmente no Postgres do Render, use a External Database URL e mantenha `?sslmode=require` no final.
- A aplicacao cria as tabelas pelo SQLAlchemy na inicializacao quando elas ainda nao existem.
- O comando `python app.py` ja usa a porta `PORT` do Render quando ela existir; se o Render nao enviar `PORT`, usa `10000`.

## Executando

```powershell
.\.venv\Scripts\python.exe app.py
```
