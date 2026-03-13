import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import AnalyticsDashboardPage from "./pages/AnalyticsDashboardPage";
import CoursePlayerPage from "./pages/CoursePlayerPage";
import CoursesPage from "./pages/CoursesPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LearningRoadmapPage from "./pages/LearningRoadmapPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectSuggestionsPage from "./pages/ProjectSuggestionsPage";
import RegisterPage from "./pages/RegisterPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";


function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/app/dashboard" : "/login"} replace />;
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/start" element={<AuthRedirect />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="roadmap" element={<LearningRoadmapPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:courseId" element={<CoursePlayerPage />} />
        <Route path="resume" element={<ResumeAnalyzerPage />} />
        <Route path="projects" element={<ProjectSuggestionsPage />} />
        <Route path="analytics" element={<AnalyticsDashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

