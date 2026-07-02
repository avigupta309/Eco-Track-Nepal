import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { userProps } from "../../types";
import axios from "axios";
import { useForm } from "react-hook-form";

interface ModalControlProps {
  userId: string;
  onClose: () => void;
}

export function ModifiedModal({ userId, onClose }: ModalControlProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<userProps>();
  const [user, setUser] = useState<userProps>();
  useEffect(() => {
    if (!userId) return;
    async function fetChedUser() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`,
        );
        setUser(response.data.data);
      } catch (error: any) {
        console.log("error message: ", error.message);
      }
    }
    fetChedUser();
  }, []);

  useEffect(() => {
    if (user) {
      setValue("role", user.role);
      setValue("fullName", user.fullName);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [user]);

  const onSubmit = async (data: userProps) => {
    try {
      await axios.put(
        `http://localhost:3000/api/user/changerole/${userId}`,
        data,
      );
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl  text-white">Edit User</h2>

          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>

                <input
                  {...register("fullName", {
                    required: "Full Name is must required",
                    minLength: {
                      value: 4,
                      message: "Name Must Be Greater than 4 Character",
                    },
                  })}
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Role
                </label>

                <select
                  {...register("role", { required: "Role is must required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-red-500 text-sm mt-1">
                  {errors.role?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>

                <input
                  {...register("phoneNumber", {
                    required: "PhoneNumber is Must Required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone Number must be exact 10 digit",
                    },
                  })}
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 text-gray-900"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber?.message}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition-all duration-300"
              >
                Cancel
              </button>

              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
