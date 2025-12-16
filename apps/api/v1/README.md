# Cruz API (FastAPI Backend)

Welcome to the backend service for the **Cruz Operating System**. This is a production-grade, async-first API built with **FastAPI**, **SQLAlchemy**, and **Clean Architecture**.

---

## 👶 Explain Like I'm Five (ELI5)

Imagine this API is like a **Restaurant Kitchen**.

*   **The Menu (`main.py`)**: This is what customers (the web app) see. It lists all the dishes (endpoints) you can order.
*   **The Waiters (`api/`)**: These take your order and bring back your food. They don't cook, they just deliver.
*   **The Chefs (`services/`)**: These do the actual cooking (business logic). They decide how to make the dish.
*   **The Pantry (`repositories/`)**: This is where ingredients (data) are stored. The chef asks the pantry for ingredients.
*   **The Refrigerator (`db/`)**: The actual storage unit. It keeps everything fresh and organized.
*   **The Recipe Book (`schemas/`)**: This tells everyone what a "burger" should look like (what fields it has).
*   **The Secret Sauce (`core/`)**: Special settings like "how spicy should everything be" or "what's the restaurant's name."

When you order a burger:
1. **Waiter** takes your order → `api/endpoints/`
2. **Chef** makes the burger → `services/`
3. **Pantry** gets the bun and patty → `repositories/`
4. **Refrigerator** stores/retrieves ingredients → `db/`

---

## 👨‍💻 For the Professional Developer

**Cruz API** is an async-first FastAPI application implementing **Clean Architecture** with the **Service-Repository Pattern** and strict **SOLID principles**.

### Tech Stack
*   **Framework**: FastAPI 0.110+ (async, Pydantic v2)
*   **ASGI Server**: Uvicorn with `uvloop` (production-ready)
*   **ORM**: SQLAlchemy 2.0 (Async Engine)
*   **Database**: SQLite (dev) / Postgres-ready (prod)
*   **Validation**: Pydantic v2 (Rust-powered)
*   **Testing**: pytest + pytest-asyncio + httpx
*   **Migrations**: Alembic (planned, structure ready)

### Architecture Pattern: Clean Architecture

We enforce strict separation of concerns across 5 layers:

```
┌─────────────────────────────────────────┐
│   Presentation (api/)                   │  ← HTTP/REST Layer
├─────────────────────────────────────────┤
│   Business Logic (services/)            │  ← Domain Rules
├─────────────────────────────────────────┤
│   Data Access (repositories/)           │  ← Abstraction
├─────────────────────────────────────────┤
│   Entities (models/, schemas/)          │  ← Data Structures
├─────────────────────────────────────────┤
│   Infrastructure (db/, core/)           │  ← Framework/DB
└─────────────────────────────────────────┘
```

**SOLID in Action**:
*   **S (Single Responsibility)**: Each service handles one domain (e.g., `SystemService` only deals with logs).
*   **O (Open/Closed)**: `BaseRepository` is open for extension (inherit it), closed for modification.
*   **L (Liskov Substitution)**: Any `BaseRepository[T]` can be swapped without breaking code.
*   **I (Interface Segregation)**: Services depend on specific repositories, not a monolithic data layer.
*   **D (Dependency Inversion)**: Endpoints depend on abstractions (`SystemService`), not concrete implementations.

### Request Flow (Example: POST /api/v1/system/)

```
User Request → FastAPI Router → Dependency Injection → Service → Repository → Database
     ↓              ↓                    ↓                 ↓           ↓           ↓
  JSON Body    endpoints/system.py    deps.py      SystemService  SystemRepo  SQLAlchemy
```

1. **Router** (`endpoints/system.py`) receives HTTP request
2. **FastAPI DI** (`deps.py`) injects `SystemService` instance
3. **Service** (`services/system.py`) validates business rules
4. **Repository** (`repositories/system.py`) performs CRUD
5. **ORM** (`db/session.py`) executes async SQL
6. **Response** flows back through the stack as Pydantic schema

---

## 📂 The Grand Tour (File Guide)

Here is an exhaustive breakdown of every file in this project.

### 1. **Root Configuration**

