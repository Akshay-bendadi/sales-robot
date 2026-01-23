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
import { HiMiniTrash } from "react-icons/hi2";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCheck } from "react-icons/rx";
import { FaMinus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { ConfirmationModal, TableSkeleton } from "@/components/common";
import { IoInformationCircle, IoPencilSharp } from "react-icons/io5";
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

  const headerStyles =
    "font-semibold text-[11px] leading-4 uppercase text-text-header font-overline";

  return (
    <div className="relative flex flex-col">
      <div className="max-h-[654px] overflow-auto relative border-b-0 no-scrollbar">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="bg-gray-100/75 sticky top-0 z-10 shadow-sm transition-colors">
            <TableRow>
              <TableHead className="py-3 !px-2.5">
                <Checkbox
                  icon={FaMinus}
                  className="w-4 h-4 rounded-[4px] shadow-checkbox border-none"
                  checked={isAllPageSelected || (isSomePageSelected ? "indeterminate" : false)}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[56px] px-2.5 py-3">
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
                  <TbCaretUpDownFilled className="h-4 w-4 text-text-icon" />
                </Button>
              </TableHead>
              <TableHead className="w-[180px] px-2.5 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto p-0 hover:bg-transparent flex items-center gap-0.5",
                    headerStyles
                  )}
                >
                  NAME
                  <TbCaretUpDownFilled className="h-4 w-4 text-text-icon" />
                </Button>
              </TableHead>
              <TableHead className={cn("min-w-[258px] px-2.5 py-3", headerStyles)}>
                DESCRIPTION
              </TableHead>
              <TableHead className={cn("w-[90px] px-2.5 py-3", headerStyles)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto p-0 hover:bg-transparent flex items-center gap-0.5",
                    headerStyles
                  )}
                >
                  STATUS
                  <TbCaretUpDownFilled className="h-4 w-4 text-text-icon" />
                </Button>
              </TableHead>
              <TableHead className={cn("w-[120px] px-2.5 py-3 text-right", headerStyles)}>
                RATE
              </TableHead>
              <TableHead className={cn("w-[120px] px-2.5 py-3 text-right", headerStyles)}>
                BALANCE
              </TableHead>
              <TableHead className={cn("w-[120px] px-2.5 py-3 text-right", headerStyles)}>
                DEPOSIT
              </TableHead>
              <TableHead className={cn("w-[40px] py-3", headerStyles)} />
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
                  className={cn(
                    "hover:bg-slate-50 even:bg-gray-50 group",
                    isSelected && "bg-[#EBF0FA] hover:bg-[#EBF0FA] even:bg-[#EBF0FA]"
                  )}
                >
                  <TableCell
                    className={cn(
                      "px-2.5 py-3 relative",
                      isSelected &&
                        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#2264E5]"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      icon={RxCheck}
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
                          <BsThreeDotsVertical className="h-4 w-4" />
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
                          <IoInformationCircle size={16} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center justify-between px-2.5 py-1 text-brand cursor-pointer focus:bg-slate-50 focus:text-brand rounded-[4px]"
                          onClick={() => openModal(customer.id, false)}
                        >
                          <span className="text-sm font-medium leading-5">Edit</span>
                          <IoPencilSharp size={16} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="flex items-center justify-between px-2.5 py-1 text-status-due-text cursor-pointer focus:bg-slate-50 focus:text-red-500 rounded-[4px]"
                          onClick={() => setCustomerToDelete(customer.id)}
                        >
                          <span className="text-sm font-medium leading-5">Delete</span>
                          <HiMiniTrash size={16} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            {Array.from({ length: Math.max(0, 5 - paginatedCustomers.length) }).map((_, i) => (
              <TableRow
                key={`empty-${i}`}
                className="h-[73px] border-none hover:bg-transparent px-2.5"
              >
                <TableCell colSpan={10} className="text-center text-slate-400 font-medium">
                  {paginatedCustomers.length === 0 && i === 2 ? "No Data Found" : ""}
                </TableCell>
              </TableRow>
            ))}
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
          {sortedCustomers.length === 0
            ? "0"
            : `${startIndex + 1}-${Math.min(startIndex + itemsPerPage, sortedCustomers.length)}`}{" "}
          of {sortedCustomers.length}
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
              <MdKeyboardArrowLeft size={16} />
            </Button>
            <div className="text-xs leading-[18px] font-medium text-text-secondary">
              <span className="text-text-header">
                {sortedCustomers.length === 0 ? 0 : currentPage}
              </span>
              <span className="text-text-secondary">/{Math.min(currentPage, totalPages)}</span>
            </div>
            <Button
              variant="outline"
              className="h-5 w-6 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <MdKeyboardArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
