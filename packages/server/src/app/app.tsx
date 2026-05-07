import { TooltipProvider } from "@app/components/ui/tooltip";
import Analytics from "@app/pages/Analytics";
import Dashboard from "@app/pages/Dashboard";
import Inspector from "@app/pages/Inspector";
import Logs from "@app/pages/Logs";
import Services from "@app/pages/Services";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardLayout } from "@/app/components/dashboard-layout";
import NotFound from "@/app/pages/not-found";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route element={<Dashboard />} path="/" />
              <Route element={<Services />} path="/services" />
              <Route element={<Logs />} path="/logs" />
              <Route element={<Analytics />} path="/analytics" />
              <Route element={<Inspector />} path="/inspector" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
