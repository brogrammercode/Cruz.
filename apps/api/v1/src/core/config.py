from pydantic_settings import BaseSettings
from typing import ClassVar

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Cruz API"
    # Using SQLite for development simplicity, explicit async driver
    DATABASE_URL: str = "sqlite+aiosqlite:///./cruz.db"

    class Config:
        case_sensitive = True

settings = Settings()
