
// import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';


import { AppHeader } from './cmps/AppHeader.jsx';
import { LoginSignup } from './pages/LoginSignup.jsx';
import { Onboarding } from './pages/Onboarding.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { userService } from './services/user.service.js';
import './assets/style/main.scss'
import { useAuth } from './hooks/useAuth'
import { useEffect, useState } from 'react';


export function App() {
  const location = useLocation()
  const { user } = useAuth()

  const [isOnLoginPage, setIsOnLoginPage] = useState(false)

  useEffect(() => {
    if (location.pathname.includes('/login')) setIsOnLoginPage(true)
    else setIsOnLoginPage(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      {!isOnLoginPage && <AppHeader user={user} />}

      <main className="app-main" >
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
