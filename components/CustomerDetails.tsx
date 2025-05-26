import Image from 'next/image'

interface CustomerData {
  name: string
  id: string
  isMember: boolean
  avatar: string
  description: string
}

interface CustomerDetailsProps {
  customerData: CustomerData
}

const CustomerDetails = ({ customerData }: CustomerDetailsProps) => {
  return (
    <div className="bg-light-purple rounded-[15px] sm:rounded-[20px] p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-normal text-gray-600 mb-4 sm:mb-6">Customer details</h3>
      
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4 sm:mb-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[30px] overflow-hidden bg-gray-300 flex-shrink-0">
          <Image
            src={customerData.avatar}
            alt={customerData.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-lg sm:text-xl font-normal">{customerData.name}</h4>
              <p className="text-lg sm:text-xl font-bold">ID - {customerData.id}</p>
            </div>
            
            {customerData.isMember && (
              <div className="flex items-center gap-2 sm:gap-2.5 text-primary-blue px-2.5 sm:px-3 py-1 rounded-[8px] sm:rounded-[10px] w-fit">
                <Image
                  src="/images/star-icon.svg"
                  alt="Member"
                  width={16}
                  height={16}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-sm sm:text-base">Member</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
        {customerData.description}
      </p>
    </div>
  )
}

export default CustomerDetails