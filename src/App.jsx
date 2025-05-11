import React from 'react'
import { Dashboard } from './components/Dashboard/Dashboard.tsx'
import { Routes,Route} from "react-router";
import CalendarPage from './components/Sideboard/Self-Assestments/CalendarPage.tsx';
import { NotFound } from './components/NotFound.tsx';
import {Layout } from './pages/layout.tsx'
import { AuthLayout } from './pages/AuthLayout.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import RegisterPage from './pages/auth/RegisterPage.tsx';
import { Navigate } from 'react-router-dom';

export default function Home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[1300px_1fr]">
        <div className="dashboard-layout">
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>


       </div>
    </main>
  )
}
