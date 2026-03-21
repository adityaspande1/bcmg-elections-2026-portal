import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CandidatePortal from "./pages/CandidatePortal";
import "./styles/portal.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:ballotNo" element={<CandidatePortal />} />
        <Route path="/" element={<Navigate to="/100" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
