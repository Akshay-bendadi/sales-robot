import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";

const CustomerPaymentHistoryPage = lazy(
  () => import("@/modules/customer/pages/CustomerPaymentHistoryPage")
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-75 flex justify-center">
          <div className="w-full max-w-[1020px] mx-auto my-auto overflow-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense
                    fallback={
                      <div className="flex h-screen items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      </div>
                    }
                  >
                    <CustomerPaymentHistoryPage />
                  </Suspense>
                }
              />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}

export default App;
