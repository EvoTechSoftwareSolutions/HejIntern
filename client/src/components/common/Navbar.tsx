import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Heart, LogOut, Bell, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import usa from '../../assets/usa.png';
import sweden from '../../assets/sweden.svg';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen]   = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location     = useLocation();
  const isSwedish    = location.pathname.startsWith('/sv');

  const navText = {
    myAccount:    isSwedish ? 'Min Hej Ceylon'  : 'My Hej Ceylon',
    myWishlist:   isSwedish ? 'Mina Önskade'    : 'My Wishlist',
    logout:       isSwedish ? 'Logga ut'        : 'Logout',
    home:         isSwedish ? 'HEM'             : 'HOME',
    tours:        isSwedish ? 'RESOR'           : 'TOURS',
    destinations: isSwedish ? 'DESTINATIONER'   : 'DESTINATIONS',
    stays:        isSwedish ? 'VISTELSER'       : 'STAYS',
    blog:         isSwedish ? 'BLOGG'           : 'BLOG',
    contactUs:    isSwedish ? 'KONTAKTA OSS'    : 'CONTACT US',
    gallery:      isSwedish ? 'GALLERI'         : 'GALLERY',
  };

  const navLinks = [
    { to: '/',                                        label: navText.home         },
    { to: isSwedish ? '/sv/tours'        : '/tours',        label: navText.tours        },
    { to: isSwedish ? '/sv/destinations' : '/destinations', label: navText.destinations },
    { to: isSwedish ? '/sv/stays'        : '/stays',        label: navText.stays        },
    { to: isSwedish ? '/sv/blog'         : '/blog',         label: navText.blog         },
    { to: isSwedish ? '/sv/contact'      : '/contact',      label: navText.contactUs    },
    { to: isSwedish ? '/sv/gallery'      : '/gallery',      label: navText.gallery      },
  ];

  // Close account dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        e.target instanceof Node &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLogout  = () => { console.log('Logout clicked');    setIsDropdownOpen(false); };
  const handleWishlist = () => { console.log('Wishlist clicked'); setIsDropdownOpen(false); };

  const isLinkActive = (to: string) =>
    location.pathname === to ||
    (to !== '/' && location.pathname.startsWith(to.replace('/sv', '')));

  return (
    <header className="absolute top-0 left-0 w-full z-50 font-sans">

      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#E6F3F4] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-3 sm:gap-4 text-[12px] font-medium text-[#003032] h-6">

          {/* Account dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="hidden xs:inline sm:inline">{navText.myAccount}</span>
              <span className="inline xs:hidden sm:hidden">Account</span>
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] py-2 z-50">
                <button
                  onClick={handleWishlist}
                  className="w-full px-4 py-2 text-left text-sm text-dark hover:bg-secondary flex items-center gap-2 transition-colors"
                >
                  <Heart size={16} />
                  {navText.myWishlist}
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  {navText.logout}
                </button>
              </div>
            )}
          </div>

          {/* Notification bell */}
          <div className="relative cursor-pointer flex items-center hover:opacity-80 transition-opacity">
            <Bell size={16} className="text-[#003032] fill-[#003032]" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold shadow-sm">
              1
            </span>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-[#003032]/30 mx-1" />

          {/* Language flags */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={usa}
                alt="USA"
                className={`w-[22px] h-[22px] object-cover rounded-full transition-all cursor-pointer ${
                  !isSwedish
                    ? 'border-2 border-[#01888E] shadow-sm scale-105 z-10'
                    : 'opacity-70 hover:opacity-100 border-2 border-transparent'
                }`}
              />
            </Link>
            <Link to="/sv" className="flex items-center justify-center">
              <img
                src={sweden}
                alt="Sweden"
                className={`w-[22px] h-[22px] object-cover rounded-full transition-all cursor-pointer ${
                  isSwedish
                    ? 'border-2 border-[#01888E] shadow-sm scale-105 z-10'
                    : 'opacity-70 hover:opacity-100 border-2 border-transparent'
                }`}
              />
            </Link>
          </div>

        </div>
      </div>

      {/* ── Main nav bar ───────────────────────────────────────────────── */}
      <div className="w-full bg-[#f0f0f0]/30 backdrop-blur-[7.5px] shadow-[0_4px_24px_rgba(0,0,0,0.05)] border-b border-white/60 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[75px] md:h-[85px] relative flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center z-20 shrink-0">
            <img src={logo} alt="Hej Ceylon" className="h-9 md:h-12 object-contain" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.12em] lg:tracking-[0.15em] text-[#003032] z-10 ml-auto mr-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors pb-1 whitespace-nowrap ${
                  isLinkActive(link.to)
                    ? 'text-[#01888E] border-b-[3px] border-[#01888E]'
                    : 'hover:text-[#01888E] text-[#003032] border-b-[3px] border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: hamburger / close button */}
          <div className="flex items-center z-20 md:hidden">
            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="text-[#003032] p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile slide-down menu ─────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[300px] bg-white shadow-2xl z-40 md:hidden
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#E6F3F4]">
          <img src={logo} alt="Hej Ceylon" className="h-8 object-contain" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#003032] p-1.5 hover:bg-white/60 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center w-full px-4 py-3.5 rounded-[10px] mb-1 font-bold text-[13px] tracking-[0.12em] uppercase transition-colors ${
                isLinkActive(link.to)
                  ? 'bg-[#01888E]/10 text-[#01888E] border-l-[3px] border-[#01888E]'
                  : 'text-[#003032] hover:bg-gray-50 border-l-[3px] border-transparent'
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Panel footer: account actions */}
        <div className="border-t border-gray-100 px-4 py-4 space-y-2">
          <button
            onClick={() => { handleWishlist(); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-[#003032] hover:bg-gray-50 transition-colors text-[14px] font-medium"
          >
            <Heart size={18} className="text-[#01888E]" />
            {navText.myWishlist}
          </button>
          <button
            onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-red-600 hover:bg-red-50 transition-colors text-[14px] font-medium"
          >
            <LogOut size={18} />
            {navText.logout}
          </button>

          {/* Language switcher */}
          <div className="flex items-center gap-3 px-4 pt-2">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center">
              <img
                src={usa}
                alt="English"
                className={`w-[26px] h-[26px] object-cover rounded-full transition-all ${
                  !isSwedish
                    ? 'border-2 border-[#01888E] scale-105'
                    : 'opacity-60 hover:opacity-100 border-2 border-transparent'
                }`}
              />
            </Link>
            <Link to="/sv" onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center">
              <img
                src={sweden}
                alt="Swedish"
                className={`w-[26px] h-[26px] object-cover rounded-full transition-all ${
                  isSwedish
                    ? 'border-2 border-[#01888E] scale-105'
                    : 'opacity-60 hover:opacity-100 border-2 border-transparent'
                }`}
              />
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;