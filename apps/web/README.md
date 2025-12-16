# Cruz Web Application

Welcome to the frontend codebase for the **Cruz Operating System**. This is a modern, high-performance web application built to serve as the central nervous system for startup operations.

---

## 👶 Explain Like I'm Five (ELI5)

Imagine this app is like a **super-advanced Lego Castle**.

*   **The Foundation (`app/`)**: This is the baseplate where everything sits. If you take this away, the castle falls down. It decides which room you are in (like the "Living Room" or the "Kitchen").
*   **The Bricks (`components/`)**: These are the individual Lego pieces. a `Button` is a small brick, an `Avatar` (user picture) is a special sticker brick. We keep them in a special box so we can reuse them everywhere without making new ones.
*   **The Rooms (`features/`)**: These are the different themed areas of the castle:
    *   **Chat Room (`features/chat`)**: Where people talk.
    *   **Bank Vault (`features/finance`)**: Where the money is counted.
    *   **Command Center (`features/dev`)**: Where the castle guards check the security cameras.
*   **The Power Lines (`context/`)**: Imagine invisible wires running through the walls that let you turn on all the lights at once. If you change a setting here, it updates everywhere instantly (like switching from "Day Mode" to "Night Mode").
*   **The Rulebook (`lib/types`)**: This is the instruction manual that says "You cannot put a square peg in a round hole". It stops us from making mistakes before we even finish building.

---

## 👨‍💻 For the Professional Developer

**Cruz Web** is a **Next.js 16 (Turbopack)** application referencing **Clean Architecture** and **Feature-Sliced Design (FSD)** principles.

### Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript 5 (Strict Mode)
*   **Styling**: Tailwind CSS v4 (CSS-first configuration via `globals.css`)
*   **State Management**: React Context (`AppContext`) + Custom Hooks
*   **Icons**: Lucide React
*   **Build Tool**: Turbopack

### Architecture Pattern: Feature-Sliced Design (FSD-Lite)
We moved away from a monolithic `components/` folder to a domain-driven structure in `features/`. Each feature (e.g., `finance`, `chat`) is self-contained:

```typescript
features/finance/
├── components/    // React components specific to Finance (Presentation Layer)
├── service.ts     // Data fetching & business logic (Service Layer)
├── data.ts        // Mock data or API adapters (Data Layer)
├── types.ts       // Domain interfaces (Entity Layer)
└── index.ts       // Public API (Facade Pattern)
```
**Benefits**:
*   **Isolation**: Changes in `Finance` generally don't break `Chat`.
*   **Scalability**: New features are just new folders.
*   **Cognitive Load**: You only strictly need to understand the feature you are working on.

### State Management
We avoid Redux/Zustand complexities for this scale. Global state (Active Module, Project View Mode) is handled via `AppContext.tsx`.
*   **Provider**: Wraps the implementation in `app/page.tsx`.
*   **Hook**: `useAppStore()` provides typesafe access to state.
*   **Performance**: Context is split only where necessary to prevent excessive re-renders.

---

## 📂 The Grand Tour (File Guide)

Here is an exhaustive breakdown of the codebase structure.

### 1. **Root Configuration**
| File | Purpose |
| :--- | :--- |
| `package.json` | Dependency manifest. Key scripts: `dev`, `build`, `lint`. |
| `next.config.ts` | Next.js configuration. Handles `remotePatterns` for external images (e.g., Dicebear avatars). |
| `tsconfig.json` | TypeScript configuration. Enforces `strict: true` and path aliases (`@/*`). |
| `postcss.config.mjs` | PostCSS config required for Tailwind. |
| `eslint.config.mjs` | Linter rules (ESLint 9). |

### 2. **Application Core (`apps/web/app/`)**
This directory follows the Next.js App Router conventions.
| File | Purpose |
| :--- | :--- |
| `page.tsx` | **The Entry Point**. It acts as the Controller. It reads the global state (`activeModule`) and conditionally renders the correct Feature View. It also wraps the app in `AppProvider`. |
| `layout.tsx` | The Root Layout. Defines `html`, `body`, and loads font optimizations (`next/font/google`). |
| `globals.css` | **Design System Source**. Contains Tailwind v4 imports (`@import "tailwindcss"`) and CSS Variables for the theme (`--primary`, `--sidebar-bg`). |
| `providers.tsx` | (Optional) Utility for wrapping client-side providers seamlessly. |

