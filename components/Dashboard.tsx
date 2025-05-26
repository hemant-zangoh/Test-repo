'use client'

import { useState } from 'react'
import Image from 'next/image'

interface DashboardProps {
  onNavigateToCustomerService?: () => void
}

const Dashboard = ({ onNavigateToCustomerService }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedFilter, setSelectedFilter] = useState('Filter')
  const [selectedDate, setSelectedDate] = useState('Today')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-[#F2F2F2] w-full max-w-[1920px] mx-auto relative overflow-x-auto">
      {/* Header */}
      <div className="bg-[#F6F7FF] h-[60px] flex items-center justify-between px-[21px] absolute top-0 left-0 right-0">
        <div className="flex items-center gap-1.5">
          <div className="w-10 h-10 bg-[#C7C7C7] rounded-md" />
          <span className="text-base font-medium tracking-wider">abc company</span>
        </div>
        <div className="flex gap-2.5">
          <div className="w-10 h-10 bg-[#C7C7C7] rounded-md" />
          <div className="w-10 h-10 bg-[#C7C7C7] rounded-md" />
          <div className="w-10 h-10 bg-[#C7C7C7] rounded-md" />
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white flex items-center justify-between px-[120px] py-4 absolute top-[60px] left-0 right-0">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-8 py-2.5 rounded-[20px] text-lg font-medium tracking-wider transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#435BDB] text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-8 py-2.5 rounded-[20px] text-lg font-medium tracking-wider transition-colors ${
              activeTab === 'history' ? 'bg-[#435BDB] text-white' : 'text-black hover:bg-gray-100'
            }`}
          >
            History
          </button>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2.5 px-[32px] py-2.5 rounded-[20px] text-lg font-medium tracking-wider hover:bg-gray-100"
            >
              {selectedFilter}
              <Image src="/images/chevron-down.svg" alt="Dropdown" width={12} height={6} />
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2.5 px-[32px] py-2.5 border border-[#E1E1E1] rounded-[20px] text-lg font-medium tracking-wider text-[#435BDB] hover:bg-gray-50"
            >
              {selectedDate}
              <Image src="/images/chevron-down.svg" alt="Dropdown" width={12} height={6} className="filter brightness-0 invert-[.27] sepia-[.94] saturate-[5000%] hue-rotate-[226deg]" />
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="absolute top-[160px] left-0 right-0 bottom-0">
        {/* Tickets Card */}
        <div 
          className="absolute top-0 left-[34px] w-[376px] h-[398px] bg-white rounded-[20px] p-10 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={onNavigateToCustomerService}
        >
          <h3 className="text-2xl font-medium tracking-wider">Tickets</h3>
          <div className="mt-[72px]">
            <div className="text-[40px] font-medium font-general-sans text-[#435BDB]">6,12,27,291</div>
            <p className="text-xl font-medium tracking-wider text-[#343434] mt-2.5">Total by count</p>
          </div>
          <div className="mt-[30px]">
            <div className="text-[40px] font-medium font-general-sans">291/hr</div>
            <p className="text-xl font-medium tracking-wider text-[#343434] mt-2.5">Total by volume</p>
          </div>
          <div className="border-t border-[#CECECE] mt-[53px]" />
        </div>

        {/* Cost Card */}
        <div className="absolute top-0 left-[430px] w-[376px] h-[398px] bg-white rounded-[20px] p-10">
          <h3 className="text-2xl font-medium tracking-wider">Cost</h3>
          <div className="mt-[72px]">
            <div className="text-[40px] font-medium font-general-sans text-[#435BDB]">$1,21,689</div>
            <p className="text-xl font-medium tracking-wider text-[#343434] mt-2.5">Total Cost</p>
          </div>
          <div className="mt-[30px]">
            <div className="text-[40px] font-medium font-general-sans">$6.43/res</div>
            <p className="text-xl font-medium tracking-wider text-[#343434] mt-2.5">Cost per resolution</p>
          </div>
          <div className="border-t border-[#CECECE] mt-[53px]" />
        </div>

        {/* Cases by channels */}
        <div className="absolute top-[418px] left-[34px] w-[436px] h-[468px] bg-white rounded-[20px] p-10">
          <h3 className="text-2xl font-normal tracking-wider">Cases by channels</h3>
          <div className="mt-8 space-y-4">
            <div className="relative">
              <div className="h-8 bg-[#435BDB] rounded-lg w-[194px]" />
              <span className="absolute left-0 top-1.5 text-base tracking-wider">Website</span>
              <span className="absolute right-2 top-1.5 text-base tracking-wider font-general-sans">38%</span>
            </div>
            <div className="relative">
              <div className="h-8 bg-[#8E9DE9] rounded-lg w-[151px]" />
              <span className="absolute left-0 top-1.5 text-base tracking-wider">email</span>
              <span className="absolute right-2 top-1.5 text-base tracking-wider font-general-sans">28%</span>
            </div>
            <div className="relative">
              <div className="h-8 bg-[#C7CEF4] rounded-lg w-[204px]" />
              <span className="absolute left-0 top-1.5 text-base tracking-wider">Chat</span>
              <span className="absolute right-2 top-1.5 text-base tracking-wider font-general-sans">44%</span>
            </div>
            <div className="relative">
              <div className="h-8 bg-[#D9DEF8] rounded-lg w-[89px]" />
              <span className="absolute left-0 top-1.5 text-base tracking-wider">Call</span>
              <span className="absolute right-2 top-1.5 text-base tracking-wider font-general-sans">11%</span>
            </div>
            <div className="relative">
              <div className="h-8 bg-[#ECEFFB] rounded-lg w-[30px]" />
              <span className="absolute left-0 top-1.5 text-base tracking-wider">Other</span>
              <span className="absolute right-2 top-1.5 text-base tracking-wider font-general-sans">2%</span>
            </div>
          </div>
        </div>

        {/* Most frequent Query type */}
        <div className="absolute top-[418px] left-[490px] w-[593px] h-[468px] bg-white rounded-[20px] p-10">
          <h3 className="text-2xl font-normal tracking-wider mb-10">Most frequent Query type</h3>
          <div className="relative">
            <div className="w-[300px] h-[300px]">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle cx="150" cy="150" r="150" fill="#435BDB" />
                <circle cx="150" cy="150" r="120" fill="#8E9DE9" />
                <circle cx="150" cy="150" r="90" fill="#C7CEF4" />
                <circle cx="150" cy="150" r="60" fill="#D9DEF8" />
                <circle cx="150" cy="150" r="30" fill="#ECEFFB" />
                <circle cx="150" cy="150" r="15" fill="#F7F9FD" />
              </svg>
            </div>
            <div className="absolute right-0 top-[110px] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#435BDB] rounded-full" />
                <span className="text-base tracking-wider">Category 1</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#8E9DE9] rounded-full" />
                <span className="text-base tracking-wider">Category 2</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#C7CEF4] rounded-full" />
                <span className="text-base tracking-wider">Category 3</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#D9DEF8] rounded-full" />
                <span className="text-base tracking-wider">Category 4</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#ECEFFB] rounded-full" />
                <span className="text-base tracking-wider">Category 5</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#F7F9FD] rounded-full" />
                <span className="text-base tracking-wider">Unique</span>
              </div>
            </div>
          </div>
        </div>

        {/* Open Cases */}
        <div className="absolute top-0 left-[826px] w-[340px] h-[177px] bg-white rounded-[20px] p-10">
          <div className="text-[40px] font-medium font-general-sans">6434</div>
          <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2.5">Open Cases</p>
        </div>

        {/* Closed cases */}
        <div className="absolute top-0 left-[1186px] w-[340px] h-[177px] bg-white rounded-[20px] p-10">
          <div className="text-[40px] font-medium font-general-sans">7,291</div>
          <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2.5">Closed cases</p>
        </div>

        {/* Avg time to close */}
        <div className="absolute top-0 left-[1546px] w-[340px] h-[177px] bg-white rounded-[20px] p-10">
          <div className="text-[40px] font-medium font-general-sans">1.2min</div>
          <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2.5">Avg time to close</p>
        </div>

        {/* Escalation & First time resolution */}
        <div className="absolute top-[198px] left-[826px] w-[533px] h-[200px] bg-white rounded-[20px] p-10">
          <div className="flex">
            <div className="flex-1">
              <div className="text-[40px] font-medium font-general-sans">98.82%</div>
              <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2.5">First time resolution</p>
            </div>
            <div className="flex-1 text-right">
              <div className="text-[40px] font-medium font-general-sans">18</div>
              <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2.5">Escalation</p>
            </div>
          </div>
          <div className="absolute top-10 bottom-10 left-1/2 transform -translate-x-1/2 w-px bg-[#CECECE]" />
        </div>

        {/* NPS */}
        <div className="absolute top-[627px] left-[1379px] w-[507px] h-[259px] bg-white rounded-[20px] p-10">
          <h3 className="text-2xl font-medium tracking-wider">NPS</h3>
          <div className="mt-6">
            <div className="flex h-[46px]">
              <div className="bg-[#435BDB] rounded-l-[10px] w-[199px]" />
              <div className="bg-[#C7CEF4] w-[142px]" />
              <div className="bg-[#EBA2A2] rounded-r-[10px] w-[62px]" />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-sm tracking-wider">Promoters</p>
                <p className="text-[30px] font-medium tracking-wider font-general-sans">60%</p>
              </div>
              <div className="text-center">
                <p className="text-sm tracking-wider">Passives</p>
                <p className="text-[30px] font-medium tracking-wider font-general-sans">20%</p>
              </div>
              <div className="text-right">
                <p className="text-sm tracking-wider">Detractor</p>
                <p className="text-[30px] font-medium tracking-wider font-general-sans">10%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Avg CSAT */}
        <div className="absolute top-[198px] left-[1379px] w-[507px] h-[409px] bg-white rounded-[20px] p-10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[40px] font-medium font-general-sans">7.9</div>
            <h3 className="text-2xl font-medium tracking-wider">Avg CSAT</h3>
          </div>
          <div className="border-t border-[#CECECE] mb-8" />
          
          <div className="flex justify-between items-end h-[204px] gap-4">
            <div className="text-center">
              <div className="bg-[#435BDB] rounded-[10px] w-[86px] h-[204px] relative">
                <div className="text-white text-xl font-medium font-general-sans absolute top-4 left-1/2 transform -translate-x-1/2">58%</div>
              </div>
              <p className="text-sm text-[#AFAFAF] mt-2">Oct'24</p>
            </div>
            <div className="text-center">
              <div className="bg-[#435BDB] rounded-[10px] w-[86px] h-[204px] relative">
                <div className="text-white text-xl font-medium font-general-sans absolute top-4 left-1/2 transform -translate-x-1/2">71%</div>
              </div>
              <p className="text-sm text-[#AFAFAF] mt-2">Nov'24</p>
            </div>
            <div className="text-center">
              <div className="bg-[#435BDB] rounded-[10px] w-[86px] h-[204px] relative">
                <div className="text-white text-xl font-medium font-general-sans absolute top-4 left-1/2 transform -translate-x-1/2">75%</div>
              </div>
              <p className="text-sm text-[#AFAFAF] mt-2">Dec'24</p>
            </div>
            <div className="text-center">
              <div className="bg-[#435BDB] rounded-[10px] w-[86px] h-[204px] relative">
                <div className="text-white text-xl font-medium font-general-sans absolute top-4 left-1/2 transform -translate-x-1/2">80%</div>
              </div>
              <p className="text-sm text-black mt-2">Jan'25</p>
            </div>
          </div>
        </div>

        {/* Satisfactory outcome */}
        <div className="absolute top-[418px] left-[1103px] w-[256px] h-[468px] bg-white rounded-[20px] p-10">
          <div className="text-center">
            <Image src="/images/thumbs-up.svg" alt="Good" width={24} height={24} className="mx-auto mb-4 filter-green" />
            <div className="text-[40px] font-medium font-general-sans">6434</div>
            <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2 leading-tight">Satisfactory<br />outcome</p>
          </div>
          <div className="absolute top-[234px] left-7 right-7 h-px bg-[#CECECE]" />
          <div className="text-center absolute bottom-[140px] left-10 right-10">
            <Image src="/images/thumbs-down.svg" alt="Bad" width={24} height={24} className="mx-auto mb-4 filter-red" />
            <div className="text-[40px] font-medium font-general-sans">19</div>
            <p className="text-2xl font-normal tracking-wider text-[#343434] mt-2 leading-tight">Un-satisfactory<br />outcome</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard