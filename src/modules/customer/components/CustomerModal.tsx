import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomerForm } from "./CustomerForm";
import { useCustomerStore } from "@/modules/customer/store/useCustomerStore";
import { useAddCustomer, useUpdateCustomer, useCustomers } from "@/hooks/useCustomers";
import { CustomerFormData } from "@/modules/customer/types/customer";

export function CustomerModal() {
  const { isModalOpen, closeModal, editingCustomerId, isViewMode, setIsViewMode } =
    useCustomerStore();
  const { data: customers } = useCustomers();
  const addCustomer = useAddCustomer();
  const updateCustomer = useUpdateCustomer();

  const editingCustomer = customers?.find((c) => c.id === editingCustomerId);

  const handleSubmit = async (data: CustomerFormData) => {
    try {
      if (editingCustomerId) {
        await updateCustomer.mutateAsync({ id: editingCustomerId, data });
      } else {
        await addCustomer.mutateAsync(data);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  const isLoading = addCustomer.isPending || updateCustomer.isPending;

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode
              ? "Customer Details"
              : editingCustomerId
                ? "Edit Customer"
                : "Add New Customer"}
          </DialogTitle>
        </DialogHeader>
        <CustomerForm
          defaultValues={editingCustomer}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isLoading={isLoading}
          isReadOnly={isViewMode}
          onEditClick={() => setIsViewMode(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
