import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { patientAPI } from '../utils/api';
import { FaHeartbeat, FaCalendarAlt, FaFileMedical, FaPills, FaSignOutAlt, FaTint, FaUserMd, FaUser, FaChartLine } from 'react-icons/fa';

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await patientAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <FaHeartbeat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-600 text-xl animate-pulse" />
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const patient = dashboardData?.patient || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="backdrop-blur-sm bg-white/70 border-b border-purple-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CuraDocs
                </h1>
                <p className="text-xs text-gray-600">Patient Portal</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <FaUser className="text-3xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Hello, {patient.fullName?.split(' ')[0]}! 👋
              </h2>
              <p className="text-purple-100 text-lg">Here's your health summary for today</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl hover:border-purple-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaCalendarAlt className="text-xl text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {stats.upcomingAppointments || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-700">Upcoming Visits</h3>
            <p className="text-sm text-gray-500 mt-1">Scheduled appointments</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl hover:border-pink-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaFileMedical className="text-xl text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-pink-600 to-pink-700 bg-clip-text text-transparent">
                {stats.activeMedicalConditions || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-700">Active Conditions</h3>
            <p className="text-sm text-gray-500 mt-1">Being monitored</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaPills className="text-xl text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {stats.currentMedications || 0}
              </span>
            </div>
            <h3 className="font-semibold text-gray-700">Medications</h3>
            <p className="text-sm text-gray-500 mt-1">Current prescriptions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 hover:shadow-xl hover:border-red-300 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaTint className="text-xl text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-red-600 to-red-700 bg-clip-text text-transparent">
                {patient.bloodGroup || 'N/A'}
              </span>
            </div>
            <h3 className="font-semibold text-gray-700">Blood Group</h3>
            <p className="text-sm text-gray-500 mt-1">Blood type</p>
          </div>
        </div>

        {/* Health Stats Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-purple-100">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FaHeartbeat className="text-white" />
            </div>
            Health Statistics
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
              <p className="text-purple-700 text-sm font-semibold mb-2">Height</p>
              <p className="text-3xl font-bold text-purple-900">
                {patient.healthStats?.height || 'N/A'} {patient.healthStats?.height ? 'cm' : ''}
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-l-4 border-pink-500">
              <p className="text-pink-700 text-sm font-semibold mb-2">Weight</p>
              <p className="text-3xl font-bold text-pink-900">
                {patient.healthStats?.weight || 'N/A'} {patient.healthStats?.weight ? 'kg' : ''}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-blue-700 text-sm font-semibold mb-2">Last Checkup</p>
              <p className="text-lg font-bold text-blue-900">
                {patient.healthStats?.lastCheckup 
                  ? new Date(patient.healthStats.lastCheckup).toLocaleDateString() 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-white" />
              </div>
              Upcoming Appointments
            </h3>
            {dashboardData?.upcomingAppointments?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.upcomingAppointments.map((apt, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaUserMd className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{apt.doctorName || 'Dr. Name'}</p>
                        <p className="text-sm text-purple-600 font-semibold mt-1">
                          {apt.date ? new Date(apt.date).toLocaleDateString() : 'Date TBD'} • {apt.time || 'Time TBD'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{apt.reason || 'General Checkup'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-3xl text-purple-500" />
                </div>
                <p className="text-gray-600 mb-4">No upcoming appointments</p>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          {/* Medical History */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <FaFileMedical className="text-white" />
              </div>
              Recent Medical History
            </h3>
            {dashboardData?.recentMedicalHistory?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentMedicalHistory.map((record, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border-l-4 border-pink-500 hover:shadow-md transition-all">
                    <p className="font-bold text-gray-800">{record.condition}</p>
                    <p className="text-sm text-pink-600 font-semibold mt-1">
                      Diagnosed: {record.diagnosedDate ? new Date(record.diagnosedDate).toLocaleDateString() : 'N/A'}
                    </p>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full mt-2 font-semibold ${
                      record.status === 'active' 
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {record.status || 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaFileMedical className="text-3xl text-pink-500" />
                </div>
                <p className="text-gray-600 mb-2">No medical history recorded</p>
                <p className="text-sm text-gray-500">Your medical records will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-xl hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
              <FaCalendarAlt className="text-white text-xl" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Book Appointment</h4>
            <p className="text-sm text-gray-600">
              Schedule a visit with your doctor
            </p>
          </button>
          <button className="bg-white rounded-2xl p-8 shadow-lg border border-pink-100 hover:shadow-xl hover:border-pink-300 hover:-translate-y-1 transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
              <FaFileMedical className="text-white text-xl" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">View Records</h4>
            <p className="text-sm text-gray-600">
              Access your complete medical history
            </p>
          </button>
          <button className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 text-left group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
              <FaPills className="text-white text-xl" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Prescriptions</h4>
            <p className="text-sm text-gray-600">
              View and manage your medications
            </p>
          </button>
        </div>
      </main>
    </div>
  );
}