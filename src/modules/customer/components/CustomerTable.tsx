import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  Info,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  EllipsisVertical,
  Minus,
} from "lucide-react";
import { ConfirmationModal, TableSkeleton } from "@/components/common";
import {
  useCustomersQuery,
  useDeleteCustomersMutation,
  useCustomerTable,
} from "@/modules/customer/hooks";
import { useCustomerStore } from "@/modules/customer/store";
import { cn, formatCurrency } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

const DEFAULT_ITEMS_PER_PAGE = 10;

export function CustomerTable() {
  const { data: customers, isLoading: isCustomersLoading } = useCustomersQuery();
  const { toggleSelection, openModal } = useCustomerStore();
  const deleteCustomers = useDeleteCustomersMutation();
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const {
    currentPage,
    setCurrentPage,
    sortAsc,
    setSortAsc,
    totalPages,
    startIndex,
    paginatedCustomers,
    handleSelectAll,
    isAllPageSelected,
    isSomePageSelected,
    sortedCustomers,
    selectedIds,
  } = useCustomerTable({ customers, itemsPerPage });

  if (isCustomersLoading) {
    return <TableSkeleton rowCount={itemsPerPage} />;
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
        No Data Found
      </div>
    );
  }

  const headerStyles =
    "font-semibold text-[11px] leading-4 uppercase text-text-header font-overline";

  return (
    <div className="relative flex flex-col">
      <div className="max-h-[654px] overflow-auto relative rounded-t-lg border-b-0 no-scrollbar">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="bg-gray-100/75 sticky top-0 z-10 shadow-sm transition-colors">
            <TableRow>
              <TableHead className="py-3 !px-2.5">
                <Checkbox
                  icon={Minus}
                  className="w-4 h-4 rounded-[4px] shadow-checkbox border-none"
                  checked={isAllPageSelected || (isSomePageSelected ? "indeterminate" : false)}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[36px] px-2.5 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto p-0 hover:bg-transparent flex items-center gap-0.5",
                    headerStyles
                  )}
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  #
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[160px] px-2.5 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto p-0 hover:bg-transparent flex items-center gap-0.5",
                    headerStyles
                  )}
                >
                  NAME
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className={cn("min-w-[238px] px-2.5 py-3", headerStyles)}>
                DESCRIPTION
              </TableHead>
              <TableHead className={cn("w-[70px] px-2.5 py-3", headerStyles)}>STATUS</TableHead>
              <TableHead className={cn("w-[100px] px-2.5 py-3 text-right", headerStyles)}>
                RATE
              </TableHead>
              <TableHead className={cn("w-[100px] px-2.5 py-3 text-right", headerStyles)}>
                BALANCE
              </TableHead>
              <TableHead className={cn("w-[100px] px-2.5 py-3 text-right", headerStyles)}>
                DEPOSIT
              </TableHead>
              <TableHead className={cn("px-[3px] py-3", headerStyles)} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer, index) => {
              const customerIndex = startIndex + index + 1;
              const isSelected = selectedIds.includes(customer.id);

              return (
                <TableRow
                  key={customer.id}
                  data-state={isSelected ? "selected" : undefined}
                  className="hover:bg-slate-50 even:bg-gray-50 group"
                >
                  <TableCell className="px-2.5 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelection(customer.id)}
                      className="w-4 h-4 rounded-[4px] shadow-checkbox border-none"
                    />
                  </TableCell>
                  <TableCell className="px-2.5 font-medium text-text-body py-3">
                    {customerIndex}
                  </TableCell>
                  <TableCell className="px-2.5 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm leading-5 text-text-body truncate">
                        {customer.name}
                      </span>
                      <span className="text-xs leading-[18px] font-normal text-text-secondary">
                        {customer.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2.5 text-sm font-normal leading-5 text-text-header py-3">
                    <span className="line-clamp-2">{customer.description}</span>
                  </TableCell>
                  <TableCell className="px-2.5 py-3">
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="px-2.5 text-right py-3">
                    <div className="flex flex-col">
                      <span className="text-text-header font-normal text-sm leading-5">
                        {formatCurrency(customer.rate)}
                      </span>
                      <span className="text-xs text-text-secondary leading-[18px] font-normal tracking-[0.36px]">
                        CAD
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2.5 text-right py-3">
                    <div className="flex flex-col">
                      <span className="text-text-balance font-normal text-sm leading-5">
                        {formatCurrency(customer.balance)}
                      </span>
                      <span className="text-xs text-text-currency-balance leading-[18px] font-normal tracking-[0.36px]">
                        CAD
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2.5 text-right py-3">
                    <div className="flex flex-col">
                      <span className="text-text-header font-normal text-sm leading-5">
                        {formatCurrency(customer.deposit)}
                      </span>
                      <span className="text-xs text-text-secondary leading-[18px] font-normal tracking-[0.36px]">
                        CAD
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-2.5 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <EllipsisVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="py-2 px-1.5 shadow-md min-w-[120px]"
                        align="end"
                      >
                        <DropdownMenuItem
                          className="flex items-center justify-between px-2.5 py-1 text-brand cursor-pointer focus:bg-slate-50 focus:text-brand rounded-[4px]"
                          onClick={() => openModal(customer.id, true)}
                        >
                          <span className="text-sm font-medium leading-5">View</span>
                          <Info size={16} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center justify-between px-2.5 py-1 text-brand cursor-pointer focus:bg-slate-50 focus:text-brand rounded-[4px]"
                          onClick={() => openModal(customer.id, false)}
                        >
                          <span className="text-sm font-medium leading-5">Edit</span>
                          <Pencil size={16} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center justify-between px-2.5 py-1 text-status-due-text cursor-pointer focus:bg-slate-50 focus:text-red-500 rounded-[4px]"
                          onClick={() => setCustomerToDelete(customer.id)}
                        >
                          <span className="text-sm font-medium leading-5">Delete</span>
                          <Trash2 size={16} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="h-4" />
      </div>

      {!!customerToDelete && (
        <ConfirmationModal
          isOpen={!!customerToDelete}
          onClose={() => setCustomerToDelete(null)}
          onConfirm={async () => {
            if (customerToDelete) {
              await deleteCustomers.mutateAsync([customerToDelete]);
              setCustomerToDelete(null);
            }
          }}
          title="Delete Customer"
          message="Are you sure you want to delete this customer? This action cannot be undone."
          okText="Delete"
          variant="danger"
          isLoading={deleteCustomers.isPending}
        />
      )}

      {/* Pagination */}
      <div className="sticky bottom-0 h-11 w-full max-w-[1018px] mx-auto rounded-bl-lg rounded-br-lg flex items-center justify-between gap-5 px-5 py-[13px] bg-gray-100/75 backdrop-blur-[8px] z-20 mt-[-22px] shadow-sm">
        <div className="text-xs leading-[18px] font-medium text-text-secondary">
          {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedCustomers.length)} of{" "}
          {sortedCustomers.length}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <p className="text-xs leading-[18px] font-medium text-text-secondary">Rows per page:</p>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-auto p-0 border-none bg-transparent shadow-none focus:ring-0 text-text-secondary font-medium text-xs leading-[18px] w-fit gap-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="min-w-[40px] p-1 bg-white border-slate-200">
                {[5, 10, 15, 20, 30, 40, 50].map((value) => (
                  <SelectItem
                    key={value}
                    value={value.toString()}
                    className="flex justify-center text-sm font-medium leading-5 px-2.5 rounded-[4px] focus:bg-brand focus:text-white data-[state=checked]:bg-brand data-[state=checked]:text-white cursor-pointer"
                  >
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="h-5 w-6 p-0"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft size={16} />
            </Button>
            <div className="text-xs leading-[18px] font-medium text-text-secondary">
              <span className="text-text-header">{currentPage}</span>
              <span className="text-text-secondary">/{Math.max(1, totalPages)}</span>
            </div>
            <Button
              variant="outline"
              className="h-5 w-6 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
