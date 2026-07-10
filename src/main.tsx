import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import App from "./App.tsx";
import { ScrollProgress } from "./components/ScrollProgress.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import "./index.css";

const Admin = lazy(() => import("./pages/Admin.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const IndustryPage = lazy(() => import("./pages/IndustryPage.tsx"));
const NetworkPage = lazy(() => import("./pages/NetworkPage.tsx"));
const Welcome = lazy(() => import("./pages/Welcome.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <ScrollProgress />
            <Suspense fallback={<div className="min-h-screen bg-background" role="status" aria-label="Loading page" />}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/industry/:slug" element={<IndustryPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  </StrictMode>
);
