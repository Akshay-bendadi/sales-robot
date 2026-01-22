import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConfirmationVariant = "danger" | "success" | "info";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  okText?: string;
  variant?: ConfirmationVariant;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  okText = "Confirm",
  variant = "info",
  isLoading = false,
}: ConfirmationModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          button: "bg-red-600 hover:bg-red-700 text-white",
          icon: <AlertCircle className="h-6 w-6 text-red-600" />,
        };
      case "success":
        return {
          button: "bg-green-600 hover:bg-green-700 text-white",
          icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
        };
      case "info":
      default:
        return {
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          icon: <Info className="h-6 w-6 text-blue-600" />,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isLoading && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0">
          {styles.icon}
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-slate-600 text-sm leading-relaxed">{message}</div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button className={cn(styles.button)} onClick={onConfirm} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
