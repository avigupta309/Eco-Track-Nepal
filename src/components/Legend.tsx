export const Legend = () => {
  return (
    <div className="absolute top-40 left-6 bg-white rounded-lg shadow-lg p-4 z-40 hidden md:block">
      <h3 className="font-semibold text-stone-800 mb-3">Map Legend</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-stone-600">Deforestation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <span className="text-stone-600">Landslides</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-stone-600">River Pollution</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span className="text-stone-600">Waste Dumping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span className="text-stone-600">Forest Fires</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-stone-600">Wildlife Threats</span>
        </div>
      </div>
    </div>
  );
};
