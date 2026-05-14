import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

load_dotenv(".env")

MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = os.getenv("MYSQL_PORT", "3306")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DB = os.getenv("MYSQL_DB")
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY", "urbpay-dev-secret")


def _require_env(name: str, value: str | None) -> str:
    if value:
        return value
    raise RuntimeError(f"Missing required environment variable: {name}")

MYSQL_USER = _require_env("MYSQL_USER", MYSQL_USER)
MYSQL_DB = _require_env("MYSQL_DB", MYSQL_DB)
safe_password = quote_plus(MYSQL_PASSWORD or "")
MYSQL_DATABASE_URL = (
    f"mysql+pymysql://{MYSQL_USER}:{safe_password}"
    f"@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DB}"
)
# Render may inject DATABASE_URL for a PostgreSQL test database. The main app
# intentionally keeps using MySQL through MYSQL_* variables.
POSTGRES_TEST_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(MYSQL_DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_database_target() -> dict[str, str]:
    return {
        "host": MYSQL_HOST,
        "port": MYSQL_PORT,
        "database": MYSQL_DB,
        "user": MYSQL_USER,
    }


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
