import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ManageSliders from '../pages/ManageSliders';
import ManageChildMarriageCases from '../pages/ManageChildMarriageCases';
import SeedDistribution from '../pages/SeedDistribution';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manage-sliders" element={<ManageSliders />} />
                <Route path="/manage-child-marriage-cases" element={<ManageChildMarriageCases />} />
                <Route path="/seed-distribution" element={<SeedDistribution />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
