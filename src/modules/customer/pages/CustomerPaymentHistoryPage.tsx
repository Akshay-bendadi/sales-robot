import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { CustomerTable } from "../components/CustomerTable";
import { CustomerModal } from "../components/CustomerModal";
import { TableActions } from "@/components/common/TableActions";

export default function CustomerPaymentHistoryPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <TableActions />
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              }
            >
              <CustomerTable />
            </Suspense>
          </div>
        </div>
      </main>

      <CustomerModal />
    </div>
  );
}
