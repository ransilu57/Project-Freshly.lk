import React, { useState } from 'react';
import { 
  Package, 
  User, 
  AlertOctagon, 
  BarChart, 
  HelpCircle, 
  LogOut,
  Sprout,
  MoreVertical
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const FarmerDashboard = ({ farmerData, onLogout }) => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: 'My Products', icon: Package, section: 'products' },
    { name: 'My Profile', icon: User, section: 'profile' },
    { name: 'Complaints', icon: AlertOctagon, section: 'complaints' },
    { name: 'Analytics', icon: BarChart, section: 'analytics' },
    { name: 'Help Bot', icon: HelpCircle, section: 'help', alert: true },
  ];

  const handleLogoutClick = () => {
    console.log('handleLogoutClick called');
    toast('Please confirm logout action', {
      style: {
        background: '#6EE7B7',
        color: '#1F2937',
        fontWeight: 'bold',
      },
      duration: 3000,
      position: 'top-right',
    });
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    console.log('handleConfirmLogout called');
    toast.success('Logged out successfully!', {
      style: {
        background: '#34D399',
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      duration: 3000,
      position: 'top-right',
    });
    setShowLogoutConfirmation(false);
    setTimeout(() => {
      console.log('Calling onLogout');
      if (onLogout) {
        onLogout();
        navigate('/farmer-login');
      }
    }, 1000);
  };

  const handleCancelLogout = () => {
    console.log('handleCancelLogout called');
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="flex h-screen bg-green-50">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />

      {/* Sidebar Navigation */}
      <aside className="h-screen fixed top-0 left-0 z-50">
        <nav className="h-full flex flex-col bg-black border-r shadow-sm w-64">
          <div className="p-4 pb-2 flex items-center">
            <Sprout className="h-8 w-8 text-green-500" />
            <span className="text-white text-xl font-bold ml-3">Freshly.lk</span>
          </div>

          <ul className="flex-1 px-3">
            {sidebarItems.map(({ name, icon: Icon, section, alert }) => (
              <NavLink
                key={section}
                to={`/farmer/${section}`}
                className={({ isActive }) => `
                  relative flex items-center py-2 px-3 my-1
                  font-medium rounded-md cursor-pointer
                  transition-colors group
                  ${
                    isActive
                      ? "bg-green-400 text-white"
                      : "hover:bg-green-400 text-white"
                  }
                `}
              >
                <Icon className="mr-2" size={20} />
                <span className="w-52 ml-3">{name}</span>
                {alert && (
                  <div className="absolute right-2 w-2 h-2 rounded bg-green-500" />
                )}
              </NavLink>
            ))}
            <NavLink
              to="#logout"
              onClick={(e) => {
                e.preventDefault();
                handleLogoutClick();
              }}
              className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-green-400 text-white"
            >
              <LogOut className="mr-2" size={20} />
              <span className="w-52 ml-3">Logout</span>
            </NavLink>
          </ul>

          <div className="border-t border-white/10 flex p-3">
            <img
              src={`https://ui-avatars.com/api/?background=22c55e&color=ffffff&bold=true&name=${encodeURIComponent(farmerData?.name || 'Farmer')}`}
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div className="flex justify-between items-center w-52 ml-3">
              <div className="leading-4">
                <h4 className="font-semibold text-white">{farmerData?.name || 'Farmer'}</h4>
                <span className="text-xs text-white/60">{farmerData?.email || 'email@example.com'}</span>
              </div>
              <MoreVertical size={20} className="text-white/60" />
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto ml-64">
        <Outlet />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to log out from Freshly.lk?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;