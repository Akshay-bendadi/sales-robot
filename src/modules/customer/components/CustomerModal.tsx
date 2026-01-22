import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";
import { CustomerForm } from "./CustomerForm";
import { useCustomerStore } from "@/modules/customer/store";
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useCustomersQuery,
} from "@/modules/customer/hooks";
import { CustomerFormData } from "@/modules/customer/types";

export function CustomerModal() {
  const { isModalOpen, closeModal, editingCustomerId, isViewMode, setIsViewMode } =
    useCustomerStore();
  const { data: customers } = useCustomersQuery();
  const addCustomer = useAddCustomerMutation();
  const updateCustomer = useUpdateCustomerMutation();

  const editingCustomer = customers?.find((c) => c.id === editingCustomerId);

  const handleSubmit = async (data: CustomerFormData) => {
    if (editingCustomerId) {
      await updateCustomer.mutateAsync({ id: editingCustomerId, data });
    } else {
      await addCustomer.mutateAsync(data);
    }
    closeModal();
  };

  const isLoading = addCustomer.isPending || updateCustomer.isPending;

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[600px] p-10">
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
