# Customer Payment Dashboard

A premium, high-performance dashboard for professional customer management, featuring a modular architecture and state-of-the-art aesthetics.

## Tech Stack

- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCn UI](https://ui.shadcn.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (v5)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Client-side UI state)
- **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Architectural Architecture

The project implements a **Four-Layer Refined Architecture** for maximum maintainability:

1.  **Service Layer**: Decoupled, asynchronous client for raw API interactions (e.g., `customer.service.ts`).
2.  **Server State Layer**: Modular TanStack Query hooks for structured data fetching and mutation lifecycle management.
3.  **UI Logic Layer**: Specialized business logic hooks (e.g., `useCustomerTable`, `useCustomerForm`) that decouple complex interactions from the view.
4.  **View Layer**: "Thin" React components focused solely on rendering and user interaction.

## Design System & Aesthetics

- **Modern UI**: Uses a "soft and smooth" design language with depth-based shadows (`shadow-2xl`) and beautiful 24px curved edges.
- **Glassmorphism**: Subtle `backdrop-blur` and translucent backgrounds provide a premium, depth-aware interface.
- **Micro-interactions**: Standardized button heights (`h-12`) and bold typography for a professional, tactile experience.

## Code Organization (Barrel Pattern)

The codebase strictly adheres to the **Barrel Export Pattern**. Every functional directory contains an `index.ts` file, enabling clean, consolidated imports:

```typescript
// Example of consolidated barrel import
import { Button, Input, Checkbox } from "@/components/ui";
import { useCustomerTable, useCustomersQuery } from "@/modules/customer/hooks";
```

## Directory Structure

```text
src/
├── api/          # Global API/Mock clients
├── components/   # Shared UI and Common components
├── lib/          # Project-wide utilities and providers
├── modules/      # Feature-based modules (e.g., customer/)
│   └── customer/
│       ├── components/ # Module-specific components
│       ├── hooks/      # Module-specific logic (Queries & UI)
│       ├── services/   # Module-specific API services
│       └── store/      # Module-specific Zustand stores
│       └── types/      # Module-specific types
│       └── validations/      # Module-specific validations

```

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Run the development server**:
   ```bash
   pnpm run dev
   ```
4. **Build for production**:
   ```bash
   pnpm run build
   ```
