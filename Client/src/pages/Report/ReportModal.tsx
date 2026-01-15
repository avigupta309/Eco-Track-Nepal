import { X, MapPin, Calendar } from "lucide-react";
import React from "react";
import { Report } from "../../types";

interface ReportModalProps {
  report: Report;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  report,
  onClose,
}) => {

  console.log(report.address)
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl h-[90vh] rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* ===== Header ===== */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-stone-800">
            Report Details
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <X size={22} />
          </button>
        </div>

        {/* ===== Scrollable Content ===== */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Reporter Info */}
          <div className="flex items-center gap-4">
            <img
              src="./png"
              alt={report.reporter.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-stone-800">
                {report.reporter.name}
              </h3>
              <p className="text-sm text-stone-500">
                {report.reporter.address}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-600">
            <p>
              <strong>Mobile:</strong> report.reporter.mobile
            </p>
            <p>
              <strong>Email:</strong> {report.reporter.email}
            </p>

            <p className="flex items-center gap-1">
              <MapPin size={16} />
              {report.district}, {report.province}
            </p>

            <p className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(report.date).toLocaleDateString()}
            </p>
          </div>

          {/* Category */}
          <div>
            <h4 className="font-semibold text-stone-700 mb-1">Category</h4>
            <p className="text-stone-600">{report.category}</p>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-stone-700 mb-1">Description</h4>
            <p className="text-stone-600 leading-relaxed">
              {report.description}
            </p>
          </div>

          {/* Image */}
          {report.photos[0] && (
            <div>
              <img
                src={report.photos[0]}
                alt="Report"
                className="w-full max-h-72 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* ===== Footer (Optional) ===== */}
        <div className="border-t px-6 py-3 flex justify-end bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-stone-800 text-white hover:bg-stone-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
