import React from 'react'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Sidebar } from './components/Sideboard/Sidebar'

export default function home() {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">
        <Sidebar/>
        <Dashboard/>
    </main>
  )
}
