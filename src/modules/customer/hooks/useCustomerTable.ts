import { useState, useMemo } from "react";
import { Customer } from "@/modules/customer/types";
import { useCustomerStore } from "@/modules/customer/store";

interface UseCustomerTableProps {
  customers: Customer[] | undefined;
  itemsPerPage: number;
}

export const useCustomerTable = ({ customers, itemsPerPage }: UseCustomerTableProps) => {
  const { selectedIds, setSelectedIds } = useCustomerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  // Sorting logic
  const sortedCustomers = useMemo(() => {
    if (!customers) return [];
    return [...customers].sort((a, b) => {
      return sortAsc ? parseInt(a.id) - parseInt(b.id) : parseInt(b.id) - parseInt(a.id);
    });
  }, [customers, sortAsc]);

  // Pagination logic
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedCustomers.map((c) => c.id);
      const newSelection = [...new Set([...selectedIds, ...pageIds])];
      setSelectedIds(newSelection);
    } else {
      const pageIds = paginatedCustomers.map((c) => c.id);
      const newSelection = selectedIds.filter((id) => !pageIds.includes(id));
      setSelectedIds(newSelection);
    }
  };

  const isAllPageSelected =
    paginatedCustomers.length > 0 && paginatedCustomers.every((c) => selectedIds.includes(c.id));
  const isSomePageSelected =
    paginatedCustomers.some((c) => selectedIds.includes(c.id)) && !isAllPageSelected;

  return {
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
  };
};
