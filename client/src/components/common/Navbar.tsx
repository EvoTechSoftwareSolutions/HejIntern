import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Heart, LogOut, Bell } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import usa from '../../assets/usa.png';
import sweden from '../../assets/sweden.svg';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isSwedish = location.pathname.startsWith('/sv');

  const navText = {
    myAccount: isSwedish ? 'Min Hej Ceylon' : 'My Hej Ceylon',
    myWishlist: isSwedish ? 'Mina Önskade' : 'My Wishlist',
    logout: isSwedish ? 'Logga ut' : 'Logout',
    home: isSwedish ? 'HEM' : 'HOME',
    tours: isSwedish ? 'RESOR' : 'TOURS',
    destinations: isSwedish ? 'DESTINATIONER' : 'DESTINATIONS',
    stays: isSwedish ? 'VISTELSER' : 'STAYS',
    blog: isSwedish ? 'BLOGG' : 'BLOG',
    contactUs: isSwedish ? 'KONTAKTA OSS' : 'CONTACT US',
    gallery: isSwedish ? 'GALLERI' : 'GALLERY',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    setIsDropdownOpen(false);
  };

  const handleWishlist = () => {
    // Add navigation to wishlist
    console.log('Wishlist clicked');
    setIsDropdownOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 font-sans">
      {/* Top Bar */}
      <div className="w-full bg-[#E6F3F4] py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4 text-[12px] font-medium text-[#003032] h-6">
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-1 cursor-pointer hover:text-[#01888E] transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{navText.myAccount}</span>
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] py-2 z-50">
                <button
                  onClick={handleWishlist}
                  className="w-full px-4 py-2 text-left text-sm text-[#003032] hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <Heart size={16} />
                  {navText.myWishlist}
                </button>
                <div className="border-t border-gray-200 my-1"></div>
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

          {/* Notification Bell */}
          <div className="relative cursor-pointer flex items-center hover:opacity-80 transition-opacity">
            <Bell size={16} className="text-[#003032] fill-[#003032]" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] font-bold shadow-sm">
              1
            </span>
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-[#003032]/30 mx-1"></div>

          {/* Language Flags */}
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

      {/* Main Navigation */}
      <div className="w-full bg-gradient-to-b from-black/20 to-transparent border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Hej Ceylon" className="h-16 md:h-16 object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold tracking-wide text-[#003032]">
          <Link to="/" className="text-[#01888E] border-b-2 border-[#01888E] pb-[2px] transition-colors">{navText.home}</Link>
          <Link to={isSwedish ? "/sv/tours" : "/tours"} className="hover:text-[#01888E] transition-colors">{navText.tours}</Link>
          <Link to={isSwedish ? "/sv/destinations" : "/destinations"} className="hover:text-[#01888E] transition-colors">{navText.destinations}</Link>
          <Link to={isSwedish ? "/sv/stays" : "/stays"} className="hover:text-[#01888E] transition-colors">{navText.stays}</Link>
          <Link to={isSwedish ? "/sv/blog" : "/blog"} className="hover:text-[#01888E] transition-colors">{navText.blog}</Link>
          <Link to={isSwedish ? "/sv/contact" : "/contact"} className="hover:text-[#01888E] transition-colors">{navText.contactUs}</Link>
          <Link to={isSwedish ? "/sv/gallery" : "/gallery"} className="hover:text-[#01888E] transition-colors">{navText.gallery}</Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#003032] p-2 hover:bg-white/20 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
      </div>
      </div>
    </header>
  );
};

export default Navbar;
