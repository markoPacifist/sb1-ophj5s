import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DocumentsPage from './pages/DocumentsPage';
import ConsultationPage from './pages/ConsultationPage';
import ClientPanel from './pages/ClientPanel';
import ManagerPanel from './pages/ManagerPanel';
import ManagerClientProfile from './pages/ManagerClientProfile';
import JobQuiz from './components/JobQuiz';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/quiz" element={<JobQuiz />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/client" element={<ClientPanel />} />
        <Route path="/manager" element={<ManagerPanel />} />
        <Route path="/manager/client/:id" element={<ManagerClientProfile />} />
      </Routes>
    </div>
  );
}

export default App;