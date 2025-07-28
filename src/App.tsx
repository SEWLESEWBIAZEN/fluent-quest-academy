import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/user/Register";
import Courses from "./pages/course/Courses";
import CourseDetail from "./pages/course/CourseDetail";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/admin/AdminPanel";
import NotFound from "./pages/NotFound";
import CompleteRegistration from "./pages/user/CompleteRegistration";
import UserProfilePage from "./pages/user/UserProfilePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import AddLessonPage from "./pages/lesson/AddLessonPage";

// Add trustedTypes to the Window interface for TypeScript
declare global {
  interface Window {
    trustedTypes?: {
      createPolicy: (
        name: string,
        rules: {
          createHTML?: (input: string) => string;
          createScript?: (input: string) => string;
          createScriptURL?: (input: string) => string;
        }
      ) => void;
    };
  }
}

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <AuthProvider>
        <CourseProvider>
          <Toaster />
          <Sonner position="bottom-right" richColors className="" closeButton/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/complete" element={<CompleteRegistration />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/lesson/add" element={<AddLessonPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/courses" element={<AdminPanel />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CourseProvider>
      </AuthProvider>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)
};

export default App;

