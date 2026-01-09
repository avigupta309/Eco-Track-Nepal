import { useState } from 'react';
import { X, Upload, MapPin, Image as ImageIcon } from 'lucide-react';
import { IssueCategory, Province } from '../types';
import { districtsByProvince } from '../mockData';

interface ReportFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const categories: IssueCategory[] = [
  'Deforestation',
  'Landslides',
  'River Pollution',
  'Waste Dumping',
  'Forest Fires',
  'Wildlife Threats',
  'Other'
];

const provinces: Province[] = [
  'Koshi',
  'Madhesh',
  'Bagmati',
  'Gandaki',
  'Lumbini',
  'Karnali',
  'Sudurpashchim'
];

export default function ReportForm({ onClose, onSubmit }: ReportFormProps) {
  const [category, setCategory] = useState<IssueCategory>('Deforestation');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [province, setProvince] = useState<Province>('Bagmati');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({ lat: 27.7172, lng: 85.3240 });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && photos.length < 3) {
      const newPhotos = Array.from(files).slice(0, 3 - photos.length).map(file => URL.createObjectURL(file));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      description,
      photos,
      province,
      district,
      address,
      location
    });
    onClose();
  };

  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          alert('Unable to retrieve location');
        }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 relative top-56">
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <h2 className="text-2xl font-bold text-green-800">Report Environmental Issue</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Issue Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IssueCategory)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Province
              </label>
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value as Province);
                  setDistrict('');
                }}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select District</option>
                {districtsByProvince[province].map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Exact Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Street name, landmark, etc."
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              placeholder="Provide detailed information about the environmental issue..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Photos (up to 3)
            </label>
            <div className="space-y-3">
              {photos.length < 3 && (
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-sm text-stone-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-stone-400 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Location
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1 px-4 py-3 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-600">
                <MapPin className="w-4 h-4 inline mr-2" />
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
              <button
                type="button"
                onClick={useMyLocation}
                className="px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium whitespace-nowrap"
              >
                Use My Location
              </button>
            </div>
            <div className="mt-3 h-48 bg-gradient-to-br from-green-100 via-stone-100 to-blue-100 rounded-lg border border-stone-300 flex items-center justify-center">
              <div className="text-center text-stone-500">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Interactive map placeholder</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
