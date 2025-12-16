from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from src.db.base import Base

class SystemLog(Base):
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, index=True)
    level = Column(String, default="INFO") # INFO, WARN, ERROR
    timestamp = Column(DateTime, default=datetime.utcnow)
