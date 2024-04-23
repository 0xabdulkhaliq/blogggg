export default function CardSkeleton() {
  return (
    <div className="w-full mx-auto outline-1 outline bg-gray-50 outline-gray-400 md:max-w-96 lg:max-w-md">
      <div className="p-3 text-xs border-b border-b-gray-400">
        <div className="w-14 h-4 bg-gray-800 animate-pulse"></div>
      </div>
      <div className="p-3 py-4">
        <div className="w-full h-8 bg-gray-800 animate-pulse"></div>
        <div className="w-3/5 h-8 bg-gray-800 mt-4 animate-pulse"></div>
      </div>

      <div className="h-36 w-full bg-gray-800 animate-pulse"></div>
      <div className="m-3">
        <div className="w-full h-6 bg-gray-800 animate-pulse"></div>
        <div className="w-full h-6 bg-gray-800 mt-2 animate-pulse"></div>
        <div className="w-2/5 h-6 bg-gray-800 mt-2 animate-pulse"></div>
      </div>

      <div className="bg-gray-800 w-16 h-5 float-right m-3 mt-0 animate-pulse"></div>
    </div>
  );
}
