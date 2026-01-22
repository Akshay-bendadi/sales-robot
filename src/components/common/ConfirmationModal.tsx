import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from "@/components/ui";
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
      <DialogContent className="sm:max-w-[440px] p-10">
        <DialogHeader className="flex flex-col items-center gap-4 space-y-0 text-center">
          <div className="p-3 rounded-full bg-slate-50 mb-2">{styles.icon}</div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 border-none">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 text-slate-500 text-base leading-relaxed text-center">{message}</div>
        <DialogFooter className="gap-3 sm:gap-3 flex-col sm:flex-row mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-[14px] h-12 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            className={cn(styles.button, "flex-1 rounded-[14px] h-12 font-semibold shadow-sm")}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
