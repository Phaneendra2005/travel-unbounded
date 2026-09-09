import { requireAdminAuth } from '@/lib/requireAuth';
import Link from 'next/link';
import { LayoutDashboard, MessageSquare, MapPin, BarChart3 } from 'lucide-react';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-900">TU Admin</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <LayoutDashboard className="mr-3 h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <Link href="/admin/enquiries" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
            Enquiries
          </Link>
          <Link href="/admin/destinations" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <MapPin className="mr-3 h-5 w-5 text-gray-500" />
            Destinations
          </Link>
          <Link href="/admin/analytics" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
            <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
            Analytics
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-3 px-2 truncate">
            {session.email}
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

// Client component for logout button
import LogoutButton from './LogoutButton';
