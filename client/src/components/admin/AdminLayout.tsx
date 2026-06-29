import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Hotel,
  LogOut,
  Menu,
  Globe,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'Tour Packages', icon: MapPin, to: '/admin/tours' },
  { label: 'Stays', icon: Hotel, to: '/admin/stays' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`${mobile ? 'flex' : 'hidden lg:flex'} flex-col w-64 bg-[#003032] text-white min-h-screen`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-[#01888E] rounded-lg flex items-center justify-center">
          <Globe size={18} className="text-white" />
        </div>
        <div>
          <div className="text-[15px] font-bold text-white">HejCeylon</div>
          <div className="text-[10px] text-white/50 font-normal">Admin Panel</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                active
                  ? 'bg-[#01888E] text-white shadow-[0_4px_14px_rgba(1,136,142,0.4)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#01888E]/30 flex items-center justify-center text-[#01888E] font-bold text-[13px]">
            {user.email?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <div className="text-[12px] font-semibold text-white truncate max-w-[140px]">{user.email ?? 'Admin'}</div>
            <div className="text-[10px] text-white/40">Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[12px] text-white/50 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={14} />
          Log out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F6FA]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <Sidebar mobile />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-[#01888E] transition-colors"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-[18px] font-bold text-[#003032]">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-[12px] text-[#01888E] font-medium hover:underline">
              View Site ↗
            </a>
            <div className="w-8 h-8 rounded-full bg-[#01888E] flex items-center justify-center text-white font-bold text-[13px]">
              {user.email?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
