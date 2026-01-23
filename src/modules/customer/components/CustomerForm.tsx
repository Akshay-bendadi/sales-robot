import { LuLoaderCircle } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "@/components/ui";
import { CustomerFormData } from "@/modules/customer/types";
import { useCustomerForm } from "@/modules/customer/hooks";

interface CustomerFormProps {
  defaultValues?: CustomerFormData;
  onSubmit: (data: CustomerFormData) => Promise<void>;
  isLoading?: boolean;
  onCancel: () => void;
  isReadOnly?: boolean;
  onEditClick?: () => void;
}

export function CustomerForm({
  defaultValues,
  onSubmit,
  isLoading,
  onCancel,
  isReadOnly,
  onEditClick,
}: CustomerFormProps) {
  const { form, handleSubmit } = useCustomerForm({
    defaultValues,
    onSubmit,
    isReadOnly,
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField<CustomerFormData>
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter customer name"
                  {...field}
                  disabled={isLoading || isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField<CustomerFormData>
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter description"
                  {...field}
                  disabled={isLoading || isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField<CustomerFormData>
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value as string}
                  disabled={isLoading || isReadOnly}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Due">Due</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<CustomerFormData>
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} disabled={isLoading || isReadOnly} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField<CustomerFormData>
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} disabled={isLoading || isReadOnly} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<CustomerFormData>
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} disabled={isLoading || isReadOnly} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-[14px] h-12 px-6 font-semibold"
          >
            Cancel
          </Button>
          {isReadOnly ? (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick?.();
              }}
              className="bg-brand hover:bg-brand-hover text-white rounded-[14px] h-12 px-6 font-semibold shadow-sm"
            >
              Edit
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-[14px] h-12 px-6 font-semibold shadow-sm"
            >
              {isLoading && <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {defaultValues ? "Save Changes" : "Add Customer"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
