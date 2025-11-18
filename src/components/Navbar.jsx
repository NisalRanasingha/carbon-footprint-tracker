"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    setUser(null);
    setIsUserMenuOpen(false);
    
    window.dispatchEvent(new Event('authChange'));
    
    router.push('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.fullName) return 'U';
    const names = user.fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // Determine dashboard route based on role
  const getDashboardRoute = () => {
    return user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              EcoTrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/calculator">Calculator</NavLink>
            <NavLink href="/tips">Tips</NavLink>
            
            {isLoading ? (
              <div className="ml-4 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${user.role === 'admin' ? 'from-purple-500 to-pink-600' : 'from-green-500 to-emerald-600'} rounded-full flex items-center justify-center text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300`}>
                    {getUserInitials()}
                  </div>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeIn">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                          Administrator
                        </span>
                      )}
                    </div>

                    {/* Menu Items */}
                    <Link
                      href={getDashboardRoute()}
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="ml-4 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            <MobileNavLink href="/calculator">Calculator</MobileNavLink>
            <MobileNavLink href="/tips">Tips</MobileNavLink>
            
            {isLoading ? (
              <div className="px-4 py-3 bg-gray-100 rounded-lg mt-2 animate-pulse">
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              <>
                <div className={`px-4 py-3 ${user.role === 'admin' ? 'bg-purple-50' : 'bg-green-50'} rounded-lg mt-2`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${user.role === 'admin' ? 'from-purple-500 to-pink-600' : 'from-green-500 to-emerald-600'} rounded-full flex items-center justify-center text-white font-semibold`}>
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <MobileNavLink href={getDashboardRoute()}>
                  {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                </MobileNavLink>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-all duration-200 mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block px-4 py-3 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 mt-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-gray-700 font-medium group overflow-hidden"
    >
      <span className="relative z-10 group-hover:text-green-600 transition-colors duration-300">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 group-hover:w-full transition-all duration-300 ease-out"></span>
    </Link>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
    >
      {children}
    </Link>
  );
}

export default Navbar;