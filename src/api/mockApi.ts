import { Customer, CustomerFormData } from "@/modules/customer/types/customer";

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1848291849",
    name: "Ann Culhane",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Open",
    rate: 70.0,
    balance: -270.0,
    deposit: 500.0,
  },
  {
    id: "2848291849",
    name: "Ahmad Rosser",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Paid",
    rate: 70.0,
    balance: 270.0,
    deposit: 500.0,
  },
  {
    id: "3848291849",
    name: "Zain Calzoni",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Open",
    rate: 70.0,
    balance: -20.0,
    deposit: 500.0,
  },
  {
    id: "4848291849",
    name: "Leo Stanton",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Inactive",
    rate: 70.0,
    balance: 600.0,
    deposit: 500.0,
  },
  {
    id: "5848291849",
    name: "Kaiya Vetrovs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Open",
    rate: 70.0,
    balance: -350.0,
    deposit: 500.0,
  },
  {
    id: "6848291849",
    name: "Ryan Westervelt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Paid",
    rate: 70.0,
    balance: -270.0,
    deposit: 500.0,
  },
  {
    id: "7848291849",
    name: "Corey Stanton",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Due",
    rate: 70.0,
    balance: 30.0,
    deposit: 500.0,
  },
  {
    id: "8848291849",
    name: "Adison Aminoff",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    rate: 70.0,
    balance: -270.0,
    deposit: 500.0,
  },
  {
    id: "9848291849",
    name: "Alfredo Aminoff",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Inactive",
    rate: 70.0,
    balance: 460.0,
    deposit: 500.0,
  },
  {
    id: "1084829184",
    name: "Maya Richardson",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    rate: 85.0,
    balance: 120.0,
    deposit: 750.0,
  },
  {
    id: "1184829184",
    name: "Ethan Cole",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Due",
    rate: 60.0,
    balance: -90.0,
    deposit: 400.0,
  },
  {
    id: "1284829184",
    name: "Sophia Martinez",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Inactive",
    rate: 75.0,
    balance: 520.0,
    deposit: 600.0,
  },
  {
    id: "1384829184",
    name: "Liam O’Connor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Open",
    rate: 90.0,
    balance: 310.0,
    deposit: 1000.0,
  },
  {
    id: "1484829184",
    name: "Ava Thompson",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla",
    status: "Due",
    rate: 65.0,
    balance: -150.0,
    deposit: 450.0,
  },
];

let customersStore: Customer[] = [...mockCustomers];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getCustomers: async (): Promise<Customer[]> => {
    await delay(300);
    return [...customersStore];
  },

  addCustomer: async (data: CustomerFormData): Promise<Customer> => {
    await delay(300);
    const newCustomer: Customer = {
      ...data,
      id: Date.now().toString(),
    };
    customersStore = [newCustomer, ...customersStore];
    return newCustomer;
  },

  updateCustomer: async (id: string, data: CustomerFormData): Promise<Customer> => {
    await delay(300);
    const updatedCustomer: Customer = { ...data, id };
    customersStore = customersStore.map((c) => (c.id === id ? updatedCustomer : c));
    return updatedCustomer;
  },

  deleteCustomers: async (ids: string[]): Promise<void> => {
    await delay(300);
    customersStore = customersStore.filter((c) => !ids.includes(c.id));
  },
};
