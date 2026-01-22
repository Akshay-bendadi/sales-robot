import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  rowCount?: number;
}

export function TableSkeleton({ rowCount = 10 }: TableSkeletonProps) {
  return (
    <div className="relative flex flex-col">
      <div className="max-h-[654px] overflow-auto relative rounded-t-lg border-b-0 no-scrollbar">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="bg-gray-100/75 sticky top-0 z-10 shadow-sm transition-colors">
            <TableRow>
              <TableHead className="py-3 !px-2.5">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="w-[36px] px-2.5 py-3">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="w-[160px] px-2.5 py-3">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="min-w-[238px] px-2.5 py-3 whitespace-nowrap">
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="w-[70px] px-2.5 py-3 whitespace-nowrap">
                <Skeleton className="h-4 w-12" />
              </TableHead>
              <TableHead className="w-[100px] px-2.5 py-3 text-right whitespace-nowrap">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
              <TableHead className="w-[100px] px-2.5 py-3 text-right whitespace-nowrap">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
              <TableHead className="w-[100px] px-2.5 py-3 text-right whitespace-nowrap">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
              <TableHead className="px-[3px] py-3" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i} className="hover:bg-slate-50 even:bg-gray-50 group">
                <TableCell className="px-2.5 py-3">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell className="px-2.5 py-3">
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell className="px-2.5 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </TableCell>
                <TableCell className="px-2.5 py-3 whitespace-nowrap">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell className="px-2.5 py-3 whitespace-nowrap">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </TableCell>
                <TableCell className="px-2.5 py-3 text-right whitespace-nowrap">
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </TableCell>
                <TableCell className="px-2.5 py-3 text-right whitespace-nowrap">
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </TableCell>
                <TableCell className="px-2.5 py-3 text-right whitespace-nowrap">
                  <div className="flex flex-col items-end gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </TableCell>
                <TableCell className="px-2.5 py-3">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
