import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import MethodologyPage from "./pages/MethodologyPage";
import PolicyBriefPage from "./pages/PolicyBriefPage";
import PolicySimulatorPage from "./pages/PolicySimulatorPage";
import PublicTransparencyPage from "./pages/PublicTransparencyPage";
import RegionDetailPage from "./pages/RegionDetailPage";
import CitizenReportsPage from "./pages/CitizenReportsPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="regions/:regionId" element={<RegionDetailPage />} />
        <Route path="reports" element={<CitizenReportsPage />} />
        <Route path="simulator" element={<PolicySimulatorPage />} />
        <Route path="policy-brief" element={<PolicyBriefPage />} />
        <Route path="public" element={<PublicTransparencyPage />} />
        <Route path="methodology" element={<MethodologyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}



