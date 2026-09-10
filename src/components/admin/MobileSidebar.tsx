'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import AdminNavLinks from './AdminNavLinks';
import LogoutButton from '@/app/admin/(dashboard)/LogoutButton';

export default function MobileSidebar({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16 w-full shrink-0">
        <span className="text-xl font-bold text-blue-900">TU Admin</span>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer & Backdrop */}
      {isOpen && (
        <div className="md:hidden relative z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-0 flex">
            <div className="relative flex w-full max-w-xs flex-col bg-white pt-5 pb-4 shadow-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              <div className="flex shrink-0 items-center px-4 mb-4">
                <span className="text-xl font-bold text-blue-900">TU Admin</span>
              </div>
              
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <AdminNavLinks onClick={() => setIsOpen(false)} />
              </div>

              <div className="p-4 border-t border-gray-200 shrink-0">
                <div className="text-xs text-gray-500 mb-3 px-2 truncate">
                  {email}
                </div>
                <LogoutButton />
              </div>
            </div>
            {/* Dummy div to force remaining width to not be clickable by the panel */}
            <div className="w-14 shrink-0" aria-hidden="true"></div>
          </div>
        </div>
      )}
    </>
  );
}
