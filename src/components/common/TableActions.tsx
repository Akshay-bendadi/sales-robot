import { Plus, Trash2, Pencil, Search, Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomerStore } from "@/modules/customer/store/useCustomerStore";
import { useDeleteCustomers } from "@/hooks/useCustomers";

export function TableActions() {
  const { selectedIds, openModal, clearSelection } = useCustomerStore();
  const deleteCustomers = useDeleteCustomers();

  const hasSelection = selectedIds.length > 0;
  const isSingleSelection = selectedIds.length === 1;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete the selected customers?")) {
      await deleteCustomers.mutateAsync(selectedIds);
      clearSelection();
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-100/75 px-5 py-4 rounded-md w-full">
      <div className="flex items-center">
        {hasSelection ? (
          <>
            <span className="text-sm font-medium text-slate-600 pl-2">
              {selectedIds.length} selected
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
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
            onClick={() => openModal(selectedIds[0])}
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
