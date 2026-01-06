import { useState } from "react";
import { ISSUE_CATEGORIES, Provinces } from "../mockData";

export const FilterComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<String[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<String[]>([]);

  function addCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c != category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  }

  function addProvinces(province: String) {
    if (selectedProvince.includes(province)) {
      setSelectedProvince((prev) => prev.filter((p) => p !== province));
    } else {
      setSelectedProvince((prev) => [...prev, province]);
    }
  }


  function clearAllFilter(){
    setSelectedCategories([])
    setSelectedProvince([])
  }

  return (
    <>
      <div className="bg-stone-50 border-t border-stone-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-stone-800">Filter Reports</h3>
            <button
              onClick={clearAllFilter} 
              className={`text-sm text-green-600 hover:text-green-700 font-medium
             `}
            >
              Clear All
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-2">
                Issue Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {ISSUE_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => addCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors 
                       ${
                         selectedCategories.includes(category)
                           ? "bg-green-600 text-white"
                           : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-300"
                       }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-stone-700 mb-2">
                Provinces
              </h4>
              <div className="flex flex-wrap gap-2">
                {Provinces.map((province) => (
                  <button
                    key={province}
                    onClick={() => addProvinces(province)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedProvince.includes(province)
                        ? "bg-green-600 text-white"
                        : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-300"
                    }`}
                  >
                    {province}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
