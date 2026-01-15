import { useState } from "react";
import { Leaf, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-stone-50 to-blue-50 flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 relative top-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 p-3 rounded-full mb-3">
            <Leaf className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-green-800">EcoTrack Nepal</h1>
          <p className="text-sm text-stone-600 text-center">
            Protecting Nepal's environment
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm">
          <p className="text-stone-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Sign up
            </button>
          </p>
        </div>
        <div className="mt-6 text-center text-sm text-stone-500">
          {" "}
          <p>Report environmental issues. Make a difference.</p>{" "}
        </div>
      </div>
    </div>
  );
}
