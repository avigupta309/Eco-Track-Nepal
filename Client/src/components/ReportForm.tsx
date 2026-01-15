import { useState } from "react";
import { X, MapPin, Image as ImageIcon } from "lucide-react";
import { IssueCategory, Province ,FormReport} from "../types";
import { ISSUE_CATEGORIES, Provinces ,districtsByProvince} from "../mockData";
import { HandlePhotosUpload } from "./HandlePhotosUpload";
import{useForm} from 'react-hook-form'
interface ReportFormProps {
  setIssueForm: (data: boolean) => void;
  issueForm: boolean;
}

export default function ReportForm({
  issueForm,
  setIssueForm,
}: ReportFormProps) {

  const {handleSubmit,register} =useForm<FormReport>()

  const [description, setDescription] = useState("");
  const [province, setProvince] = useState<Province>("Bagmati");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const[category,setCategory]=useState<IssueCategory>("Other")
  const [location, setLocation] = useState({ lat: 27.7172, lng: 85.324 });


  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Unable to retrieve location");
        }
      );
    }
  };

  const onSubmit=(data:FormReport)=>{
    console.log(data)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-green-800">
            Report Environmental Issue
          </h2>
          <button
            onClick={() => {
              setIssueForm(!issueForm);
            }}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-stone-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 overflow-y-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Issue Category
              </label>
              <select
              {...register("category")}
                value={category}
                onChange={(e)=>{setCategory(e.target.value as IssueCategory)}}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                {ISSUE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Province
              </label>
              <select
              {...register("province")}
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value as Province);
                  setDistrict("");
                }}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                {Provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                District
              </label>
              <select
              {...register("district")}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select District</option>
                {districtsByProvince[province].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Exact Address
              </label>
              <input
              {...register("address")}
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
            {...register("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              placeholder="Provide detailed information about the environmental issue..."
              required
            />
          </div>

          <HandlePhotosUpload />
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
           
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                setIssueForm(!issueForm);
              }}
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