import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Layout } from "@/app/components/layout";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { api } from "@/app/data";
import BuckleAiPage from "@/app/pages/ai";
// import CategoryPage from "@/app/pages/category";
import Dashboard from "@/app/pages/dashboard";
// import Logs from "@/app/pages/logs";
import NotFound from "@/app/pages/not-found";
// import ServiceInspectPage from "@/app/pages/service-inspect";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={api}>
        <TooltipProvider>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "black",
              },
              classNames: {
                title: "font-heading font-light! text-foreground!",
                icon: "text-foreground!",
                toast: "border-border!",
              },
            }}
          />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route element={<Dashboard />} path="/" />
                <Route element={<BuckleAiPage />} path="/ai" />
                {/* <Route element={<Logs />} path="/logs" /> */}
                {/* <Route element={<ServiceInspectPage />} path="/:category/:serviceId" /> */}
                {/* <Route element={<CategoryPage />} path="/:category" /> */}
                <Route element={<NotFound />} path="*" />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
