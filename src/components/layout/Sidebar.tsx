'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  FileText,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Job Listings', href: '/dashboard', icon: Home },
  { name: 'My Applications', href: '/applications', icon: Briefcase },
  { name: 'Resume Customization', href: '/resume', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col bg-black/40 backdrop-blur-xl z-10">
      <div className="flex h-16 shrink-0 items-center px-6">
        <h1 className="text-2xl font-bold text-white">TalentTrek Jobs</h1>
      </div>
      
      {/* User information section */}
      {user && (
        <div className="px-6 py-4 flex items-center text-white/90 border-b border-white/10">
          <User className="h-5 w-5 mr-2" />
          <div className="truncate">
            <p className="text-sm font-medium">Signed in as:</p>
            <p className="text-sm font-bold truncate">{user.name || user.email}</p>
          </div>
        </div>
      )}
      
      <nav className="flex flex-1 flex-col px-4 py-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10',
                      'group flex gap-x-3 rounded-ios p-2 text-sm font-semibold leading-6 transition-all duration-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-6 w-6 shrink-0",
                        pathname === item.href
                          ? 'text-primary'
                          : 'text-white/70 group-hover:text-white'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* Sign out button as a list item right after the navigation items */}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left group flex gap-x-3 rounded-ios p-2 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <LogOut
                    className="h-6 w-6 shrink-0 text-white/70 group-hover:text-white"
                    aria-hidden="true"
                  />
                  Sign Out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
} 