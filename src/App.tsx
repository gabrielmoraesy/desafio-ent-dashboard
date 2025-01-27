import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { AppSidebar } from "./components/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { ReviewsProvider } from "./contexts/ReviewsProvider/reviews-provider";
import { ThemeProvider } from './contexts/ThemeProvider/theme-provider';
import { About } from './pages/About';
import { DashboardFinances } from "./pages/DashboardFinances";
import { DashboardReviews } from "./pages/DashboardReviews/DashboardReviews";
import { Home } from "./pages/Home";

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ReviewsProvider>
          <SidebarProvider>
            <AppSidebar />

            <div className="mx-auto max-w-[1500px]">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard-reviews" element={<DashboardReviews />} />
                  <Route path="/dashboard-finances" element={<DashboardFinances />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </BrowserRouter>
            </div>
          </SidebarProvider>
        </ReviewsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

