# Instrucoes Padrao

## Estrutura

- `sql/create_prod.sql`: script legado para MySQL
- `sql/update_profile_photo.sql`: adiciona a coluna `foto_perfil` em bancos ja existentes
- `.env`: configuracao unica do projeto

## Criar Banco

1. Localmente, use MySQL e configure `DATABASE_BACKEND=mysql`.
2. Rode o script [create_prod.sql](/c:/Users/mathias.oliveira/Desktop/urbpay-pi/sql/create_prod.sql) no MySQL.
3. No Render/PRD, use PostgreSQL e configure `DATABASE_BACKEND=postgresql`.
4. Suba a aplicacao; as tabelas sao criadas automaticamente pelo SQLAlchemy quando ainda nao existem.

No Render, configure a variavel assim:

```text
Key: DATABASE_URL
Value: postgresql://usuario:senha@host:5432/banco?sslmode=require
```

O campo `Value` deve conter somente a URL, sem aspas e sem `DATABASE_URL=`.
Tambem configure `APP_ENV=production` e `DATABASE_BACKEND=postgresql`.
Para rodar localmente acessando o banco do Render, copie a External Database URL e mantenha `?sslmode=require`.

## Atualizar Banco Ja Existente

Se o banco ja existia antes da funcionalidade de foto de perfil:

1. Confirme que `DATABASE_URL` aponta para esse banco.
2. Suba a aplicacao.
3. O startup verifica as colunas esperadas em `usuarios` e adiciona as colunas antigas que estiverem faltando.

## Configurar .env

Use um unico arquivo `.env` na raiz do projeto:

```env
APP_ENV=local
DATABASE_BACKEND=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=urbpay_user
MYSQL_PASSWORD=ff@123
MYSQL_DB=urbpay
SESSION_SECRET_KEY=troque_esta_chave
```

## Subir Aplicacao

No terminal do projeto, rode:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe app.py
```

## Testar Conexao com Banco

Abra no navegador:

```text
http://127.0.0.1:8000/db-check
```

Se estiver tudo certo, a resposta sera:

```json
{"ok": true}
```

## Observacoes

- Localmente, o banco principal da aplicacao e o MySQL configurado por `MYSQL_*`.
- No Render/PRD, o banco principal e o PostgreSQL configurado por `DATABASE_URL`.
- `SESSION_SECRET_KEY` precisa ficar fixa entre deploys para nao invalidar sessoes e tokens assinados.
- Em deploy no Render com `python app.py`, a aplicacao usa automaticamente a porta `PORT`; se ela nao existir, usa `10000`.
