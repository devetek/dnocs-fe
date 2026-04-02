# Agent Knowledge Base: Project "Dnocs-FE"

## 1. SYSTEM CONTEXT & IDENTITY

[DIRECTIVE]: Generate idiomatic code that strictly adheres to the architecture defined below. Prioritize consistency with existing files over novel solutions.

- **Project:** Dnocs-FE
- **Framework:** React
- **Core Stack:** 
  - `axios` (custom recipe abstraction), 
  - `zod` (validation/types), 
  - `vite` (build), 
  - `@tanstack/router` (routing).

## 2. CORE PRINCIPLES
- [THE FRAMEWORK IS THE PRIMITIVE] This project is NOT framework-agnostic. Do not attempt to separate business logic into "pure" JS/TS layers that avoid React. 
- [HOOK-FIRST LOGIC] React hooks (`useState`, `useEffect`, `useContext`) are the fundamental building blocks for feature logic. Use them directly within usecase hooks.
- [CONVENTION > ABSTRACTION] Prioritize idiomatic React patterns over complex, library-agnostic abstractions.

## 3. ARCHITECTURAL INVARIANTS (FSD)

- [STRICT DEPENDENCY RULE] Higher layers can import from lower layers, but lower layers MUST NEVER import from higher layers.

| Layer # | Name         | Path            | Responsibility                                                       |
| :------ | :----------- | :-------------- | :------------------------------------------------------------------- |
| 6       | **routes**   | `src/routes/`   | Assembles features/widgets into pages; handles routing.              |
| 5       | **features** | `src/features/` | User-initiated actions and business workflows (forms, modals).       |
| 4       | **widgets**  | `src/widgets/`  | Composite, business-aware UI components.                             |
| 3       | **entities** | `src/entities/` | Core business concepts (schemas, API adapters, basic UI).            |
| 2       | **services** | `src/services/` | Global singleton services (`auth`, `i18n`, `dialog`, `event-bus`).   |
| 1       | **shared**   | `src/shared/`   | Application-agnostic, generic code (pure UI, utilities, api-client). |

## 4. REQUIRED CODING PATTERNS

### 4.1. Data Fetching & Mutations
- **Source:** All data interaction MUST use the custom abstraction at `src/shared/libs/api-client`.
- **DO:** Use custom declarative hooks for `GET` requests (e.g., `useApiGet`).
- **DO:** Use composed typed API objects for `POST`/`PUT`/`DELETE` (e.g., `ApiSubscription.Renew.$Id.doPost`).
- **DON'T:** Introduce `fetch`, `SWR`, or other fetching libraries.
- **DON'T:** Call `axios` directly from a feature.

### 4.2. UI Services
- **Mechanism:** Global UI services are consumed via dedicated hooks exported from `@/services/*`.
- **DO:** Use hooks like `useDialog()`, `useToaster()` to get the control function.
- **DO:** Pass actions directly to the service config (e.g., `yes: async () => { ... }`).
- **DON'T:** Use a generic event bus for standard UI patterns.

### 4.3. Data Validation & Typing
- **Mechanism:** `zod` is the single source of truth.
- **DO:** Define a `zod` schema in a `rules/` directory within the relevant FSD slice for ANY data structure.
- **DO:** Infer TypeScript types directly from the `zod` schema.
- **DON'T:** Manually define interfaces or types if a schema can be used.

### 4.4. Usecases & Business Logic
- **Location:** Complex feature logic MUST reside in `usecase` files within the relevant FSD slice.
- **DO:** Write usecases as custom hooks (e.g., `useRenewSubscription`).
- **DO:** Use primitive React hooks directly inside these usecase hooks.

### 4.5. Naming Conventions
- **DO:** Use `PascalCase` for React component folder (`Component/index.tsx`) and file names.
- **DO:** Use Angular-style `feature.type.ts` casing for APIs inside `src/shared/api`.
  - **EXAMPLE:** `/v1/database-user/grant/{userId}` translates to the `database-user.grant.$userId.ts` filename with an additional `database-user.ts` entrypoint file.
- **DO:** Use `kebab-case` everywhere else.
- **DO:** Prefix the slices folder names with `-` when private scoping is mandated.
  - **EXAMPLE:** The routes inside `routes` folder.

## 5. STANDARD SLICE ANATOMY

### Directory Definitions:
- `rules/`: Single Source of Truth for shapes (Zod Schemas, Types).
- `models/`: Manages state & data flow (Stores, Contexts).
- `usecase/`: Orchestrates interactions (API + State + UI Services).
- `adapter/`: Maps DTOs to Domain types.
- `lib/`: Pure functions with no side effects.

### UI Layer Definitions:
- `ui`: Encompasses all visual elements (Components, constants, mappers).
- `presentation`: Pure props-in/element-out components. No logic.
- `view`: Smart components connected to `model` or `usecase`.

### Layer-Specific Structure:
- **Entities (`src/entities/*`):** Encapsulate all visual logic in a single `ui/` folder (contains `presentation/` and `view/`).
- **Features & Routes (`src/features/*`, `src/routes/*`):** Flattened structure. 
  - `view/` (or `-view/`) is the main entry point, with `-presentation/` nested inside.
  - Non-visual directories (`model/`, `rules/`) stand alone.
