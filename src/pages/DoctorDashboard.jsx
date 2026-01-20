import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doctorAPI } from '../utils/api';
import { FaUserMd, FaUsers, FaCalendarCheck, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await doctorAPI.getDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 border-gray-200"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const doctor = dashboardData?.doctor || {};

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">CuraDocs</h1>
            <p className="text-gray-500 mt-1">Doctor Portal</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-800 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, Dr. {doctor.fullName?.split(' ').pop()}
          </h2>
          <p className="text-gray-600 text-lg">{doctor.specialization || 'General Physician'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FaUsers, value: stats.totalPatients, label: 'Total Patients', color: 'blue' },
            { icon: FaCalendarCheck, value: stats.upcomingAppointments, label: 'Upcoming Appointments', color: 'green' },
            { icon: FaClipboardList, value: stats.totalAppointments, label: 'Total Appointments', color: 'purple' },
            { icon: FaUserMd, value: stats.completedAppointments, label: 'Completed', color: 'orange' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl hover:bg-${stat.color}-600 hover:text-white transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="text-3xl" />
                  <span className="text-3xl font-bold">{stat.value || 0}</span>
                </div>
                <h3 className="font-semibold">{stat.label}</h3>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <FaCalendarCheck /> Upcoming Appointments
            </h3>
            {dashboardData?.upcomingAppointments?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.upcomingAppointments.map((apt, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-md">
                    <p className="font-semibold text-gray-700">{apt.patientName || 'Patient Name'}</p>
                    <p className="text-sm text-gray-500">
                      {apt.date ? new Date(apt.date).toLocaleDateString() : 'Date TBD'} • {apt.time || 'Time TBD'}
                    </p>
                    <p className="text-sm text-gray-400">{apt.reason || 'General Checkup'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>

          {/* Recent Patients */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-md bg-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
              <FaUsers /> Recent Patients
            </h3>
            {dashboardData?.recentPatients?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentPatients.map((patient, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded-md">
                    <p className="font-semibold text-gray-700">{patient.fullName}</p>
                    <p className="text-sm text-gray-500">{patient.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No patients yet</p>
                <p className="text-sm mt-2">Patients will appear here once you start consultations</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { title: 'View All Patients', description: 'Manage your complete patient list' },
            { title: 'Schedule Appointment', description: 'Book new appointments' },
            { title: 'Write Prescription', description: 'Create and manage prescriptions' },
          ].map((action, idx) => (
            <button
              key={idx}
              className="border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300 text-left"
            >
              <h4 className="font-bold text-lg mb-2">{action.title}</h4>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">{action.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
