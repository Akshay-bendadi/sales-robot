import { useState } from "react";
import { Plus, Trash2, Pencil, Search, Funnel, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomerStore } from "@/modules/customer/store/useCustomerStore";
import { useDeleteCustomers } from "@/hooks/useCustomers";
import { ConfirmationModal } from "./ConfirmationModal";

export function TableActions() {
  const { selectedIds, openModal, clearSelection } = useCustomerStore();
  const deleteCustomers = useDeleteCustomers();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const hasSelection = selectedIds.length > 0;
  const isSingleSelection = selectedIds.length === 1;

  const handleDelete = async () => {
    try {
      await deleteCustomers.mutateAsync(selectedIds);
      clearSelection();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete customers:", error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100/75 px-5 py-4 rounded-md w-full">
      <div className="flex items-center gap-2">
        {hasSelection ? (
          <>
            <span className="text-xs leading-[18px] font-medium text-text-header">
              {selectedIds.length} selected
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="h-8 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 bg-white shadow-checkbox"
              disabled={deleteCustomers.isPending}
            >
              {deleteCustomers.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </Button>
            <ConfirmationModal
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              onConfirm={handleDelete}
              title="Delete Customers"
              message={`Are you sure you want to delete ${selectedIds.length} selected customer${selectedIds.length > 1 ? "s" : ""}? This action cannot be undone.`}
              okText="Delete"
              variant="danger"
              isLoading={deleteCustomers.isPending}
            />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-8 w-10 bg-white">
              <Funnel className="text-text-header" fill="text-header" size={16} />
            </Button>
            <div className="relative h-8">
              <Search size={16} className="absolute left-2.5 top-2 text-placeholder" />
              <Input
                placeholder="Search..."
                className="w-[320px] h-8 bg-white pl-9 placeholder:text-placeholder text-sm"
              />
            </div>
            {/* Additional filters could go here */}
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {isSingleSelection ? (
          <Button
            onClick={() => openModal(selectedIds[0], false)}
            className="bg-brand font-medium text-sm leading-5 hover:bg-brand-hover text-white h-8 px-3 py-1.5 tracking-[0.28px]"
          >
            <Pencil size={16} />
            Update Customer
          </Button>
        ) : (
          <Button
            onClick={() => openModal()}
            className="bg-brand font-medium text-sm leading-5 hover:bg-brand-hover text-white h-8 px-3 py-1.5 tracking-[0.28px]"
          >
            <Plus size={16} />
            Add customer
          </Button>
        )}
      </div>
    </div>
  );
}
