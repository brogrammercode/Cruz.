import asyncio
import httpx

async def test_api():
    async with httpx.AsyncClient(base_url="http://localhost:8000", timeout=30.0) as client:
        print("=== Testing Cruz API ===\n")
        
        # Test 1: Health Check
        print("1. Testing GET /health")
        response = await client.get("/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}\n")
        
        # Test 2: Create System Log
        print("2. Testing POST /api/v1/system/")
        payload = {"message": "Test log from script", "level": "INFO"}
        response = await client.post("/api/v1/system/", json=payload)
        print(f"   Status: {response.status_code}")
        log_data = response.json()
        print(f"   Response: {log_data}\n")
        
        # Test 3: Create another log with different level
        print("3. Testing POST /api/v1/system/ (WARN level)")
        payload2 = {"message": "Warning test", "level": "WARN"}
        response = await client.post("/api/v1/system/", json=payload2)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}\n")
        
        # Test 4: Read all logs
        print("4. Testing GET /api/v1/system/")
        response = await client.get("/api/v1/system/")
        print(f"   Status: {response.status_code}")
        logs = response.json()
        print(f"   Total logs: {len(logs)}")
        for log in logs:
            print(f"   - {log['level']}: {log['message']} (ID: {log['id']})")
        
        print("\n=== All tests completed successfully! ===")

if __name__ == "__main__":
    asyncio.run(test_api())
