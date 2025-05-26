'use client'

import { useState } from 'react'
import CustomerDetails from './CustomerDetails'
import PurchaseHistory from './PurchaseHistory'
import ManualData from './ManualData'
import ChatInterface from './ChatInterface'

interface CustomerServiceDashboardProps {
  onNavigateToDashboard?: () => void
}

const CustomerServiceDashboard = ({ onNavigateToDashboard }: CustomerServiceDashboardProps) => {
  const [selectedOption, setSelectedOption] = useState('Lorem ipsum dolor')
  const [message, setMessage] = useState('')
  
  // Dropdown options
  const dropdownOptions = [
    'Lorem ipsum dolor',
    'Product inquiries',
    'Order status',
    'Return & refund',
    'Technical support',
    'General questions'
  ]

  const customerData = {
    name: 'Dwight Schrute',
    id: '3637',
    isMember: true,
    avatar: '/images/profile-image.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum'
  }

  const purchaseHistory = [
    {
      id: 1,
      title: 'Product title/name Lorem ipsum dolor sit amet sit',
      description: 'Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
      status: 'Return Request',
      statusColor: '#F3EEBC'
    },
    {
      id: 2,
      title: 'Product title/name Lorem ipsum dolor sit amet sit',
      description: 'Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
      status: 'Returned',
      statusColor: '#F7C5C5'
    },
    {
      id: 3,
      title: 'Product title/name Lorem ipsum dolor sit amet sit',
      description: 'Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
      status: 'Delivered',
      statusColor: '#B0E9AF'
    },
    {
      id: 4,
      title: 'Product title/name Lorem ipsum dolor sit amet sit',
      description: 'Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
      status: 'In Transit',
      statusColor: '#CAEAFC'
    },
    {
      id: 5,
      title: 'Product title/name Lorem ipsum dolor sit amet sit',
      description: 'Product description - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
      status: 'Canceled',
      statusColor: '#B8B8B8'
    }
  ]

  const manualData = [
    { id: 1, name: 'Order history', type: 'PDF' },
    { id: 2, name: 'Return and exchange Policies', type: 'PDF' },
    { id: 3, name: 'Research_paper.pdf', type: 'PDF' }
  ]

  const suggestedQuestions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'sed do Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet.'
  ]

  return (
    <div className="relative">
      {/* Back to Dashboard Button */}
      {onNavigateToDashboard && (
        <button
          onClick={onNavigateToDashboard}
          className="absolute -top-12 left-0 px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
      )}
      
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-auto lg:h-screen overflow-hidden">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      {/* Left Panel - Chat Interface */}
      <div className="w-full lg:w-1/2 bg-white rounded-[20px] lg:rounded-[40px] p-4 lg:p-5 min-h-[400px] lg:min-h-0 lg:h-full overflow-y-auto lg:order-1">
        <ChatInterface
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          message={message}
          setMessage={setMessage}
          suggestedQuestions={suggestedQuestions}
          dropdownOptions={dropdownOptions}
        />
      </div>

      {/* Right Panel - Customer Info */}
      <div className="w-full lg:w-1/2 bg-white rounded-[20px] lg:rounded-[40px] p-4 sm:p-6 lg:p-[30px] space-y-4 lg:space-y-[30px] overflow-y-auto lg:order-2">
        <CustomerDetails customerData={customerData} />
        <ManualData manualData={manualData} />
        <PurchaseHistory purchaseHistory={purchaseHistory} />
      </div>
    </div>
    </div>
  )
}

export default CustomerServiceDashboard