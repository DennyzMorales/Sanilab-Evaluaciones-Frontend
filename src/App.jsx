import React, { useEffect, useState } from 'react'
import { Dashboard } from './components/Dashboard/Dashboard.tsx'
import { Routes,Route} from "react-router";
import CalendarPage from './components/Sideboard/Self-Assestments/CalendarPage.tsx';
import { NotFound } from './components/NotFound.tsx';
import {Layout } from './pages/Layout.tsx'
import { AuthLayout } from './pages/AuthLayout.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import RegisterPage from './pages/auth/RegisterPage.tsx';
import { Navigate } from 'react-router-dom';
import AdminRegister from './pages/admin/AdminRegister.tsx';
import AdminLogin from './pages/admin/AdminLogin.tsx';
import Assestments from '../src/components/Sideboard/Self-Assestments/Assestments.tsx'

export default function Home() {
  function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("/api/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);

    return { user, loading };
  }
  function ProtectedRoute({ children, roles }) {
    const { user, loading } = useUser();
    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/auth/login" />;
    if (roles && !roles.includes(user.rol)) return <Navigate to="/unauthorized" />;
    return children;
  }

  return (
    <main className="grid gap-4 p-4 grid-cols-[1300px_1fr]">
        <div className="dashboard-layout">
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="assestment" element={<Assestments />} />
              <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AuthLayout />}>
            <Route index element={<Navigate to="/admin/login" />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="register" element={<AdminRegister />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>


       </div>
    </main>
  )
}