### 3. **Shared Components (`apps/web/components/`)**
Reusable UI elements that are agnostic of business logic.
| Subdirectory | File | Purpose |
| :--- | :--- | :--- |
| `layout/` | `Shell.tsx` | The "OS" Container. Manages the 3-pane layout (Sidebar -> Context -> Main). |
| | `PrimarySidebar.tsx` | The far-left navigation rail (Dashboard, Projects, Chat, etc.). |
| | `ContextSidebar.tsx` | The middle dynamic sidebar. Changes content based on the active module. |
| `ui/` | `Avatar.tsx` | Displays user profile pictures using `next/image` for optimization. |
| | `Button.tsx` | A standardized button component with variants (primary, ghost, danger). |

### 4. **Features (`apps/web/features/`)**
The heart of the application logic.

#### **Chat (`features/chat/`)**
*   **`ChatView.tsx`**: The main chat interface.
*   **`ChatInputArea.tsx`**: The input field with AI/Attachment buttons.
*   **`MessageItem.tsx`**: Renders a single message bubble (Discord-style action on hover).
*   **`service.ts`**: `ChatService`. Fetches messages and channels.
*   **`types.ts`**: Interfaces for `Message`, `User`.

#### **Projects (`features/projects/`)**
*   **`KanbanBoard.tsx`**: A horizontal scrolling board with Drag-and-Drop aesthetics.
*   **`TaskCard.tsx`**: Individual cards showing tags, priority, and assignees.
*   **`service.ts`**: Used to fetch Board Columns and Tasks.
*   **`types.ts`**: Types for `Column`, `Task`, `Priority`.

#### **Finance (`features/finance/`)**
*   **`FinanceView.tsx`**: Dashboard for financial metrics.
*   **`KPICard.tsx`**: A smart card that renders metrics (Revenue, Burn) with dynamic colors.
*   **`TransactionItem.tsx`**: A row in the recent transactions list.
*   **`service.ts`**: Provides mock financial data.

#### **Sales (`features/sales/`)**
*   **`SalesView.tsx`**: CRM Pipeline view.
*   **`LeadCard.tsx`**: Represents a sales lead with an AI Score badge and "Hot" status.
*   **`service.ts`**: Fetches pipeline stages.

#### **Dev Tools (`features/dev/`)**
*   **`DevView.tsx`**: A console for API keys, System Status, and Logs.
*   **`service.ts`**: Fetches security logs and system metrics.

### 5. **Utilities (`apps/web/lib/`)**
| File | Purpose |
| :--- | :--- |
| `utils.ts` | Contains `cn()`, a helper that combines `clsx` and `tailwind-merge` for safe conditional class names. |

### 6. **Context (`apps/web/context/`)**
| File | Purpose |
| :--- | :--- |
| `AppContext.tsx` | Holds global state (`activeModule`, `projectView`). Exports `useAppStore` hook. |

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   npm

### Installation
1.  Navigate to the `web` workspace:
    ```bash
    cd apps/web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) (or port 3001 if 3000 is taken).

### Building for Production
To ensure type safety and optimal performance:
```bash
npm run build
```
This runs `next build`, creating a `.next` folder with static assets and server logic.

### Linting
To check code quality:
```bash
npm run lint
```
This uses ESLint to catch errors like unused variables or missing accessibility tags.

---

## 🤝 Contribution Guidelines

1.  **Strict Types Only**: Do not use `any`. Define an interface in `types.ts` first.
2.  **Server Components Default**: Most components should be Server Components unless they need interactivity (`useState`, `onClick`), in which case add `'use client'` at the top.
3.  **Modular CSS**: Use Tailwind utility classes. For complex conditionals, use the `cn()` utility.
4.  **Clean Code**: Remove `console.log` before committing.

---

*Documentation generated by Antigravity Agent.*
