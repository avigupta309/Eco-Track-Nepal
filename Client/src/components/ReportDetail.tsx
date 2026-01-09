import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, User, TreePine, Mountain, Droplets, Trash2, Flame, AlertCircle } from 'lucide-react';
import { Report } from '../types';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
}

const categoryColors = {
  'Deforestation': 'bg-red-500',
  'Landslides': 'bg-orange-500',
  'River Pollution': 'bg-blue-500',
  'Waste Dumping': 'bg-purple-500',
  'Forest Fires': 'bg-yellow-500',
  'Wildlife Threats': 'bg-green-500',
  'Other': 'bg-stone-500'
};

const categoryIcons = {
  'Deforestation': TreePine,
  'Landslides': Mountain,
  'River Pollution': Droplets,
  'Waste Dumping': Trash2,
  'Forest Fires': Flame,
  'Wildlife Threats': AlertCircle,
  'Other': AlertCircle
};

export default function ReportDetail({ report, onClose }: ReportDetailProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const Icon = categoryIcons[report.category];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % report.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + report.photos.length) % report.photos.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-stone-200">
          <div className="flex items-center space-x-3">
            <div className={`${categoryColors[report.category]} p-3 rounded-full`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-800">{report.category}</h2>
              <p className="text-sm text-stone-600">{report.district}, {report.province}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {report.photos.length > 0 && (
            <div className="relative">
              <div className="relative h-96 bg-stone-100 rounded-xl overflow-hidden">
                <img
                  src={report.photos[currentPhotoIndex]}
                  alt={`Report photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {report.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-stone-800" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-stone-800" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {report.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentPhotoIndex
                              ? 'bg-white w-8'
                              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {report.photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {report.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`relative h-24 rounded-lg overflow-hidden ${
                        index === currentPhotoIndex ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
                      <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">Description</h3>
            <p className="text-stone-600 leading-relaxed">{report.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-stone-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                Location Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Province:</span>
                  <span className="font-medium text-stone-800">{report.province}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">District:</span>
                  <span className="font-medium text-stone-800">{report.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Address:</span>
                  <span className="font-medium text-stone-800 text-right">{report.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Coordinates:</span>
                  <span className="font-medium text-stone-800">
                    {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Report Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Date Reported:</span>
                  <span className="font-medium text-stone-800">
                    {new Date(report.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Category:</span>
                  <span className={`${categoryColors[report.category]} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {report.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Reported By
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {report.reporter.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-stone-800">{report.reporter.name}</p>
                <p className="text-sm text-stone-600">{report.reporter.email}</p>
              </div>
            </div>
          </div>

          <div className="h-64 bg-gradient-to-br from-green-100 via-stone-100 to-blue-100 rounded-xl border border-stone-300 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-stone-300"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
            </div>
            <div className="relative text-center">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <p className="text-stone-600 font-medium">Location on Map</p>
              <p className="text-sm text-stone-500 mt-1">
                {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
