import { requireAdminAuth } from '@/lib/requireAuth';
import AdminNavLinks from '@/components/admin/AdminNavLinks';
import MobileSidebar from '@/components/admin/MobileSidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminAuth();

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
      {/* Mobile Navbar/Drawer */}
      <MobileSidebar email={session.email} />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <span className="text-xl font-bold text-blue-900">TU Admin</span>
        </div>
        
        <AdminNavLinks />

        <div className="p-4 border-t border-gray-200 shrink-0">
          <div className="text-xs text-gray-500 mb-3 px-2 truncate">
            {session.email}
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 min-w-0">
        {children}
      </main>
    </div>
  );
}

// Client component for logout button
import LogoutButton from './LogoutButton';
