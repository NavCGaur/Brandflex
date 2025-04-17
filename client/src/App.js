import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './containers/auth/login';
import AdminDashboard from './containers/dashboard/admin/dashboard';
import AdminLayout from './containers/dashboard/superAdmin/superAdminLayout';
import ResellerLayout from './containers/dashboard/reseller/resellerLayout';
import { ProtectedRoute } from './components/protectedRoute';
import UnAuthorized from './containers/auth/unAuthoruzed';
import ResellerDashboard from './containers/dashboard/reseller/dashboard';
import AdminCRUDDashboard from './containers/dashboard/admin/crud/userRead';
import SignUp from './containers/auth/signUp';
import VerifyEmail from './containers/auth/verifyemail';
import ResellerCRUDDashboard from './containers/dashboard/reseller/crud/userRead';
import AgencyDashboard from './containers/dashboard/agency/dashboard';
import AgencyCRUDDashboard from './containers/dashboard/agency/crud/userRead';
import ClientDashboard from './containers/dashboard/client/dashboard';
import GuestDashboard from './containers/dashboard/guest/dashboard';
import SuperAdminLayout from './containers/dashboard/superAdmin/superAdminLayout';
import SuperAdminDashboard from './containers/dashboard/superAdmin/dashboard';
import SuperAdminCRUDDashboard from './containers/dashboard/superAdmin/crud/userRead';
import FeaturesSection from './containers/dashboard/client/featuresSection';
import ClientLayout from './containers/dashboard/client/clientLayout';
import GuestLayout from './containers/dashboard/guest/adminLayout';
import AgencyLayout from './containers/dashboard/agency/agencyLayout';

function App() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />

          <Route path="/superadmin" element={<ProtectedRoute  requiredRole="Superadmin"><SuperAdminLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="customers" element={<SuperAdminCRUDDashboard />} />            
          </Route>

          <Route path="/admin" element={<ProtectedRoute  requiredRole="Admin"><AdminLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCRUDDashboard />} />            
          </Route>

          <Route path="/reseller" element={<ProtectedRoute  requiredRole="Reseller"><ResellerLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<ResellerDashboard />} />
            <Route path="customers" element={<ResellerCRUDDashboard/>} />
          </Route>

          <Route path="/agency" element={<ProtectedRoute  requiredRole="Agency"><AgencyLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<AgencyDashboard />} />
            <Route path="customers" element={<AgencyCRUDDashboard/>} />
          </Route>

          <Route path="/client" element={<ProtectedRoute  requiredRole="Client"><ClientLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="features" element={<FeaturesSection/>} />
          </Route>

          <Route path="/guest" element={<ProtectedRoute  requiredRole="Guest"><GuestLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<GuestDashboard />} />
            <Route path="features" element={<FeaturesSection/>} />
          </Route>  

          <Route path="/unauthorized" element={<UnAuthorized />} />

        </Routes>
  );
}

export default App;