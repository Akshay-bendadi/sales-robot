import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { customerService } from "@/modules/customer/services";
import { CustomerFormData } from "@/modules/customer/types";

export const CUSTOMERS_QUERY_KEY = ["customers"];

export const useCustomersQuery = () => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: customerService.getCustomers,
  });
};

export const useAddCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerFormData) => customerService.addCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      toast.success("Customer added successfully");
    },
  });
};

export const useUpdateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CustomerFormData }) =>
      customerService.updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      toast.success("Customer updated successfully");
    },
  });
};

export const useDeleteCustomersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => customerService.deleteCustomers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      toast.success("Customers deleted successfully");
    },
  });
};
