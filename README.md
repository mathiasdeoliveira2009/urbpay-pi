# urbpay-pi

## Banco

- Configure o arquivo `.env` com `DATABASE_URL` apontando para o PostgreSQL.
- Configure `SESSION_SECRET_KEY` no `.env`; ela assina a sessao do usuario e os tokens de QR code.
- No Render, use a `DATABASE_URL` do servico PostgreSQL como banco principal.
- A aplicacao cria as tabelas pelo SQLAlchemy na inicializacao quando elas ainda nao existem.
- O comando `python app.py` ja usa a porta `PORT` do Render quando ela existir; se o Render nao enviar `PORT`, usa `10000`.

## Executando

```powershell
.\.venv\Scripts\python.exe app.py
```
