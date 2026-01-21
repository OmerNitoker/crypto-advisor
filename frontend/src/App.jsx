
// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import { AppHeader } from './cmps/AppHeader.jsx';
import { LoginSignup } from './pages/LoginSignup.jsx';
import { Onboarding } from './pages/Onboarding.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { userService } from './services/user.service.js';
// import './assets/style/main.scss'
import { useAuth } from './hooks/useAuth'


export function App() {
  const { user } = useAuth()
  return (
    <div className="app-root">
      <AppHeader user={user} />

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/login" element={
            !user ?
              <LoginSignup /> :
              user.onboardingCompleted ?
                <Navigate to="/" replace /> :
                <Navigate to="/onboarding" replace />
          }
          />

          <Route path="/onboarding" element={
            !user ?
              <Navigate to="/login" replace /> :
              user.onboardingCompleted ?
                <Navigate to="/" replace /> :
                <Onboarding user={user} />
          }
          />

          <Route path="/" element={
            !user ?
              <Navigate to="/login" replace /> :
              !user.onboardingCompleted ?
                <Navigate to="/onboarding" replace /> :
                <Dashboard user={user} />
          }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
