'use client'

import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface Message {
  id: string
  type: 'user' | 'bot' | 'generating'
  content: string
  timestamp: Date
  feedback?: 'good' | 'bad'
}

interface ChatInterfaceProps {
  selectedOption: string
  setSelectedOption: Dispatch<SetStateAction<string>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  suggestedQuestions: string[]
  dropdownOptions: string[]
}

const ChatInterface = ({
  selectedOption,
  setSelectedOption,
  message,
  setMessage,
  suggestedQuestions,
  dropdownOptions,
}: ChatInterfaceProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: message,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, userMessage])
      setMessage('')

      // Add bot "generating" message
      const generatingMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'generating',
        content: 'Generating...',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, generatingMessage])

      // Simulate bot response after 2 seconds
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
          timestamp: new Date()
        }
        setMessages(prev => prev.map(msg => 
          msg.id === generatingMessage.id ? botMessage : msg
        ))
        // Show feedback after bot responds
        setShowFeedback(true)
      }, 2000)
    }
  }

  // Handle enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle feedback
  const handleFeedback = (type: 'good' | 'bad') => {
    // Update the last bot message with feedback
    setMessages(prev => {
      const lastBotMessageIndex = prev.findLastIndex(msg => msg.type === 'bot')
      if (lastBotMessageIndex !== -1) {
        const updated = [...prev]
        updated[lastBotMessageIndex] = {
          ...updated[lastBotMessageIndex],
          feedback: type
        }
        return updated
      }
      return prev
    })
    setShowFeedback(false)
  }
  return (
    <div className="h-full flex flex-col">
      {/* Dropdown Selector */}
      <div ref={dropdownRef} className="relative mb-4 sm:mb-6 min-w-[300px] w-fit">
        <div 
          className="bg-light-blue rounded-[15px] sm:rounded-[20px] px-4 sm:px-[22px] py-2.5 sm:py-[11.5px] flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-base sm:text-lg text-black truncate pr-2">{selectedOption}</span>
          <Image
            src="/images/chevron-down.svg"
            alt="Dropdown"
            width={12}
            height={12}
            className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[15px] sm:rounded-[20px] shadow-lg border border-gray-200 z-10 overflow-hidden">
            {dropdownOptions.map((option, index) => (
              <div
                key={index}
                className={`px-4 sm:px-[22px] py-2.5 sm:py-3 hover:bg-light-blue cursor-pointer transition-colors text-base sm:text-lg ${
                  option === selectedOption ? 'bg-light-blue' : ''
                }`}
                onClick={() => {
                  setSelectedOption(option)
                  setIsDropdownOpen(false)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 px-2 sm:px-4">
        {messages.length === 0 ? (
          // Show suggested questions when no messages
          <div className="mt-8">
            <p className="text-lg sm:text-xl text-primary-blue mb-3 sm:mb-3.5">Ask anything like..</p>
            <div className="space-y-2 sm:space-y-3">
              {suggestedQuestions.map((question, index) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded-[30px] sm:rounded-[40px] px-4 sm:px-6 py-2.5 sm:py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setMessage(question)
                    // Use setTimeout to ensure state update completes before sending
                    setTimeout(() => {
                      const userMessage: Message = {
                        id: Date.now().toString(),
                        type: 'user',
                        content: question,
                        timestamp: new Date()
                      }
                      
                      setMessages(prev => [...prev, userMessage])
                      setMessage('')

                      // Add bot "generating" message
                      const generatingMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        type: 'generating',
                        content: 'Generating...',
                        timestamp: new Date()
                      }
                      setMessages(prev => [...prev, generatingMessage])

                      // Simulate bot response after 2 seconds
                      setTimeout(() => {
                        const botMessage: Message = {
                          id: (Date.now() + 2).toString(),
                          type: 'bot',
                          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do Lorem',
                          timestamp: new Date()
                        }
                        setMessages(prev => prev.map(msg => 
                          msg.id === generatingMessage.id ? botMessage : msg
                        ))
                        // Show feedback after bot responds
                        setShowFeedback(true)
                      }, 2000)
                    }, 0)
                  }}
                >
                  <span className="text-base sm:text-xl text-black line-clamp-2">{question}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show conversation
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {msg.type === 'user' ? (
                  // User message with avatar on right
                  <div className="flex items-start gap-3 sm:gap-4 max-w-[80%]">
                    {/* Message Content */}
                    <div className="rounded-[20px] px-4 sm:px-5 py-3 sm:py-4 bg-gray-100 flex gap-4">
                    <div className="relative w-[30px] h-[30px] rounded-[20px] overflow-hidden flex-shrink-0">
                      <Image
                        src="/images/profile-image.png"
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                      <p className="text-base sm:text-xl leading-relaxed text-black">
                        {msg.content}
                      </p>
                    </div>
                    
                    {/* User Avatar */}
                    
                  </div>
                ) : (
                  // Bot message with avatar on left
                  <div className="flex items-start gap-3 sm:gap-4 max-w-[80%]">
                    {/* Bot Avatar */}
                    <div className={`w-[30px] h-[30px] rounded-[20px] flex-shrink-0 flex items-center justify-center ${
                      msg.type === 'generating' ? 'bg-[#D5F2FF]' : 'bg-[#EEF0FF]'
                    }`}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path
                          d="M7.5 0L9.18386 5.31614L14.5 7L9.18386 8.68386L7.5 14L5.81614 8.68386L0.5 7L5.81614 5.31614L7.5 0Z"
                          fill="#3840EB"
                        />
                      </svg>
                    </div>
                    
                    {/* Message Content */}
                    <div className="rounded-[20px] px-4 sm:px-5 py-3 sm:py-4 bg-white">
                      <p className={`text-base sm:text-xl leading-relaxed ${
                        msg.type === 'generating' ? 'text-primary-blue' : 'text-black'
                      }`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Feedback Section */}
            {showFeedback && messages.length > 0 && messages[messages.length - 1].type === 'bot' && (
              <div className="flex justify-center mt-6 mb-4">
                <div className="border-t border-gray-400 w-full max-w-[80%]">
                  <div className="flex gap-4 justify-center pt-4">
                    <button
                      onClick={() => handleFeedback('good')}
                      className="flex items-center gap-2.5 bg-[#F9FAFF] hover:bg-gray-100 rounded-[40px] px-6 py-3.5 transition-colors"
                    >
                      <span className="text-lg text-[#5C5C5C]">Good</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M6.25 9.375V18.125M2.5 10.625V16.875C2.5 17.2065 2.6317 17.5245 2.86612 17.7589C3.10054 17.9933 3.41848 18.125 3.75 18.125H8.35938C8.60729 18.125 8.85091 18.0606 9.06771 17.9378C9.2845 17.815 9.46739 17.6379 9.59938 17.4231L13.4894 10.9456C13.5787 10.8003 13.6414 10.6402 13.6746 10.4727C13.7078 10.3052 13.711 10.1332 13.6841 9.96452C13.6572 9.79581 13.6005 9.63337 13.5169 9.48512C13.4334 9.33688 13.3244 9.2053 13.195 9.09688L11.4863 7.69625C11.2906 7.53276 11.0503 7.43257 10.7961 7.40844C10.5419 7.38432 10.2851 7.43754 10.0575 7.56188L9.375 7.9025V3.125C9.375 2.79348 9.2433 2.47554 9.00888 2.24112C8.77446 2.0067 8.45652 1.875 8.125 1.875C7.79348 1.875 7.47554 2.0067 7.24112 2.24112C7.0067 2.47554 6.875 2.79348 6.875 3.125V9.375M2.5 10.625C2.5 10.2935 2.6317 9.97554 2.86612 9.74112C3.10054 9.5067 3.41848 9.375 3.75 9.375H6.25C6.58152 9.375 6.89946 9.5067 7.13388 9.74112C7.3683 9.97554 7.5 10.2935 7.5 10.625V16.875C7.5 17.2065 7.3683 17.5245 7.13388 17.7589C6.89946 17.9933 6.58152 18.125 6.25 18.125H3.75C3.41848 18.125 3.10054 17.9933 2.86612 17.7589C2.6317 17.5245 2.5 17.2065 2.5 16.875V10.625Z"
                          stroke="#5C5C5C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    
                    <button
                      onClick={() => handleFeedback('bad')}
                      className="flex items-center gap-2.5 bg-[#F9FAFF] hover:bg-gray-100 rounded-[40px] px-6 py-3.5 transition-colors"
                    >
                      <span className="text-lg text-[#5C5C5C]">Bad</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M6.25 10.625V1.875M2.5 9.375V3.125C2.5 2.79348 2.6317 2.47554 2.86612 2.24112C3.10054 2.0067 3.41848 1.875 3.75 1.875H8.35938C8.60729 1.875 8.85091 1.93943 9.06771 2.06224C9.2845 2.18504 9.46739 2.36212 9.59938 2.57687L13.4894 9.05437C13.5787 9.19967 13.6414 9.35982 13.6746 9.52732C13.7078 9.69483 13.711 9.86682 13.6841 10.0355C13.6572 10.2042 13.6005 10.3666 13.5169 10.5149C13.4334 10.6631 13.3244 10.7947 13.195 10.9031L11.4863 12.3038C11.2906 12.4672 11.0503 12.5674 10.7961 12.5916C10.5419 12.6157 10.2851 12.5625 10.0575 12.4381L9.375 12.0975V16.875C9.375 17.2065 9.2433 17.5245 9.00888 17.7589C8.77446 17.9933 8.45652 18.125 8.125 18.125C7.79348 18.125 7.47554 17.9933 7.24112 17.7589C7.0067 17.5245 6.875 17.2065 6.875 16.875V10.625M2.5 9.375C2.5 9.70652 2.6317 10.0245 2.86612 10.2589C3.10054 10.4933 3.41848 10.625 3.75 10.625H6.25C6.58152 10.625 6.89946 10.4933 7.13388 10.2589C7.3683 10.0245 7.5 9.70652 7.5 9.375V3.125C7.5 2.79348 7.3683 2.47554 7.13388 2.24112C6.89946 2.0067 6.58152 1.875 6.25 1.875H3.75C3.41848 1.875 3.10054 2.0067 2.86612 2.24112C2.6317 2.47554 2.5 2.79348 2.5 3.125V9.375Z"
                          stroke="#5C5C5C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="mt-auto">
        <div className="relative bg-white border border-gray-300 rounded-[15px_15px_25px_25px] sm:rounded-[20px_20px_36px_36px] px-4 sm:px-5 py-4 sm:py-5">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-[40px] sm:h-[60px] text-sm sm:text-base text-black placeholder-gray-600 outline-none pr-14 sm:pr-20"
          />
          <button 
            onClick={handleSendMessage}
            className="absolute right-3 sm:right-5 top-3 sm:top-5 w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] bg-white rounded-[15px] sm:rounded-[18px] flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Image
              src="/images/send-icon.svg"
              alt="Send"
              width={22}
              height={22}
              className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px]"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface