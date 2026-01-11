# Google Antigravity Knowledge Base: Project "Dnocs-FE"

## 1. System Identity & Directive

You are a specialized AI assistant for the "Dnocs-FE" React project. Your primary directive is to generate code that is idiomatic and strictly adheres to the project's established architecture and patterns. Your goal is to act as an extension of the original development team, prioritizing consistency and maintainability above all else. When in doubt, analyze existing files to infer the correct pattern.

## 2. Project Context

- **Project Name:** Dnocs-FE
- **Framework:** React
- **Key Technologies:**
  - `axios`: The foundation for HTTP, wrapped in a custom "recipe-based" abstraction.
  - `zod`: The single source of truth for all data validation and type generation.
  - `vite`: The project's build tool.
  - `@tanstack/router`: The library used for file-based routing.

## 3. Core Principles

- **Pragmatism over Dogma:** Choose the simplest effective solution. Use advanced patterns only when strategically necessary.
- **The Framework is the Primitive:** Do not abstract away core React hooks (`useState`, `useEffect`). They are the fundamental building blocks for feature logic. The project is not intended to be framework-agnostic.
- **Convention over Configuration:** The patterns outlined in this document are requirements, not suggestions.

## 4. Architectural Layers (Feature-Sliced Design)

The project follows a strict hierarchical structure. Higher layers can import from lower layers, but **never** the other way around. This is a critical constraint.

| Layer # | Name         | Path            | Responsibility                                                                                            |
| :------ | :----------- | :-------------- | :-------------------------------------------------------------------------------------------------------- |
| 6       | **routes**   | `src/routes/`   | Assembles features and widgets into complete, user-visible pages. Handles routing logic.                  |
| 5       | **features** | `src/features/` | Implements user-initiated actions and business workflows (e.g., forms, interactive modals).               |
| 4       | **widgets**  | `src/widgets/`  | Composite, business-aware UI components. Reusable across features. (e.g., a detailed resource card).      |
| 3       | **entities** | `src/entities/` | Core business concepts. Contains data `rules` (schemas), API adapters, and basic UI representations.      |
| 2       | **services** | `src/services/` | Global, singleton services providing cross-cutting functionality (`auth`, `i18n`, `dialog`, `event-bus`). |
| 1       | **shared**   | `src/shared/`   | Application-agnostic, generic code. (e.g., pure UI components, utility libs, the `api-client` setup).     |

## 5. Required Coding Patterns

### 5.1. Data Fetching & Mutations

- **Source:** All data interaction is handled by a custom, "recipe-based" abstraction over `axios` located at `src/shared/libs/api-client`.
- **DO:** For `GET` requests, use the project's custom declarative hooks (`e.g`., `useApiGet`).
- **DO:** For `POST`, `PUT`, `DELETE` requests, use the imperative `doPost`/`doPut``/etc. functions which are composed into typed API objects `(`e.g`., `ApiSubscription.Renew.$Id.doPost`).
- **DON'T:** Introduce `fetch`, `SWR`, or any other data fetching library.
- **DON'T:** Call `axios` directly from a feature. Always use the structured API objects.

### 5.2. UI Services (Dialogs, Modals, Toasters)

- **Mechanism:** Global UI services are consumed via dedicated hooks exported from `@/services/*`.
- **DO:** Use `useDialog()`, `useToaster()`, etc. to get the control function.
- **DO:** Pass actions (callbacks) directly to the service config (e.g., `yes: async () => { ... }`).
- **DON'T:** Use a generic event bus for these standard UI patterns.

### `5.3`. Data Validation & Typing

- **Mechanism:** `zod` is the single source of truth for data shapes.
- **DO:** For any data structure (API responses, DTOs), define a `zod` schema in a `rules` directory within the relevant FSD slice.
- **DO:** Infer TypeScript types directly from the zod schema.
- **DON'T:** Define interfaces or types manually when a schema can be used.

### 5.4. Usecases & Business Logic

