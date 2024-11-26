import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Show simplified navbar on specific pages
  const simplifiedNavbarPaths = ['/register', '/documents', '/consultation'];
  const isSimplifiedNavbar = simplifiedNavbarPaths.includes(location.pathname);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (isSimplifiedNavbar) {
    return (
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Building2 className="h-8 w-8 text-coral-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">LINTAR GROUP</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-coral-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">LINTAR GROUP</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#about" className="text-gray-600 hover:text-coral-600">About Us</Link>
            <Link to="/#services" className="text-gray-600 hover:text-coral-600">Services</Link>
            <Link to="/#locations" className="text-gray-600 hover:text-coral-600">Locations</Link>
            <Link to="/#contact" className="text-gray-600 hover:text-coral-600">Contact</Link>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center px-4 py-2 rounded-lg border-2 border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white transition-colors duration-200"
            >
              Log In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-coral-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-coral-500 hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
            <Link
              to="/#services"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-coral-500 hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Services
            </Link>
            <Link
              to="/#locations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-coral-500 hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Locations
            </Link>
            <Link
              to="/#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-coral-500 hover:bg-gray-50"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                navigate('/login');
                closeMobileMenu();
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-coral-500 hover:bg-coral-50"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}