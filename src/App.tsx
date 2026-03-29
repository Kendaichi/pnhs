import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import StudentsPage from "@/pages/StudentsPage";
import SectionsPage from "@/pages/SectionsPage";
import StaffPage from "@/pages/StaffPage";
import SubjectsPage from "@/pages/SubjectsPage";
import GradeEncodingPage from "@/pages/GradeEncodingPage";
import AttendancePage from "@/pages/AttendancePage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import MyClassesPage from "@/pages/MyClassesPage";
import ParentGradesPage from "@/pages/ParentGradesPage";
import ParentAttendancePage from "@/pages/ParentAttendancePage";
import ParentSchedulePage from "@/pages/ParentSchedulePage";
import EnrollmentPage from "@/pages/EnrollmentPage";
import ReportsPage from "@/pages/ReportsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/sections" element={<SectionsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/grades" element={<GradeEncodingPage />} />
        <Route path="/grade-encoding" element={<GradeEncodingPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/my-classes" element={<MyClassesPage />} />
        <Route path="/my-grades" element={<ParentGradesPage />} />
        <Route path="/my-attendance" element={<ParentAttendancePage />} />
        <Route path="/my-schedule" element={<ParentSchedulePage />} />
        <Route path="/enrollment" element={<EnrollmentPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
