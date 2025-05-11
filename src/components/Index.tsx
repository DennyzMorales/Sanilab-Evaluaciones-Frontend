import React from 'react'
import { Dashboard } from './Dashboard/Dashboard.tsx'
import { Sidebar } from './Sideboard/Sidebar.tsx'
import { Link, Outlet } from 'react-router-dom';

export const Index = () => {
  return (
        <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">

            <Sidebar/>
            <div className="overflow-auto">
              <Outlet />
            </div>
        </main>
  )
}
