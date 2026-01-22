import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/modules/customer/components/StatusBadge";
import { useCustomers } from "@/hooks/useCustomers";
import { useCustomerStore } from "@/modules/customer/store/useCustomerStore";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Loader2,
  Minus,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

export function CustomerTable() {
  const { data: customers, isLoading } = useCustomers();
  const { selectedIds, setSelectedIds, toggleSelection } = useCustomerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-slate-200">
        No customers found. Add a customer to get started.
      </div>
    );
  }

  // Sorting
  const sortedCustomers = [...customers].sort((a, b) => {
    // Simple ID sort for the # column as implied by design
    return sortAsc ? parseInt(a.id) - parseInt(b.id) : parseInt(b.id) - parseInt(a.id);
  });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedCustomers.map((c) => c.id);
      // Add page IDs to existing selection, avoiding duplicates
      const newSelection = [...new Set([...selectedIds, ...pageIds])];
      setSelectedIds(newSelection);
    } else {
      // Remove page IDs from selection
      const pageIds = paginatedCustomers.map((c) => c.id);
      const newSelection = selectedIds.filter((id) => !pageIds.includes(id));
      setSelectedIds(newSelection);
    }
  };

  const isAllPageSelected =
    paginatedCustomers.length > 0 && paginatedCustomers.every((c) => selectedIds.includes(c.id));
  const isSomePageSelected =
    paginatedCustomers.some((c) => selectedIds.includes(c.id)) && !isAllPageSelected;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100/75">
            <TableRow>
              <TableHead className="w-[50px] pl-4">
                <Checkbox
                  icon={Minus}
                  checked={isAllPageSelected || (isSomePageSelected ? "indeterminate" : false)}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[80px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 data-[state=open]:bg-accent text-text-header"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  #
                  <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[200px] text-text-header">NAME</TableHead>
              <TableHead className="min-w-[300px] text-text-header">DESCRIPTION</TableHead>
              <TableHead className="w-[120px] text-text-header">STATUS</TableHead>
              <TableHead className="text-right text-text-header">RATE</TableHead>
              <TableHead className="text-right text-text-header">BALANCE</TableHead>
              <TableHead className="text-right pr-6 text-text-header">DEPOSIT</TableHead>
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
                  className="hover:bg-slate-50 even:bg-gray-50"
                  onClick={() => {
                    // Prevent toggling when clicking specific interactive elements if needed
                    // For now, allow row click to select based on typical table UX?
                    // Spec says: "On single/multiple row selection..." -> implying checkbox usage mostly,
                    // but often row click is handy. Let's keep it to checkbox for precision,
                    // or implement row click as selection toggle.
                    // Design pattern usually favors checkbox for multi-select.
                  }}
                >
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelection(customer.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{customerIndex}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-body">{customer.name}</span>
                      <span className="text-xs text-text-secondary">{customer.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600 max-w-[300px] truncate">
                    {customer.description}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col">
                      <span className="text-text-header">{formatCurrency(customer.rate)}</span>
                      <span className="text-xs text-text-secondary">CAD</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col">
                      <span className="text-text-balance">{formatCurrency(customer.balance)}</span>
                      <span className="text-xs text-text-currency-balance">CAD</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex flex-col">
                      <span className="text-text-header">{formatCurrency(customer.deposit)}</span>
                      <span className="text-xs text-text-secondary">CAD</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 sticky bottom-0 z-10 bg-gray-100/75 backdrop-blur-[8px]">
        <div className="text-sm text-slate-500">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedCustomers.length)}{" "}
          of {sortedCustomers.length}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-slate-500">Rows per page</p>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium">10</span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {currentPage} / {Math.max(1, totalPages)}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
