import { Link } from 'react-router-dom';
import { ChevronDown, Menu, Heart, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import usa from '../../assets/usa.png';
import sweden from '../../assets/sweden.svg';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="w-full bg-secondary py-1 px-4 sm:px-8 opacity-90">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-4 text-xs font-medium text-dark h-6">
          
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>My Hej Ceylon</span>
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              <div className="w-4 h-4 bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] ml-1 font-bold shadow-sm">1</div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] py-2 z-50">
                <button
                  onClick={handleWishlist}
                  className="w-full px-4 py-2 text-left text-sm text-dark hover:bg-secondary flex items-center gap-2 transition-colors"
                >
                  <Heart size={16} />
                  My Wishlist
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-dark/30 mx-1"></div>

          <div className="flex items-center gap-2">
            <img src={usa} alt="USA" className="w-4 h-4 object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity shadow-sm" />
            <img src={sweden} alt="Sweden" className="w-4 h-4 object-cover rounded-full cursor-pointer hover:opacity-80 transition-opacity shadow-sm" />
          </div>

        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Hej Ceylon" className="h-16 md:h-20 object-contain drop-shadow-md" />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold tracking-wide text-dark">
          <Link to="/" className="text-primary hover:text-primary-dark transition-colors">HOME</Link>
          <Link to="/tours" className="hover:text-primary transition-colors">TOURS</Link>
          <Link to="/destinations" className="hover:text-primary transition-colors">DESTINATIONS</Link>
          <Link to="/stays" className="hover:text-primary transition-colors">STAYS</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">BLOG</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">CONTACT US</Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">GALLERY</Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-dark p-2 hover:bg-secondary rounded-lg transition-colors drop-shadow-md">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
