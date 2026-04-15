# Instrucoes Padrao

## Estrutura

- `sql/create_prod.sql`: cria e usa o banco `urbpay`
- `sql/update_profile_photo.sql`: adiciona a coluna `foto_perfil` em bancos ja existentes
- `.env`: configuracao unica do projeto

## Criar Banco

1. Abra o MySQL Workbench.
2. Clique em `File`.
3. Clique em `Open SQL Script...`.
4. Abra [create_prod.sql](/c:/Users/mathias.oliveira/Desktop/urbpay-pi/sql/create_prod.sql).
5. Confirme que o script usa `urbpay`.
6. Clique no botao de raio para executar.

## Atualizar Banco Ja Existente

Se o banco ja existia antes da funcionalidade de foto de perfil:

1. Abra o MySQL Workbench.
2. Clique em `File`.
3. Clique em `Open SQL Script...`.
4. Abra [update_profile_photo.sql](/c:/Users/mathias.oliveira/Desktop/urbpay-pi/sql/update_profile_photo.sql).
5. Escolha o schema correto no Workbench.
6. Execute o script.

## Configurar .env

Use um unico arquivo `.env` na raiz do projeto:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=urbpay_user
MYSQL_PASSWORD=ff@123
MYSQL_DB=urbpay
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

- O projeto usa apenas um banco configurado via `.env`.
- O schema principal esperado e `urbpay`.
