import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserMd, FaUser, FaArrowRight, FaShieldAlt, FaClock, FaChartLine } from 'react-icons/fa';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      if (userData.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/70 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaUserMd className="text-white text-xl" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CuraDocs
              </h1>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <button className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 animate-bounce">
            <FaShieldAlt className="text-sm" />
            <span className="text-sm font-semibold">Secure & HIPAA Compliant</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Healthcare Made
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Simple & Secure
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Streamline your healthcare experience with our intelligent role-based management system for doctors and patients.
          </p>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {/* Doctor Card */}
            <Link to="/signup?role=doctor">
              <div className="group relative border-2 border-gray-200 bg-white rounded-2xl p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <FaUserMd className="text-4xl text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">For Doctors</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Manage patients, appointments, and medical records efficiently with our advanced dashboard
                  </p>
                  <div className="flex items-center justify-center gap-2 font-semibold text-blue-600 group-hover:gap-4 transition-all">
                    Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Patient Card */}
            <Link to="/signup?role=patient">
              <div className="group relative border-2 border-gray-200 bg-white rounded-2xl p-8 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <FaUser className="text-4xl text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">For Patients</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Access your health records, schedule appointments, and track your wellness journey
                  </p>
                  <div className="flex items-center justify-center gap-2 font-semibold text-purple-600 group-hover:gap-4 transition-all">
                    Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FaShieldAlt className="text-blue-600 text-xl" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-sm text-gray-600">End-to-end encryption for all your medical data</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FaClock className="text-purple-600 text-xl" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">24/7 Access</h4>
              <p className="text-sm text-gray-600">Access your health records anytime, anywhere</p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-pink-300 transition-all duration-300">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FaChartLine className="text-pink-600 text-xl" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Smart Analytics</h4>
              <p className="text-sm text-gray-600">Track health trends with intelligent insights</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-sm bg-white/70 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="text-sm">
            &copy; 2025 CuraDocs. Built with ❤️ for CuraDocs Internship Assignment.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
