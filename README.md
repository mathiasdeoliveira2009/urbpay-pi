# urbpay-pi

## Banco

- Configure o arquivo `.env` com as credenciais do banco principal MySQL.
- Rode o script [sql/create_prod.sql](/c:/Users/mathias.oliveira/Desktop/urbpay-pi/sql/create_prod.sql) no MySQL Workbench.
- No Render, deixe o `DATABASE_URL` do Postgres apenas para testes. A aplicacao usa `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD` e `MYSQL_DB` como banco principal.
- O comando `python app.py` ja usa a porta `PORT` do Render quando ela existir; se o Render nao enviar `PORT`, usa `10000`.

## Executando

```powershell
.\.venv\Scripts\python.exe app.py
```
