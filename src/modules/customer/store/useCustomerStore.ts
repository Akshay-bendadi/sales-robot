import { create } from "zustand";

interface CustomerStoreState {
  selectedIds: string[];
  isModalOpen: boolean;
  editingCustomerId: string | null;

  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  openModal: (customerId?: string) => void;
  closeModal: () => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  selectedIds: [],
  isModalOpen: false,
  editingCustomerId: null,

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleSelection: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id],
    })),

  clearSelection: () => set({ selectedIds: [] }),

  openModal: (customerId) =>
    set({
      isModalOpen: true,
      editingCustomerId: customerId || null,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingCustomerId: null,
    }),
}));
