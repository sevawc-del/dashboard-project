import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ManageChildMarriageCases from '../pages/ManageChildMarriageCases';
import SeedDistribution from '../pages/SeedDistribution';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="flex min-h-screen bg-gray-100">
              <Sidebar
                collapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
                mobileOpen={isSidebarOpen}
                onToggleMobile={() => setIsSidebarOpen((prev) => !prev)}
                onCloseMobile={() => setIsSidebarOpen(false)}
              />
              <div className="flex-1 min-w-0">
                <Navbar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/manage-child-marriage-cases" element={<ManageChildMarriageCases />} />
                  <Route path="/seed-distribution" element={<SeedDistribution />} />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute requireAdmin>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
