import { Leaf, Mail, Lock, User, Phone, MapPin, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpProps } from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signUpProps>();

  const onSubmit = async (data: signUpProps) => {
    try {
      await axios.post("http://localhost:3000/api/user", data);
      navigate("/login");
    } catch (error: any) {
      toast.error("Something Went Wrong !");
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-stone-50 to-blue-50">
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img
          src="/signup.png"
          alt="Signup"
          className="w-[75%] max-w-lg object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center mt-14">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-green-600 p-3 rounded-full mb-3">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800">
              Join EcoTrack Nepal
            </h1>
            <p className="text-stone-600 text-center text-sm">
              Be part of Nepal's environmental protection community
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name Must be atleast 3 character",
                      },
                    })}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Full Name"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName?.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="your@email.com"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email?.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    {...register("phoneNumber", {
                      required: "Phone Number is Required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone Number must be exact 10 digit",
                      },
                    })}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="98XXXXXXXX"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber?.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <textarea
                    {...register("address", {
                      required: "Address is Required",
                    })}
                    rows={2}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    placeholder="Kathmandu, Nepal"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address?.message}
                  </p>
                </div>
              </div>

              {/* <div className="md:col-span-2">
                <label className="flex items-center gap-3 border h-12 px-4 rounded-lg cursor-pointer">
                  <User2 className="text-stone-400 w-5 h-5" />
                  <span className="text-sm text-stone-600">
                    Upload profile pic
                  </span>
                  <input
                    {...register("profileImage", {
                      required: "ProfileImage is Required",
                    })}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profileImage?.message}
                  </p>
                </label>
              </div> */}

              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    {...register("password", {
                      required: "Password is Required",
                      minLength: {
                        value: 8,
                        message: "Password must be 8 Character",
                      },
                    })}
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="*******"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm text-stone-700 mb-1 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm the Password",
                    })}
                    type="password"
                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="*******"
                  />
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn size={18} className="mr-2" />
                  Sign Up
                </div>
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-stone-600">
              Already have an account?{" "}
              <button
                disabled={isSubmitting}
                onClick={() => navigate("/login")}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
