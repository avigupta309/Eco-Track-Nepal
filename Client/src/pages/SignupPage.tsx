import { useState } from "react";
import { Leaf, Mail, Lock, User, Phone, MapPin, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-stone-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-600 p-4 rounded-full mb-4">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Join EcoTrack Nepal
            </h1>
            <p className="text-stone-600 text-center">
              Be part of Nepal's environmental protection community
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Ram Bahadur"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="98XXXXXXXX"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-stone-400" />
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    placeholder="Kathmandu, Nepal"
                    required
                  />
                </div>
              </div>

              {/* Profile Picture */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Profile Picture
                </label>
                <label className="flex items-center border-2  border-stone-300 rounded-lg cursor-pointer">
                  <div className=" flex gap-5 text-center">
                    <User2 className=" text-stone-400 " />
                    <p className="text-sm text-stone-600">
                      Upload your profile Pic
                    </p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-stone-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="text-green-600 font-semibold hover:text-green-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-stone-500">
          <p>
            By signing up, you agree to help protect Nepal's precious
            environment
          </p>
        </div>
      </div>
    </div>
  );
}
