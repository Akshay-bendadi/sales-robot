import * as z from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["Open", "Inactive", "Paid", "Due"]),
  rate: z.coerce.number().min(0, "Rate must be a positive number"),
  balance: z.coerce.number(),
  deposit: z.coerce.number().min(0, "Deposit must be a positive number"),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
