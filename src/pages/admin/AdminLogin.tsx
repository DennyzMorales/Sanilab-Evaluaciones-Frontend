import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginAdminPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await response.text(); // evita error si no hay cuerpo
    const data = text ? JSON.parse(text) : {};

    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // o '/dashboard-admin' si tienes esa ruta
    } else {
      setError(data.message || 'Credenciales incorrectas o error en el servidor.');
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    setError('Error inesperado al iniciar sesión.');
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Iniciar Sesión (Admin)</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
