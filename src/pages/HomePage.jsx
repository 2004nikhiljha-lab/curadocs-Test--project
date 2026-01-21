import { useEffect, useState } from 'react';
import { FaUserMd, FaUser, FaArrowRight, FaShieldAlt, FaClock, FaChartLine, FaHeart, FaCalendarCheck, FaLaptopMedical } from 'react-icons/fa';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate navigation
  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`,
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
                <FaUserMd className="text-white text-xl" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CuraDocs
              </h1>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => handleNavigate('/login')}
                className="px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
              >
                Login
              </button>
              <button 
                onClick={() => handleNavigate('/signup')}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 font-semibold text-sm sm:text-base hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Floating Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 rounded-full mb-6 animate-float"
            style={{ animationDelay: '0s' }}
          >
            <FaShieldAlt className="text-sm animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold">Secure & HIPAA Compliant</span>
          </div>

          {/* Main Heading with Typing Effect */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-white">
            Healthcare Made
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Simple & Secure
            </span>
          </h2>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Streamline your healthcare experience with our intelligent role-based management system for doctors and patients.
          </p>

          {/* Doctor Image with Overlay */}
          <div className="mb-8 sm:mb-12 relative max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80" 
                alt="Healthcare professionals"
                className="w-full h-48 sm:h-64 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <h3 className="text-xl sm:text-3xl font-bold text-white mb-2">Join 10,000+ Healthcare Professionals</h3>
                <p className="text-sm sm:text-lg text-gray-200">Trusted by doctors and patients worldwide</p>
              </div>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
            {/* Doctor Card */}
            <div 
              onClick={() => handleNavigate('/signup?role=doctor')}
              className="group relative border-2 border-white/20 bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <FaUserMd className="text-2xl sm:text-4xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">For Doctors</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                  Manage patients, appointments, and medical records efficiently with our advanced dashboard
                </p>
                <div className="flex items-center justify-center gap-2 font-semibold text-blue-400 group-hover:gap-4 transition-all">
                  Get Started <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Patient Card */}
            <div 
              onClick={() => handleNavigate('/signup?role=patient')}
              className="group relative border-2 border-white/20 bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                    <FaUser className="text-2xl sm:text-4xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">For Patients</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                  Access your health records, schedule appointments, and track your wellness journey
                </p>
                <div className="flex items-center justify-center gap-2 font-semibold text-purple-400 group-hover:gap-4 transition-all">
                  Get Started <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { icon: FaShieldAlt, title: 'Secure & Private', desc: 'End-to-end encryption for all your medical data', color: 'blue', delay: '0.3s' },
              { icon: FaClock, title: '24/7 Access', desc: 'Access your health records anytime, anywhere', color: 'purple', delay: '0.4s' },
              { icon: FaChartLine, title: 'Smart Analytics', desc: 'Track health trends with intelligent insights', color: 'pink', delay: '0.5s' },
              { icon: FaCalendarCheck, title: 'Easy Scheduling', desc: 'Book and manage appointments seamlessly', color: 'green', delay: '0.6s' },
              { icon: FaHeart, title: 'Patient Care', desc: 'Personalized healthcare experience', color: 'red', delay: '0.7s' },
              { icon: FaLaptopMedical, title: 'Telemedicine', desc: 'Virtual consultations from home', color: 'indigo', delay: '0.8s' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className={`group bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-${feature.color}-400/50 hover:bg-white/10 transition-all duration-500 animate-fade-in-up hover:scale-105 hover:shadow-xl`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${feature.color}-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <feature.icon className={`text-${feature.color}-400 text-lg sm:text-xl`} />
                </div>
                <h4 className="font-bold text-white mb-2 text-sm sm:text-base">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/5 border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">
            &copy; 2025 CuraDocs. Built with <span className="text-red-400 animate-pulse">❤️</span> for better healthcare.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
