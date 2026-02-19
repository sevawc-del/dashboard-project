import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const menuItems = [
  { to: '/dashboard', label: 'Dashboard', shortLabel: 'DB' },
  { to: '/manage-child-marriage-cases', label: 'Child Marriage Cases', shortLabel: 'CM' },
  { to: '/seed-distribution', label: 'Seed Distribution', shortLabel: 'SD' },
  { to: '/users', label: 'Users', shortLabel: 'US' },
  { to: '/settings', label: 'Settings', shortLabel: 'ST' }
];

const Sidebar = ({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onToggleMobile,
  onCloseMobile
}) => {
  const { user } = useContext(AuthContext);

  const handleLinkClick = () => {
    onCloseMobile?.();
  };

  const visibleMenuItems = menuItems.filter((item) => {
    if (item.to === '/users' && user?.role !== 'admin') {
      return false;
    }
    return true;
  });

  return (
    <div
      className={`fixed md:static top-0 left-0 z-40 bg-gray-800 text-white h-screen p-4 transition-all duration-300 transform ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 ${collapsed ? 'md:w-20' : 'md:w-64'} w-64`}
    >
      <button
        type="button"
        onClick={onToggleMobile}
        className="md:hidden absolute -right-10 top-4 bg-gray-800 text-white px-3 py-2 rounded-r"
        aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
        title={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {mobileOpen ? '<' : '>'}
      </button>

      <div className={`mb-6 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        <h2 className={`text-2xl font-bold ${collapsed ? 'text-base' : ''}`}>
          {collapsed ? 'AP' : 'Admin Panel'}
        </h2>
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`hidden md:inline-flex bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded ${
            collapsed ? 'text-xs' : 'text-sm'
          }`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '>>' : '<<'}
        </button>
      </div>

      <ul>
        {visibleMenuItems.map((item) => (
          <li className="mb-4" key={item.to}>
            <Link
              to={item.to}
              onClick={handleLinkClick}
              className={`block py-2 px-4 rounded hover:bg-gray-700 ${collapsed ? 'text-center' : ''}`}
              title={item.label}
            >
              {collapsed ? item.shortLabel : item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
