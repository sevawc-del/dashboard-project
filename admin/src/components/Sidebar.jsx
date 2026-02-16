import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/manage-child-marriage-cases" className="block py-2 px-4 rounded hover:bg-gray-700">Child Marriage Cases</Link>
        </li>
        <li className="mb-4">
          <Link to="/manage-sliders" className="block py-2 px-4 rounded hover:bg-gray-700">Manage Sliders</Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
