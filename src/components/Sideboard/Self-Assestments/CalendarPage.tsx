// CalendarPage.jsx
import React from 'react'
import { FiChevronLeft, FiChevronRight, FiPlus, FiCalendar, FiList, FiClock } from 'react-icons/fi'
import Assestments from '../Self-Assestments/Assestments.tsx'

export default function CalendarPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-200 transition">
              <FiChevronLeft size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 transition">
              <FiChevronRight size={20} />
            </button>
            <button className="ml-4 inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <FiPlus /> Add Event
            </button>
          </div>
          <h1 className="text-2xl font-semibold">April 2025</h1>
          <div className="space-x-2">
            <button className="px-4 py-2 rounded hover:bg-gray-200 transition">month</button>
            <button className="px-4 py-2 rounded hover:bg-gray-200 transition">week</button>
            <button className="px-4 py-2 rounded hover:bg-gray-200 transition">day</button>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 auto-rows-[100px] gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="border rounded bg-white flex flex-col p-2 text-sm text-gray-700"
            >
              <span className="font-semibold">{i + 1 <= 30 ? i + 1 : ''}</span>
              
              {/* aquí irían eventos dentro */}
            </div>
          ))}
        </div>
      </main>
    </div>
)
}
