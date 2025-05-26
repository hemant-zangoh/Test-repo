'use client'

import { useState } from 'react'
import CustomerServiceDashboard from '@/components/CustomerServiceDashboard'
import Dashboard from '@/components/Dashboard'

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'customer-service'>('dashboard')

  return (
    <main className="min-h-screen lg:h-screen bg-gray-200 p-4 sm:p-6 lg:p-10">
      {currentView === 'dashboard' ? (
        <Dashboard onNavigateToCustomerService={() => setCurrentView('customer-service')} />
      ) : (
        <CustomerServiceDashboard onNavigateToDashboard={() => setCurrentView('dashboard')} />
      )}
    </main>
  )
}