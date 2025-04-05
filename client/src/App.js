import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './containers/auth/login';
import AdminDashboard from './containers/dashboard/superAdmin/dashboard';
import AdminLayout from './containers/dashboard/superAdmin/adminLayout';
import ResellerLayout from './containers/dashboard/reseller/resellerLayout';
import { ProtectedRoute } from './components/protectedRoute';
import UnAuthorized from './containers/auth/unAuthoruzed';
import ResellerDashboard from './containers/dashboard/reseller/dashboard';
import AdminCRUDDashboard from './containers/dashboard/superAdmin/crud/userRead';
import SignUp from './containers/auth/signUp';
import VerifyEmail from './containers/auth/verifyemail';


function App() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/admin" element={<ProtectedRoute  requiredRole="Admin"><AdminLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCRUDDashboard />} />            
          </Route>
          <Route path="/reseller" element={<ProtectedRoute  requiredRole="Reseller"><ResellerLayout /></ProtectedRoute>} >
            <Route path="dashboard" element={<ResellerDashboard />} />
          </Route>
          <Route path="/unauthorized" element={<UnAuthorized />} />

        </Routes>
  );
}

export default App;