import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_create_system_log(client: AsyncClient):
    payload = {"message": "Test Log", "level": "INFO"}
    response = await client.post("/api/v1/system/", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["message"] == "Test Log"
    assert data["level"] == "INFO"
    assert "id" in data
    assert "timestamp" in data

@pytest.mark.asyncio
async def test_read_system_logs(client: AsyncClient):
    # Create two logs
    await client.post("/api/v1/system/", json={"message": "Log 1", "level": "WARN"})
    await client.post("/api/v1/system/", json={"message": "Log 2", "level": "ERROR"})
    
    response = await client.get("/api/v1/system/")
    
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2 # Using >= incase of test pollution or other tests running
    messages = [log["message"] for log in data]
    assert "Log 1" in messages
    assert "Log 2" in messages