| File | Purpose |
| :--- | :--- |
| `requirements.txt` | Python dependencies. Pinned versions for reproducibility. Includes `fastapi`, `uvicorn[standard]`, `sqlalchemy`, `aiosqlite`, `pydantic-settings`, `pytest`, `pytest-asyncio`, `httpx`. |
| `pytest.ini` | Pytest configuration. Sets `pythonpath = .` (so `src` is importable), `asyncio_mode = auto` (enables async tests), and `testpaths = tests`. |
| `.venv/` | Virtual environment directory. Isolates dependencies from global Python. Created via `python -m venv .venv`. |

### 2. **Application Core (`src/`)**

The main source directory. All business logic lives here.

#### **`src/main.py`** - The Application Entry Point
*   **Purpose**: Initializes the FastAPI app, registers routers, sets up CORS, and defines the lifespan event (which creates DB tables on startup).
*   **Key Code**:
    *   `app = FastAPI(...)`: Creates the FastAPI instance.
    *   `lifespan` function: Async context manager that runs `Base.metadata.create_all()` on startup (auto-creates tables).
    *   `app.include_router(api_router, prefix="/api/v1")`: Mounts all v1 endpoints under `/api/v1`.
    *   `@app.get("/health")`: A simple health check endpoint.
*   **ELI5**: This is the restaurant's front door. It says "Welcome!" and shows you the menu.

---

### 3. **Presentation Layer (`src/api/`)**

Handles HTTP requests and responses. **No business logic here**, only routing and dependency injection.

| File | Purpose |
| :--- | :--- |
| `deps.py` | **Dependency Injection Factory**. Contains functions like `get_system_service()` that wire up the service layer. FastAPI's `Depends()` calls these. |
| `v1/router.py` | **V1 Router Aggregator**. Collects all endpoint routers (e.g., `system.router`) and exposes them under a single `api_router`. This is what `main.py` includes. |
| `v1/endpoints/system.py` | **System Endpoints**. Defines `POST /` (create log) and `GET /` (read logs). Each endpoint uses `Depends(get_system_service)` to inject the service. |

**Flow in `endpoints/system.py`**:
```python
@router.post("/", response_model=SystemLogRead)
async def create_log(
    log_in: SystemLogCreate,            # ← Pydantic validates this
    service: SystemService = Depends(get_system_service)  # ← DI magic
):
    return await service.create_log(log_in)  # ← Delegate to service
```
*   **ELI5**: The waiter writes down your order and hands it to the chef.

---

### 4. **Business Logic Layer (`src/services/`)**

Contains **pure business logic**. No HTTP concerns, no SQL queries (those are in repositories).

| File | Purpose |
| :--- | :--- |
| `system.py` | **System Service**. Handles validation and orchestration for system logs. Methods: `create_log()`, `get_logs()`. |

