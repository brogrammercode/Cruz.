from src.repositories.base import BaseRepository
from src.models.system import SystemLog
from sqlalchemy.ext.asyncio import AsyncSession

class SystemRepository(BaseRepository[SystemLog]):
    def __init__(self, db: AsyncSession):
        super().__init__(SystemLog, db)
