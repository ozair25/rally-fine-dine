import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Utensils, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Menu', path: '/admin/menu', icon: Utensils },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-brand-surface border-r border-white/5 min-h-screen flex flex-col">
      <div className="p-10 border-b border-white/5">
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">Admin <span className="text-brand-orange">Panel</span></h2>
      </div>
      <nav className="flex-1 py-8">
        {adminLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "flex items-center px-10 py-4 text-xs font-black uppercase tracking-widest transition-all",
              location.pathname === link.path 
                ? "bg-brand-orange text-white" 
                : "text-neutral-500 hover:text-white hover:bg-white/5"
            )}
          >
            <link.icon className="mr-4" size={18} />
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="p-8 border-t border-white/5">
        <button 
          onClick={() => auth.signOut()}
          className="flex items-center text-xs font-black uppercase tracking-widest text-neutral-500 hover:text-brand-red transition-colors w-full"
        >
          <LogOut className="mr-4" size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
