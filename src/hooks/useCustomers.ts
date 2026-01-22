import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/api/mockApi";
import { CustomerFormData } from "@/modules/customer/types/customer";

const CUSTOMERS_QUERY_KEY = ["customers"];

export const useCustomers = () => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: mockApi.getCustomers,
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CustomerFormData) => mockApi.addCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CustomerFormData }) =>
      mockApi.updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useDeleteCustomers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => mockApi.deleteCustomers(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};
