# Instrucoes Padrao

## Estrutura

- `sql/create_prod.sql`: script legado para MySQL
- `sql/update_profile_photo.sql`: adiciona a coluna `foto_perfil` em bancos ja existentes
- `.env`: configuracao unica do projeto

## Criar Banco

1. Crie um banco PostgreSQL local, no Render ou no provedor escolhido.
2. Copie a URL de conexao do banco.
3. Coloque essa URL em `DATABASE_URL` no arquivo `.env`.
4. Suba a aplicacao; as tabelas sao criadas automaticamente pelo SQLAlchemy quando ainda nao existem.

## Atualizar Banco Ja Existente

Se o banco ja existia antes da funcionalidade de foto de perfil:

1. Confirme que `DATABASE_URL` aponta para esse banco.
2. Suba a aplicacao.
3. O startup verifica as colunas esperadas em `usuarios` e adiciona as colunas antigas que estiverem faltando.

## Configurar .env

Use um unico arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@host:5432/banco
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

- O banco principal da aplicacao e o PostgreSQL configurado por `DATABASE_URL`.
- `SESSION_SECRET_KEY` precisa ficar fixa entre deploys para nao invalidar sessoes e tokens assinados.
- Em deploy no Render com `python app.py`, a aplicacao usa automaticamente a porta `PORT`; se ela nao existir, usa `10000`.
