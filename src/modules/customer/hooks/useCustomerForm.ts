import { useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerFormData } from "@/modules/customer/types";
import { customerSchema } from "@/modules/customer/validation";

interface UseCustomerFormProps {
  defaultValues?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  isReadOnly?: boolean;
}

export const useCustomerForm = ({ defaultValues, onSubmit, isReadOnly }: UseCustomerFormProps) => {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema) as Resolver<CustomerFormData>,
    defaultValues: defaultValues || {
      name: "",
      description: "",
      status: "Open",
      rate: 0,
      balance: 0,
      deposit: 0,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        name: "",
        description: "",
        status: "Open",
        rate: 0,
        balance: 0,
        deposit: 0,
      });
    }
  }, [defaultValues, form]);

  const handleFormSubmit = async (values: CustomerFormData) => {
    if (isReadOnly) {
      return;
    }
    await onSubmit(values);
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleFormSubmit),
  };
};
