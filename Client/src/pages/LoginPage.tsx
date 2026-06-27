import { Leaf, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoginProps } from "../types";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginProps>();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginProps) => {
    try {
      await axios.post("http://localhost:3000/api/user/login", data, {
        withCredentials: true,
      });
      toast.success("Login SucessFul");
      navigate("/");
    } catch (error) {
      toast.error("Wrong Password !!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-stone-50 to-blue-50 flex">
      <div className="hidden lg:flex w-6/12 items-center justify-center">
        <img
          src="/login.png"
          alt="Login Illustration"
          className="w-[70%] max-w-md object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-green-600 p-3 rounded-full mb-3">
              <Leaf className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-green-800">
              EcoTrack Nepal
            </h1>
            <p className="text-sm text-stone-600 text-center">
              Protecting Nepal's environment
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email Address
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
                  className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="your@email.com"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                  type="password"
                  className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="*******"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.password?.message}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn size={18} className="mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-stone-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-stone-500">
            <p>Report environmental issues. Make a difference.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
