// import { TreePine, Mountain, Droplets, Trash2, Flame, AlertCircle } from 'lucide-react';
// import { Report } from '../types';

// interface MapViewProps {
//   reports: Report[];
//   onSelectReport: (report: Report) => void;
// }

// const categoryColors = {
//   'Deforestation': 'bg-red-500',
//   'Landslides': 'bg-orange-500',
//   'River Pollution': 'bg-blue-500',
//   'Waste Dumping': 'bg-purple-500',
//   'Forest Fires': 'bg-yellow-500',
//   'Wildlife Threats': 'bg-green-500',
//   'Other': 'bg-stone-500'
// };

// const categoryIcons = {
//   'Deforestation': TreePine,
//   'Landslides': Mountain,
//   'River Pollution': Droplets,
//   'Waste Dumping': Trash2,
//   'Forest Fires': Flame,
//   'Wildlife Threats': AlertCircle,
//   'Other': AlertCircle
// };

// export default function MapView({ reports, onSelectReport }: MapViewProps) {
//   return (
//     <div className="relative w-full h-full bg-gradient-to-br from-green-100 via-stone-100 to-blue-100 overflow-hidden">
//       <div className="absolute inset-0 opacity-20">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-300"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 opacity-10">
//         <svg viewBox="0 0 200 200" className="w-full h-full">
//           <path
//             d="M 20,100 Q 40,60 60,80 T 100,60 T 140,80 T 180,100 L 180,180 L 20,180 Z"
//             fill="currentColor"
//             className="text-stone-400"
//           />
//         </svg>
//       </div>

//       {reports.map((report) => {
//         const Icon = categoryIcons[report.category];
//         const normalizedLat = ((report.location.lat - 26) / (30 - 26)) * 100;
//         const normalizedLng = ((report.location.lng - 80) / (88 - 80)) * 100;

//         return (
//           <button
//             key={report.id}
//             onClick={() => onSelectReport(report)}
//             className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
//             style={{
//               left: `${normalizedLng}%`,
//               top: `${100 - normalizedLat}%`
//             }}
//           >
//             <div className="relative">
//               <div className={`${categoryColors[report.category]} w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white group-hover:scale-125 transition-transform cursor-pointer`}>
//                 <Icon className="w-5 h-5" />
//               </div>
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-stone-400"></div>

//               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//                 <div className="bg-white rounded-lg shadow-xl p-3 min-w-[200px]">
//                   <div className="flex items-start space-x-2">
//                     <div className={`${categoryColors[report.category]} w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0`}>
//                       <Icon className="w-4 h-4" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="font-semibold text-stone-800 text-sm">{report.category}</p>
//                       <p className="text-xs text-stone-600 mt-1 line-clamp-2">{report.description}</p>
//                       <p className="text-xs text-stone-500 mt-1">{report.district}, {report.province}</p>
//                       <p className="text-xs text-stone-400 mt-1">{new Date(report.date).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                   {report.photos.length > 0 && (
//                     <img
//                       src={report.photos[0]}
//                       alt="Report"
//                       className="w-full h-20 object-cover rounded mt-2"
//                     />
//                   )}
//                 </div>
//                 <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
//               </div>
//             </div>
//           </button>
//         );
//       })}

//       <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg shadow-md p-2 text-xs text-stone-600">
//         <p className="font-semibold">Nepal Map View</p>
//         <p>{reports.length} Reports</p>
//       </div>
//     </div>
//   );
// }
