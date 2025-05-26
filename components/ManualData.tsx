import Image from 'next/image'

interface ManualFile {
  id: number
  name: string
  type: string
}

interface ManualDataProps {
  manualData: ManualFile[]
}

const ManualData = ({ manualData }: ManualDataProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg sm:text-xl font-medium text-black mb-3 sm:mb-3.5 sm:pl-4">Manual Data</h3>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
        {manualData.map((file) => (
          <div
            key={file.id}
            className="flex items-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 bg-[#E1E2F8] flex items-center justify-center flex-shrink-0">
              <Image
                src="/images/file-icon.svg"
                alt="File"
                width={17}
                height={17}
              />
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 min-w-0">
              <span className="text-sm sm:text-base text-[#101012] truncate sm:whitespace-nowrap">{file.name}</span>
              <span className="text-xs text-[#939393] flex-shrink-0">{file.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManualData