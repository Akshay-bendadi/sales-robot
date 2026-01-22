import { create } from "zustand";

interface CustomerStoreState {
  selectedIds: string[];
  isModalOpen: boolean;
  editingCustomerId: string | null;
  isViewMode: boolean;

  setSelectedIds: (ids: string[]) => void;
  toggleSelection: (id: string) => void;
  clearSelection: () => void;
  openModal: (customerId?: string, isViewMode?: boolean) => void;
  closeModal: () => void;
  setIsViewMode: (isViewMode: boolean) => void;
}

export const useCustomerStore = create<CustomerStoreState>((set) => ({
  selectedIds: [],
  isModalOpen: false,
  editingCustomerId: null,
  isViewMode: false,

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleSelection: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id],
    })),

  clearSelection: () => set({ selectedIds: [] }),

  openModal: (customerId, isViewMode = false) =>
    set({
      isModalOpen: true,
      editingCustomerId: customerId || null,
      isViewMode,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingCustomerId: null,
      isViewMode: false,
    }),

  setIsViewMode: (isViewMode) => set({ isViewMode: isViewMode }),
}));
