import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, sessionmaker

load_dotenv(".env")

DATABASE_URL = os.getenv("DATABASE_URL")
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY")


def _require_env(name: str, value: str | None) -> str:
    if value:
        return value
    raise RuntimeError(f"Missing required environment variable: {name}")

DATABASE_URL = _require_env("DATABASE_URL", DATABASE_URL)
SESSION_SECRET_KEY = _require_env("SESSION_SECRET_KEY", SESSION_SECRET_KEY)

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_database_target() -> dict[str, str]:
    url = make_url(DATABASE_URL)
    return {
        "driver": url.drivername,
        "host": url.host or "",
        "port": str(url.port or ""),
        "database": url.database or "",
        "user": url.username or "",
    }


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
