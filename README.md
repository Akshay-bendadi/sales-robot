# Customer Payment Dashboard

A high-performance, responsive dashboard built for managing customer payment details.

## Tech Stack

- **Framework**: [React](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Global UI state)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (Server state management)
- **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Architectural Choices

### 1. Feature-Based Module Structure

The project is organized into functional modules (e.g., `modules/customer`). This promotes scalability and keeps related components, stores, and types together.

### 2. Centralized State Management

- **TanStack Query (v5)**: Used for all data-fetching and mutations. It handles caching, loading states, and automatic re-fetching (e.g., invalidating queries after a successful update).
- **Zustand**: Used for lightweight global UI state, such as managing modal visibility and row selection. This separates UI logic from data logic.

### 3. Global Error Handling

Implemented a centralized error handling system using TanStack Query's `QueryCache` and `MutationCache`. This ensures consistent user feedback (via Sonner toasts) for both fetching and data persistence errors across the entire application.

### 4. Robust Form Lifecycle

The `CustomerForm` includes explicit guards and event prevention to ensure a clean transition between "View" and "Edit" modes, preventing accidental submissions and ensuring a seamless CRUD experience.

### 5. Design Fidelity

Strict adherence to typography (custom "overline" style) and layout specifications. The table headers use specific uppercase tracking and alignment to match premium dashboard standards.

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
