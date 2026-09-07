'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, PlaneTakeoff } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Plan Your Trip', href: '/contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-50 top-0 left-0 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <PlaneTakeoff className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Travel <span className="text-blue-600">Unbounded</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg" id="mobile-menu">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
