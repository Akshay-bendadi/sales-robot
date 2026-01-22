export type Customer = {
  id: string;
  name: string;
  description: string;
  status: "Open" | "Inactive" | "Paid" | "Due";
  rate: number;
  balance: number;
  deposit: number;
};

export type CustomerFormData = Omit<Customer, "id">;
