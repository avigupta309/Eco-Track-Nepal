import { useState } from "react";
import {
  TreePine,
  Mountain,
  Droplets,
  Trash2,
  Flame,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { Report } from "../../types";
import { mockReports } from "../../mockData";
import { ReportInput } from "./ReportInput";
import { ReportModal } from "./ReportModal";

const categoryColors = {
  Deforestation: "bg-red-500",
  Landslides: "bg-orange-500",
  "River Pollution": "bg-blue-500",
  "Waste Dumping": "bg-purple-500",
  "Forest Fires": "bg-yellow-500",
  "Wildlife Threats": "bg-green-500",
  Other: "bg-stone-500",
};

const categoryIcons = {
  Deforestation: TreePine,
  Landslides: Mountain,
  "River Pollution": Droplets,
  "Waste Dumping": Trash2,
  "Forest Fires": Flame,
  "Wildlife Threats": AlertCircle,
  Other: AlertCircle,
};

export  function ReportList() {
  const [reports, _] = useState<Report[]>(mockReports);
  const [selectReport, setSelectedReport] = useState<Report|null>(null);

  return (
    <div className="relative top-10 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Environmental Reports
          </h1>
          <p className="text-stone-600">
            Browse all reported environmental issues across Nepal
          </p>
        </div>

        <ReportInput />
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="">
            <table className="w-full">
              <thead className="bg-green-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                    Category
                  </th>
                  <th className=" hidden md:block px-6 py-4 text-left text-sm font-semibold text-stone-700">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                    Reporter
                  </th>
                  <th className=" hidden md:block px-6 py-4 text-left text-sm font-semibold text-stone-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {reports.map((report) => {
                  return (
                    <tr
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className="hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`${
                              categoryColors[report.category]
                            } p-2 rounded-lg`}
                          >
                            {(() => {
                              const CategoryIcon =
                                categoryIcons[report.category] || AlertCircle;
                              return (
                                <CategoryIcon className="w-4 h-4 text-white" />
                              );
                            })()}
                          </div>
                          <span className="font-medium text-stone-800">
                            {report.category}
                          </span>
                        </div>
                      </td>

                      <td className="hidden md:block px-6 py-4">
                        <p className="text-stone-600 line-clamp-2 max-w-md">
                          {report.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1 text-stone-600">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {report.district}, {report.province}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                            {report.reporter.name.charAt(0)}
                          </div>
                          <span className="text-sm text-stone-800">
                            {report.reporter.name}
                          </span>
                        </div>
                      </td>
                      <td className=" hidden md:block px-6 py-4">
                        <div className="flex items-center space-x-1 text-stone-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
        </div>
        {selectReport && (
          <ReportModal
            report={selectReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </div>
    </div>
  );
}
