interface PurchaseItem {
  id: number
  title: string
  description: string
  status: string
  statusColor: string
}

interface PurchaseHistoryProps {
  purchaseHistory: PurchaseItem[]
}

const PurchaseHistory = ({ purchaseHistory }: PurchaseHistoryProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg sm:text-xl font-medium text-black mb-3 sm:mb-4">Purchase History</h3>
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="space-y-3 sm:space-y-5 min-w-[300px]">
          {purchaseHistory.map((product) => (
            <div key={product.id} className="bg-gray-100 rounded-[15px] sm:rounded-[20px] p-4 sm:p-6 flex gap-3 sm:gap-8 items-start">
              <div className="w-16 h-16 sm:w-24 md:w-[142px] sm:h-24 md:h-[142px] bg-gray-300 rounded-[8px] sm:rounded-[10px] flex-shrink-0" />
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base uppercase text-black mb-1 sm:mb-2 leading-normal sm:leading-[22.4px] line-clamp-2">
                  {product.title}
                </h4>
                <p className="text-xs sm:text-base text-black leading-relaxed sm:leading-6 line-clamp-3 sm:line-clamp-none">
                  {product.description}
                </p>
              </div>
              
              <div
                className="text-xs sm:text-base px-2 sm:px-3.5 py-0.5 sm:py-0.5 rounded-[8px] sm:rounded-[10px] flex-shrink-0 whitespace-nowrap"
                style={{ backgroundColor: product.statusColor }}
              >
                {product.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory