from fastapi import APIRouter, Depends, status
from typing import List
from src.schemas.system import SystemLogCreate, SystemLogRead
from src.services.system import SystemService
from src.api.deps import get_system_service

router = APIRouter()

@router.post("/", response_model=SystemLogRead, status_code=status.HTTP_201_CREATED)
async def create_log(
    log_in: SystemLogCreate,
    service: SystemService = Depends(get_system_service)
):
    return await service.create_log(log_in)

@router.get("/", response_model=List[SystemLogRead])
async def read_logs(
    skip: int = 0,
    limit: int = 100,
    service: SystemService = Depends(get_system_service)
):
    return await service.get_logs(skip, limit)
