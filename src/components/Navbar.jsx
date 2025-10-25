"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link 
              href="/login" 
              className="ml-4 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
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
            <Link 
              href="/login" 
              className="block px-4 py-3 text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 mt-2"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Nav Link with left-to-right underline animation
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

// Mobile Nav Link
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