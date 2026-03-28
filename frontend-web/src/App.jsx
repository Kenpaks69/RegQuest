import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import HomePage from './pages/HomePage';
import RequestDocument from './pages/RequestDocument';
import TrackStatus from './pages/TrackStatus';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user } = useAuth();
  
  // Safe default mockup fallback structure to preserve original non-API components
  const currentUser = user || {
    name: "User",
    role: "Student",
    studentId: "0000-0000",
    notifications: 5
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/home" element={<HomePage currentUser={currentUser} />} />
        <Route path="/request-document" element={<RequestDocument currentUser={currentUser} />} />
        <Route path="/track-status" element={<TrackStatus currentUser={currentUser} />} />
        <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;