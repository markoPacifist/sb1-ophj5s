import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  LogOut,
  Menu,
  X,
  Home,
  UserCheck
} from 'lucide-react';
import AvailableClients from '../components/manager/AvailableClients';
import MyClients from '../components/manager/MyClients';

const menuItems = [
  {
    id: 'available',
    label: 'Available Clients',
    icon: <Users className="h-5 w-5" />
  },
  {
    id: 'my-clients',
    label: 'My Clients',
    icon: <UserCheck className="h-5 w-5" />
  }
];

export default function ManagerPanel() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('available');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleLogout = () => navigate('/');

  const renderContent = () => {
    switch (activeSection) {
      case 'available':
        return <AvailableClients />;
      case 'my-clients':
        return <MyClients />;
      default:
        return <AvailableClients />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden mr-2 p-2 rounded-md text-gray-600 hover:text-coral-500 hover:bg-gray-100"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <Building2 className="h-8 w-8 text-coral-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">LINTAR GROUP</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-coral-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Layout */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:z-0 overflow-y-auto`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      closeSidebar();
                    }}
                    className={`w-full flex items-center px-4 py-2 rounded-lg text-sm ${
                      activeSection === item.id
                        ? 'bg-coral-50 text-coral-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}