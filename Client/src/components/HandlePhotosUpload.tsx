import { Upload, X } from "lucide-react";
import React, { useState } from "react";

export const HandlePhotosUpload = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const submitPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && photos.length < 3) {
      const newPhotos = Array.from(files)
        .slice(0, 3 - photos.length)
        .map((file) => URL.createObjectURL(file));
        setPhotos((prev)=>[...prev,...newPhotos])
    }
  };

  function removePhoto(index:number) {
    setPhotos(photos.filter((_,i)=>i!==index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        Photos (up to 3)
      </label>
      <div className="space-y-3">
        {photos.length < 3 && (
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
            <div className="text-center">
              <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm text-stone-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-stone-400 mt-1">PNG, JPG up to 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={submitPhoto}
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
  );
};
