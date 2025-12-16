from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SystemLogBase(BaseModel):
    message: str
    level: str = "INFO"

class SystemLogCreate(SystemLogBase):
    pass

class SystemLogRead(SystemLogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
