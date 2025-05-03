export default function LoadingSpinner() {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex flex-col items-center bg-black bg-opacity-70 p-8 rounded-lg">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg">Loading frames...</p>
          <p className="text-gray-300 text-sm mt-2">
            Looking for images in: <code className="bg-gray-800 px-2 py-1 rounded">/assets/animation/</code>
          </p>
        </div>
      </div>
    )
  }
  