import { Suspense } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { CustomerTable, CustomerModal, TableActions } from "../components";

export default function CustomerPaymentHistoryPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="space-y-4 px-4 lg:px-0">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <TableActions />
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <LuLoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
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
