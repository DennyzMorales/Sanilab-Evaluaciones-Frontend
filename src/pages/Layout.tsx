import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sideboard/Sidebar'

export const Layout = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">

    <Sidebar/>
    <div className="overflow-auto">
      <Outlet />
    </div>
    </main>
  )
}
