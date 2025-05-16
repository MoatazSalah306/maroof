
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import DonateFood from "./pages/DonateFood";
import Education from "./pages/Education";
import EducationResource from "./pages/EducationResource";
import Profile from "./pages/Profile";
import Impact from "./pages/Impact";
import About from "./pages/About";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="donate" element={
              <RequireAuth>
                <DonateFood />
              </RequireAuth>
            } />
            <Route path="learn" element={<Education />} />
            <Route path="learn/:resourceId" element={<EducationResource />} />
            <Route path="profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />
            <Route path="impact" element={<Impact />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
