'use client';

import Link from 'next/link';
import { LayoutDashboard, MessageSquare, MapPin, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminNavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
    { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      {links.map((link) => {
        const isActive = link.href === '/admin' ? pathname === '/admin' : pathname?.startsWith(link.href);
        const Icon = link.icon;
        
        return (
          <Link 
            key={link.href} 
            href={link.href}
            onClick={onClick}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
