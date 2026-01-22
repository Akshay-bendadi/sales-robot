import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Customer } from "@/modules/customer/types/customer";

interface StatusBadgeProps {
  status: Customer["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: Customer["status"]) => {
    switch (status) {
      case "Open":
        return "bg-status-open-bg text-status-open-text hover:bg-status-open-bg/90 border-none";
      case "Paid":
        return "bg-status-paid-bg text-status-paid-text hover:bg-status-paid-bg/90 border-none";
      case "Inactive":
        return "bg-status-inactive-bg text-status-inactive-text hover:bg-status-inactive-bg/90 border-none";
      case "Due":
        return "bg-status-due-bg text-status-due-text hover:bg-status-due-bg/90 border-none";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-200 border-none";
    }
  };

  return (
    <Badge className={cn("font-medium px-2.5 py-0.5 shadow-none", getStatusStyles(status))}>
      {status}
    </Badge>
  );
}
