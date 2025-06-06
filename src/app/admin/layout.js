'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaBoxOpen,
    FaMask,
    FaStream,
  } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/admin',
      icon: <FaStream/>
    },
    {
      id: 'products',
      name: 'Products',
      href: '/admin/products',
      icon: <FaBoxOpen/>
    },
    {
      id: 'users',
      name: 'Users',
      href: '/admin/users',
      icon: <FaMask/>
    }
  ];

  const isActiveRoute = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1C1C1C] shadow-lg min-h-screen">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                <p className="text-[#1ceff4]">Manage your thieves and stolen stuff.</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left group ${
                  isActiveRoute(item.href)
                    ? 'bg-[#1ceff4] bg-opacity-20 text-black border border-cyan-500 border-opacity-30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className={`transition-colors ${
                  isActiveRoute(item.href) ? 'text-black' : 'text-gray-400 group-hover:text-gray-300'
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}