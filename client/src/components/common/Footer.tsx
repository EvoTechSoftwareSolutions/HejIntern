import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

import logo from "../../assets/footerlogo.png";
import footerbg from "../../assets/footerbg.png";

// Inline SVG social icons (not available in this version of lucide-react)
const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3v1.54h2.2l-.35 2.9h-1.85v7A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.33 6.33 0 0 0 6.31-6.24V8.15a8.32 8.32 0 0 0 4.31 1.78V6.44a4.83 4.83 0 0 1-2.29-.6z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="relative text-white rounded-t-[40px] overflow-hidden flex flex-col" style={{ backgroundColor: '#01888E' }}>

      {/* Background image overlay - bottom section only */}
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: '60%',
          backgroundImage: `url(${footerbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.22,
        }}
      />

      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-10 relative z-10 w-full flex-1">

        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-4 xl:gap-10">

          {/* Logo & Description */}
          <div className="flex flex-col max-w-[420px]">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hej Ceylon" className="h-[38px]" />
              <div className="text-white font-bold text-[22px] tracking-wide" style={{ fontFamily: 'Inter' }}>HejCeylon.com</div>
            </div>

            <p className="text-[13px] text-white leading-[22px] mb-6" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Hej Ceylon</span>, we bring your dream events to life with stunning décor,
              expert planning, and seamless execution. Whether it's a wedding,
              birthday, corporate event, or any special celebration.
            </p>

            <h4 className="font-bold text-[13px] mb-3" style={{ fontFamily: 'Inter' }}>Stay in the loop and sign up for the Wardiere newsletter:</h4>

            {/* Newsletter */}
            <div className="flex items-center w-full max-w-[360px] bg-transparent rounded-full border-[1.5px] border-white overflow-hidden mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent pl-5 py-2 outline-none text-white placeholder:text-white/90 text-[14px]"
                style={{ fontFamily: 'Inter' }}
              />
              <button className="w-[34px] h-[34px] flex items-center justify-center bg-white rounded-full m-1 text-[#1C9A9A] hover:bg-gray-100 transition shrink-0">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-8 sm:gap-16 lg:gap-16 xl:gap-24 pt-2">

            {/* Navigation */}
            <div className="flex flex-col">
              <h3 className="font-bold text-[13px] mb-5 uppercase tracking-wider text-white" style={{ fontFamily: 'Inter' }}>Navigations</h3>
              <ul className="flex flex-col gap-4 text-white text-[13px] font-medium" style={{ fontFamily: 'Inter' }}>
                <li><Link to="/" className="hover:text-white/80 transition-colors">Home</Link></li>
                <li><Link to="/destinations" className="hover:text-white/80 transition-colors">Destinations</Link></li>
                <li><Link to="/tours" className="hover:text-white/80 transition-colors">Tours</Link></li>
                <li><Link to="/stays" className="hover:text-white/80 transition-colors">Stays</Link></li>
                <li><Link to="/blog" className="hover:text-white/80 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white/80 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="font-bold text-[13px] mb-5 uppercase tracking-wider text-white" style={{ fontFamily: 'Inter' }}>Quick Links</h3>
              <ul className="flex flex-col gap-4 text-white text-[13px] font-medium" style={{ fontFamily: 'Inter' }}>
                <li><Link to="/terms" className="hover:text-white/80 transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/faq" className="hover:text-white/80 transition-colors">FAQ</Link></li>
                <li><Link to="/gallery" className="hover:text-white/80 transition-colors">Gallery</Link></li>
                <li><Link to="/about" className="hover:text-white/80 transition-colors">About Us</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col">
              <h3 className="font-bold text-[13px] mb-5 uppercase tracking-wider text-white" style={{ fontFamily: 'Inter' }}>Support</h3>
              <ul className="flex flex-col gap-4 text-white text-[13px] font-medium" style={{ fontFamily: 'Inter' }}>
                <li><Link to="/help-center" className="hover:text-white/80 transition-colors">Help Center</Link></li>
                <li><Link to="/account" className="hover:text-white/80 transition-colors">My Hej Ceylon</Link></li>
                <li><Link to="/favorites" className="hover:text-white/80 transition-colors">My Favorites</Link></li>
                <li><Link to="/my-tours" className="hover:text-white/80 transition-colors">My Tours</Link></li>
                <li><Link to="/profile" className="hover:text-white/80 transition-colors">My Profile</Link></li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="border-white/30 mt-10 mb-8" />

        {/* Bottom Info Row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start">

          {/* Hotline */}
          <div className="flex flex-col">
            <h3 className="font-bold text-[13px] mb-4 uppercase text-white tracking-wider" style={{ fontFamily: 'Inter' }}>Hotline</h3>
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white fill-white" />
              </div>
              <span className="text-white text-[14px] font-medium" style={{ fontFamily: 'Inter' }}>+94 71 160 2095</span>
            </div>
          </div>

          {/* Contact Us & Socials */}
          <div className="flex flex-col items-start md:ml-12 lg:ml-24">
            <h3 className="font-bold text-[13px] mb-4 uppercase text-white tracking-wider" style={{ fontFamily: 'Inter' }}>Contact Us</h3>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white fill-white" />
              </div>
              <span className="text-white text-[14px] font-medium" style={{ fontFamily: 'Inter' }}>info@elegantdecos.lk</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1C9A9A] transition">
                <WhatsAppIcon size={16} />
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1C9A9A] transition">
                <FacebookIcon size={16} />
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1C9A9A] transition">
                <InstagramIcon size={16} />
              </a>
              <a href="#" className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1C9A9A] transition">
                <TikTokIcon size={16} />
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-start">
            <div className="w-full text-left">
              <h3 className="font-bold text-[13px] mb-4 uppercase text-white tracking-wider" style={{ fontFamily: 'Inter' }}>Location</h3>
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full border-[1.5px] border-white flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-white text-[14px] leading-relaxed font-medium" style={{ fontFamily: 'Inter' }}>
                  New Puttalam Rd,<br />
                  Pandulagama, Anuradhapura
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-white text-[#0F172A] min-h-[52px] py-3 flex items-center relative z-20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center w-full px-6 text-[12px] text-center md:text-left gap-2 md:gap-0" style={{ fontFamily: 'Inter' }}>
          <p><span className="font-bold text-[#4B5563]">© HejCeylon (PVT) Ltd.</span> | All right reserved 2025</p>
          <p className="mt-1 md:mt-0 text-[#4B5563]">Design & Develop by <span className="font-bold text-[#1F2937]">Evon Technologies Software Solutions (PVT) Ltd.</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;