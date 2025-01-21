import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { AppSidebar } from "./components/Sidebar/Sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from './contexts/ThemeProvider/theme-provider';
import { About } from './pages/About';
import { DashboardFinances } from "./pages/DashboardFinances";
import { DashboardReviews } from "./pages/DashboardReviews/DashboardReviews";
import { Home } from "./pages/Home";
import { ReviewProvider } from "./contexts/ReviewProvider/review-provider";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReviewProvider>
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
      </ReviewProvider>
    </ThemeProvider>
  );
}

