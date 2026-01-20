import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;