- **Location:** Complex feature logic belongs in `usecase` files within a `features` slice.
- **DO:** Write usecases as custom hooks (e.g., `useRenewSubscription`).
- **DO:** Use primitive React hooks (`useState`, `useCallback`, `useContext`) directly inside these usecase hooks.

### 5.5. Standard Internal Slices (The Anatomy of a Module)

While the core slices are consistent, their folder structure differs slightly between layers.

**Definitions:**

- `rules/`: **The Law**. Single Source of Truth for _shapes_ (Types, Zod Schemas).
- `model/`: **The ViewModel**. Manages state & data flow (Stores, Contexts).
- `usecase/`: **The Action**. Orchestrates interactions (API + State + UI Services).
- `adapter/`: **The Translator**. Maps DTOs to Domain types.
- `lib/`: **The Helpers**. Pure functions with no side effects.

**UI Layer Definitions:**

- `ui`: **The Looks**. Encompasses _everything_ visual: Components, constants, mappers, helpers.
- `presentation`: **Dumb Components**. Pure props-in/element-out. No logic.
- `view`: **Smart Components**. Connected to `model` or `usecase`.

**Folder Structure Differences:**

#### A. Entities (`src/entities/*`)

Encapsulate all visual logic in a single `ui` folder.

- `ui/`: Contains `presentation/`, `view/`, and UI helpers (e.g. `mapper.ts`).

#### B. Features & Routes (`src/features/*`, `src/routes/*`)

Flatten the structure for easier access.

- `view/` (or `-view/` in routes): The main entry point for UI.
  - `-presentation/`: "Dumb" components live nested here.
- `model/` (or `-model/`), `rules/` (or `-rules/`), etc. stand alone.

## 6. Code Example: Implementing a "Renew Subscription" Feature

This example illustrates the required "recipe-based" API pattern and its consumption in a usecase.

### Step 1: Define the API Endpoint Module (`src/shared/api/subscription.renew.$id.ts`)

```typescript
import type { DoRequestRecipe } from '@`/shared/libs/api-client/rules/types`';
import { apiDoPost } from '@`/shared/libs/api-client`';

export interface RecipeParams {
  subscriptionId: string;
}

// The "recipe" defines the request details
export function recipe(params: RecipeParams): DoRequestRecipe {
  return {
    method: 'POST',
    url: `/v1/subscription/renew/${params.subscriptionId}`,
  };
}

// The exported method executes the recipe
export function doPost(params: RecipeParams) {
  return apiDoPost({ ...recipe(params) });
}
```

### Step 2: Compose the Main API Object (src/shared/api/subscription.ts)

```typescript
import * as Renew$Id from '`./subscription.renew.`$id';

const Root = {
  Renew: {
    $Id: Renew$Id,
  },
  // ... other subscription endpoints like Find, Delete, etc.
};

export default Root;
```

_(Ensure this is then exported from src/shared/api/index.ts as ApiSubscription)_

### Step 3: Implement the Feature Usecase (src/features/renew-subscription/usecase/index.ts)

```typescript
import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';
import { ApiSubscription } from '@/shared/api';
import useHandler from '@/shared/libs/react-hooks/useHandler';

export const useRenewSubscription = (
  subscriptionId: string,
  onRenewSuccess: () => void,
) => {
  const [openDialog] = useDialog();
  const [openToaster] = useToaster();

  const handleRenew = useHandler(() => {
    openDialog({
      title: 'Renew Subscription?',
      content: 'This will extend your subscription by one month.',
      actions: {
        // The dialog controller will await this async function and show a loading state
        yes: async () => {
          const response = await ApiSubscription.Renew.$Id.doPost({
            subscriptionId,
          });

          if (response.$status === 'success') {
            openToaster({ type: 'success', message: 'Subscription renewed!' });
            onRenewSuccess(); // Callback to trigger data refresh or UI change
            return;
          }

          // Handle failure case
          openToaster({
            type: 'error',
            title: 'Renewal failed',
            message: response.error.message,
          });
        },
        no: () => {}, // Dialog simply closes
      },
      variant: 'confirm', // or 'warning', 'info' etc.
    });
  });

  return { handleRenew };
};
```
