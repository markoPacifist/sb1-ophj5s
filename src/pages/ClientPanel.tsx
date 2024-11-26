import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  X, 
  Menu, 
  Home,
  MessageSquare,
  FileText,
  Video,
  LogOut
} from 'lucide-react';
import HomeContent from '../components/HomeContent';
import AIAssistantContent from '../components/AIAssistantContent';
import DocumentsContent from '../components/DocumentsContent';
import VideoTutorialsContent from '../components/VideoTutorialsContent';

const menuItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="h-5 w-5" />
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText className="h-5 w-5" />,
    badge: '3'
  },
  {
    id: 'video-tutorials',
    label: 'Video Tutorials',
    icon: <Video className="h-5 w-5" />
  }
];

export default function ClientPanel() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const handleLogout = () => navigate('/');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeContent />;
      case 'ai-assistant':
        return <AIAssistantContent />;
      case 'documents':
        return <DocumentsContent />;
      case 'video-tutorials':
        return <VideoTutorialsContent />;
      default:
        return <HomeContent />;
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
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm ${
                      activeSection === item.id
                        ? 'bg-coral-50 text-coral-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-coral-500 text-white px-2 py-1 rounded-full text-xs">
                        {item.badge}
                      </span>
                    )}
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