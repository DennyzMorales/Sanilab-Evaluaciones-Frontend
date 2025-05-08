import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Aquí podrías agregar un logo o branding común */}
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <Outlet />
      </div>
    </div>
    
  );
};
