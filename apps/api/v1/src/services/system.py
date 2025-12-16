from src.repositories.system import SystemRepository
from src.schemas.system import SystemLogCreate, SystemLogRead
from src.models.system import SystemLog
from typing import List

class SystemService:
    def __init__(self, repo: SystemRepository):
        self.repo = repo

    async def create_log(self, log_in: SystemLogCreate) -> SystemLogRead:
        log_data = log_in.model_dump()
        return await self.repo.create(log_data)

    async def get_logs(self, skip: int = 0, limit: int = 100) -> List[SystemLogRead]:
        return await self.repo.get_all(skip, limit)
