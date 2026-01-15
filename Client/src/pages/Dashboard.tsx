// import { useState, useMemo } from "react";
// import { Plus } from "lucide-react";
// import { Report, IssueCategory, Province } from "../types";
// import MapView from "../components/MapView";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// interface DashboardProps {
//   reports: Report[];
//   onNavigate: (page: string) => void;
//   onSelectReport: (report: Report) => void;
//   onOpenReportForm: () => void;
// }

// export default function Dashboard({
//   reports,
//   onNavigate,
//   onSelectReport,
//   onOpenReportForm,
// }: DashboardProps) {
//   const [filters, setFilters] = useState<{
//     categories: IssueCategory[];
//     provinces: Province[];
//   }>({
//     categories: [],
//     provinces: [],
//   });

//   const navigate = useNavigate();

//   const filteredReports = useMemo(() => {
//     return reports.filter((report) => {
//       const categoryMatch =
//         filters.categories.length === 0 ||
//         filters.categories.includes(report.category);
//       const provinceMatch =
//         filters.provinces.length === 0 ||
//         filters.provinces.includes(report.province);
//       return categoryMatch && provinceMatch;
//     });
//   }, [reports, filters]);

//   return (
//     <div className="h-screen flex flex-col">
//       <Navbar
//         // currentPage="dashboard"
        
//         // onFilterChange={setFilters}
//         // showFilters={true}
//       />

//       <div className="flex-1 relative">
//         <MapView reports={filteredReports} onSelectReport={onSelectReport} />

//         <button
//           onClick={onOpenReportForm}
//           className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 z-40 flex items-center space-x-2"
//         >
//           <Plus className="w-6 h-6" />
//           <span className="hidden md:inline font-semibold">Report Issue</span>
//         </button>

//         <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 z-40 hidden md:block">
//           <h3 className="font-semibold text-stone-800 mb-3">Map Legend</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-red-500"></div>
//               <span className="text-stone-600">Deforestation</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-orange-500"></div>
//               <span className="text-stone-600">Landslides</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-blue-500"></div>
//               <span className="text-stone-600">River Pollution</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-purple-500"></div>
//               <span className="text-stone-600">Waste Dumping</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
//               <span className="text-stone-600">Forest Fires</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 rounded-full bg-green-500"></div>
//               <span className="text-stone-600">Wildlife Threats</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
