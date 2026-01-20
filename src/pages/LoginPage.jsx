import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user) {
      navigate(user.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.email, formData.password, formData.role);

    if (!result.success) {
      setApiError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold mb-2 cursor-pointer hover:text-gray-700 transition">
              CuraDocs
            </h1>
          </Link>
          <p className="text-gray-600">Welcome back</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
            className={`flex-1 py-4 border-2 transition-all duration-300 ${
              formData.role === 'doctor'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            <FaUserMd className="inline text-2xl mb-1" />
            <p className="font-semibold">Doctor</p>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
            className={`flex-1 py-4 border-2 transition-all duration-300 ${
              formData.role === 'patient'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            <FaUser className="inline text-2xl mb-1" />
            <p className="font-semibold">Patient</p>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {apiError && (
            <div className="p-4 border-2 border-red-500 bg-red-50 text-red-700">
              {apiError}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 focus:outline-none focus:border-black transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 focus:outline-none focus:border-black transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-black hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}