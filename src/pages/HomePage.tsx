import { Plus } from "lucide-react";
import { Legend } from "../components/Legend";

import "leaflet/dist/leaflet.css";
import React from "react";
import { MapComponent } from "../components/MapComponent";

export const HomePage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 relative">
        <MapComponent />

        <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 z-40 flex items-center space-x-2">
          <Plus className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Report Issue</span>
        </button>
        <Legend />
      </div>
    </div>
  );
};
