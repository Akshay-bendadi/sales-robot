import { mockApi } from "@/api/mockApi";
import { CustomerFormData, Customer } from "@/modules/customer/types";

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return mockApi.getCustomers();
  },

  addCustomer: async (data: CustomerFormData): Promise<Customer> => {
    return mockApi.addCustomer(data);
  },

  updateCustomer: async (id: string, data: CustomerFormData): Promise<Customer> => {
    return mockApi.updateCustomer(id, data);
  },

  deleteCustomers: async (ids: string[]): Promise<void> => {
    return mockApi.deleteCustomers(ids);
  },
};