**Example (`services/system.py`)**:
```python
class SystemService:
    def __init__(self, repo: SystemRepository):
        self.repo = repo  # ← Depends on abstraction, not concrete DB

    async def create_log(self, log_in: SystemLogCreate) -> SystemLogRead:
        log_data = log_in.model_dump()  # ← Convert Pydantic to dict
        return await self.repo.create(log_data)  # ← Delegate to repo
```
*   **SOLID**: Depends on `SystemRepository` (abstraction), not `AsyncSession` (concrete).
*   **ELI5**: The chef decides how to cook the burger (but doesn't go to the fridge themselves).

---

### 5. **Data Access Layer (`src/repositories/`)**

Abstracts database operations. Services call repos, repos call the ORM.

| File | Purpose |
| :--- | :--- |
| `base.py` | **Generic Repository**. A reusable base class using Python Generics (`Generic[ModelType]`). Provides `get()`, `get_all()`, `create()`, `update()`, `delete()`. |
| `system.py` | **System Repository**. Inherits from `BaseRepository[SystemLog]`. No extra logic needed currently, but this is where you'd add custom queries like `get_by_level()`. |

**Example (`repositories/base.py`)**:
```python
class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], db: AsyncSession):
        self.model = model  # ← e.g., SystemLog
        self.db = db

    async def get(self, id: int) -> Optional[ModelType]:
        query = select(self.model).where(self.model.id == id)
        result = await self.db.execute(query)
        return result.scalars().first()
```
*   **Generic Pattern**: `BaseRepository[SystemLog]` means "a repository for SystemLog entities."
*   **ELI5**: The pantry worker knows exactly where the tomatoes are stored.

---

### 6. **Entities (`src/models/`, `src/schemas/`)**

**models/** = Database entities (SQLAlchemy)  
**schemas/** = API contracts (Pydantic)

| File | Purpose |
| :--- | :--- |
| `models/system.py` | **SystemLog Model**. SQLAlchemy ORM class. Defines table structure (`id`, `message`, `level`, `timestamp`). |
| `schemas/system.py` | **System Schemas**. Pydantic models for validation. `SystemLogCreate` (input), `SystemLogRead` (output). |

**Why separate?**
*   **models/**: What the **database** sees.
*   **schemas/**: What the **API** sees.
*   **Benefit**: You can change the database schema without breaking the API (add a computed field in the schema, for example).

**Example (`models/system.py`)**:
```python
class SystemLog(Base):
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, index=True)
    level = Column(String, default="INFO")
    timestamp = Column(DateTime, default=datetime.utcnow)
```

**Example (`schemas/system.py`)**:
```python
class SystemLogRead(SystemLogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True  # ← Allows Pydantic to read from ORM
```
*   **ELI5**: The recipe says "a burger needs a bun, patty, and lettuce" (schema), but the pantry stores them in separate bins (model).

---

### 7. **Infrastructure (`src/core/`, `src/db/`)**

Handles configuration, database connections, and framework setup.

| File | Purpose |
| :--- | :--- |
| `core/config.py` | **Settings Management**. Uses `pydantic-settings` to load environment variables. Defines `DATABASE_URL`, `API_V1_STR`, `PROJECT_NAME`. |
| `db/base.py` | **Declarative Base**. All models inherit from `Base`. Includes a custom mixin that auto-generates table names (e.g., `SystemLog` → `systemlog`). |
| `db/session.py` | **Async DB Session**. Creates the async SQLAlchemy engine, session factory, and the `get_db()` dependency (yields a session). |

**Async Engine Setup (`db/session.py`)**:
```python
engine = create_async_engine(
    settings.DATABASE_URL,  # ← "sqlite+aiosqlite:///./cruz.db"
    echo=True,  # ← Logs SQL queries
    future=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session  # ← FastAPI injects this
```
*   **Why async?**: Non-blocking I/O. The server can handle other requests while waiting for the database.
*   **ELI5**: The refrigerator has a smart door that opens only when you need it, and multiple chefs can request ingredients at the same time without waiting.

---

### 8. **Testing (`tests/`)**

Comprehensive test suite using **pytest** and **pytest-asyncio**.

| File | Purpose |
| :--- | :--- |
| `conftest.py` | **Test Fixtures**. Provides `client` (async HTTP client) and `db_session` (in-memory database). Overrides `get_db()` to use a test database (`sqlite+aiosqlite:///:memory:`). |
| `api/v1/test_system.py` | **System Endpoint Tests**. Tests `POST /api/v1/system/` (create log) and `GET /api/v1/system/` (read logs). Uses the `client` fixture. |

**How it works (`conftest.py`)**:
```python
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"  # ← In-memory DB
engine = create_async_engine(TEST_DATABASE_URL, poolclass=StaticPool)

@pytest_asyncio.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # ← Create tables
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c  # ← Tests use this
    
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)  # ← Cleanup
```
*   **Isolation**: Each test gets a fresh database.
*   **Speed**: In-memory SQLite is blazing fast.
*   **ELI5**: Before each test, we build a toy kitchen. After the test, we throw it away.

**Example Test (`test_system.py`)**:
```python
@pytest.mark.asyncio
async def test_create_system_log(client: AsyncClient):
    payload = {"message": "Test Log", "level": "INFO"}
    response = await client.post("/api/v1/system/", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["message"] == "Test Log"
```

---

## 🚀 Getting Started

### Prerequisites
*   Python 3.11+
*   pip

### Installation
1.  Navigate to `apps/api/v1`:
    ```powershell
    cd apps/api/v1
    ```
2.  Create and activate virtual environment:
    ```powershell
    python -m venv .venv
    .venv\Scripts\activate
    ```
3.  Install dependencies:
    ```powershell
    pip install -r requirements.txt
    ```

### Running the Server
```powershell
uvicorn src.main:app --reload
```
*   Access API docs: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
*   Health check: [http://localhost:8000/health](http://localhost:8000/health)

### Running Tests
```powershell
pytest
```
*   Runs all tests in `tests/`
*   Uses in-memory SQLite for isolation
*   Output shows pass/fail + coverage

---

## 🧪 Testing Strategy

| Test Type | Location | Purpose |
| :--- | :--- | :--- |
| **API Tests** | `tests/api/v1/` | Test HTTP endpoints (status codes, response schemas) |
| **Service Tests** | `tests/services/` (planned) | Test business logic in isolation |
| **Repository Tests** | `tests/repositories/` (planned) | Test database queries |

**Current Coverage**:
*   ✅ System endpoints (create, read)
*   ✅ Pydantic validation (implicit via FastAPI)
*   ⏳ Edge cases (empty data, invalid IDs)

---

## 🤝 Development Guidelines

### Adding a New Feature (Example: "Tasks")

Follow this vertical slice pattern:

1.  **Model** (`src/models/task.py`):
    ```python
    class Task(Base):
        id = Column(Integer, primary_key=True)
        title = Column(String, nullable=False)
        completed = Column(Boolean, default=False)
    ```

2.  **Schema** (`src/schemas/task.py`):
    ```python
    class TaskCreate(BaseModel):
        title: str

    class TaskRead(TaskCreate):
        id: int
        completed: bool
        class Config:
            from_attributes = True
    ```

3.  **Repository** (`src/repositories/task.py`):
    ```python
    class TaskRepository(BaseRepository[Task]):
        def __init__(self, db: AsyncSession):
            super().__init__(Task, db)
    ```

4.  **Service** (`src/services/task.py`):
    ```python
    class TaskService:
        def __init__(self, repo: TaskRepository):
            self.repo = repo

        async def create_task(self, task_in: TaskCreate) -> TaskRead:
            return await self.repo.create(task_in.model_dump())
    ```

5.  **Dependency** (`src/api/deps.py`):
    ```python
    async def get_task_service(
        repo: TaskRepository = Depends(get_task_repo)
    ) -> TaskService:
        return TaskService(repo)
    ```

6.  **Endpoint** (`src/api/v1/endpoints/task.py`):
    ```python
    @router.post("/", response_model=TaskRead)
    async def create_task(
        task_in: TaskCreate,
        service: TaskService = Depends(get_task_service)
    ):
        return await service.create_task(task_in)
    ```

7.  **Register Router** (`src/api/v1/router.py`):
    ```python
    from src.api.v1.endpoints import task
    api_router.include_router(task.router, prefix="/tasks", tags=["tasks"])
    ```

8.  **Test** (`tests/api/v1/test_task.py`):
    ```python
    async def test_create_task(client: AsyncClient):
        response = await client.post("/api/v1/tasks/", json={"title": "Buy milk"})
        assert response.status_code == 201
    ```

### Code Quality Rules
1.  **Type Hints**: All functions must have type annotations.
2.  **Async/Await**: Use async for I/O operations (DB, HTTP).
3.  **No Business Logic in Endpoints**: Endpoints only validate input and call services.
4.  **No SQL in Services**: Services call repositories, not `session.execute()`.
5.  **Test Coverage**: Every new feature needs at least one API test.

---

## 📊 Performance Optimizations

*   **Async Engine**: Full async stack (FastAPI → SQLAlchemy → aiosqlite).
*   **Connection Pooling**: SQLAlchemy manages connection reuse.
*   **Pydantic V2**: Rust-powered validation is 10x faster than V1.
*   **lazy='selectin'** (for relationships): Prevents N+1 queries (add when needed).

---

*Documentation generated by Antigravity Agent.*
