import { Leaf, Menu, X ,Filter} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterComponent } from "./FilterComponent";

// interface NavbarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
//   onFilterChange?: (filters: {
//     categories: IssueCategory[];
//     provinces: Province[];
//   }) => void;
//   showFilters?: boolean;
// }

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedCategories=["A","b"];
  const selectedProvinces = ["A", "b"];




  // const [selectedProvinces, setSelectedProvinces] = useState<Province[]>([]);
  const navigate = useNavigate();

  // const categories: IssueCategory[] = [
  //   "Deforestation",
  //   "Landslides",
  //   "River Pollution",
  //   "Waste Dumping",
  //   "Forest Fires",
  //   "Wildlife Threats",
  //   "Other",
  // ];
  // const provinces: Province[] = [
  //   "Koshi",
  //   "Madhesh",
  //   "Bagmati",
  //   "Gandaki",
  //   "Lumbini",
  //   "Karnali",
  //   "Sudurpashchim",
  // ];

  // const toggleCategory = (category: IssueCategory) => {
  //   const updated = selectedCategories.includes(category)
  //     ? selectedCategories.filter((c) => c !== category)
  //     : [...selectedCategories, category];
  //   setSelectedCategories(updated);
  //   onFilterChange?.({ categories: updated, provinces: selectedProvinces });
  // };

  // const toggleProvince = (province: Province) => {
  //   const updated = selectedProvinces.includes(province)
  //     ? selectedProvinces.filter((p) => p !== province)
  //     : [...selectedProvinces, province];
  //   setSelectedProvinces(updated);
  //   onFilterChange?.({ categories: selectedCategories, provinces: updated });
  // };

  // const clearFilters = () => {
  //   setSelectedCategories([]);
  //   setSelectedProvinces([]);
  //   onFilterChange?.({ categories: [], provinces: [] });
  // };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-green-600 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-green-800">
              EcoTrack Nepal
            </span>
          </div>

          <div className=" hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/")}
              className={"font-medium transition-colors hover:text-red-600 "}
            >
              Home
            </button>
            <button
              onClick={() => navigate("/reports")}
              className="font-medium transition-colors"
        
            >
              Reports
            </button>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center space-x-1 font-medium text-stone-600 hover:text-green-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {(selectedCategories.length > 0 ||
                  selectedProvinces.length > 0) && (
                  <span className="bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                    {selectedCategories.length + selectedProvinces.length}
                  </span>
                )}
              </button>
            {/* <button
              onClick={() => onNavigate("login")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Login
            </button> */}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => {
                navigate("/dashboard");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                // currentPage === "dashboard"
                  // ? "bg-green-50 text-green-600"
                  // : "text-stone-600"
                  selectedCategories
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                // onNavigate("reports");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium ${
                // currentPage === "reports"
                //   ? "bg-green-50 text-green-600"
                //   : "text-stone-600"
                selectedCategories
              }`}
            >
              Reports
            </button>
            {filtersOpen && (
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg font-medium text-stone-600"
              >
                <span className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </span>
                {(selectedCategories.length > 0 ||
                  selectedProvinces.length > 0) && (
                  <span className="bg-green-600 text-white text-xs rounded-full px-2 py-0.5">
                    {selectedCategories.length + selectedProvinces.length}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => {
                // onNavigate("login");
                setMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Login
            </button>
          </div>
        </div>
      )}

      {filtersOpen  && (
        
        <FilterComponent/>
      )}
    </nav>
  );
}
