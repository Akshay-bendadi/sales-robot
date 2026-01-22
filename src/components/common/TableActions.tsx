import { Plus, ListFilter, Trash2, Pencil, Search } from "lucide-react";
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
    <div className="flex items-center justify-between bg-gray-100/75 p-2 rounded-md">
      <div className="flex items-center space-x-2 h-10">
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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-10 w-10 bg-white">
              <ListFilter className="h-4 w-4 text-text-header" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-placeholder" />
              <Input
                placeholder="Search..."
                className="w-[300px] bg-white pl-9 placeholder:text-placeholder"
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
            className="bg-brand hover:bg-brand-hover text-white"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Update Customer
          </Button>
        ) : (
          <Button onClick={() => openModal()} className="bg-brand hover:bg-brand-hover text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add customer
          </Button>
        )}
      </div>
    </div>
  );
}
