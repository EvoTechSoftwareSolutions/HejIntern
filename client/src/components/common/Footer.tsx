import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import logo from "../../assets/footerlogo.png"; 
import footerbg from "../../assets/footerbg.png";

// Text definitions for English and Swedish versions
const footerText = {
  navigationTitle: {
    en: "Navigation",
    sv: "Navigationer",
  },
  navigationLinks: [
    { to: "/", en: "Home", sv: "Hem" },
    { to: "/destinations", en: "Destinations", sv: "Destinationer" },
    { to: "/tours", en: "Tours", sv: "Turer" },
    { to: "/stays", en: "Stays", sv: "Boenden" },
    { to: "/blog", en: "Blog", sv: "Blogg" },
    { to: "/contact", en: "Contact Us", sv: "Kontakta oss" },
  ],
  quickLinksTitle: {
    en: "Quick Links",
    sv: "Snabblänkar",
  },
  quickLinks: [
    { to: "/terms", en: "Terms & Conditions", sv: "Villkor & Förutsättningar" },
    { to: "/privacy", en: "Privacy Policy", sv: "Integritetspolicy" },
    { to: "/faq", en: "FAQ", sv: "Vanliga frågor" },
    { to: "/gallery", en: "Gallery", sv: "Galleri" },
    { to: "/about", en: "About Us", sv: "Om oss" },
  ],
  supportTitle: {
    en: "Support",
    sv: "Support",
  },
  supportLinks: [
    { to: "/help-center", en: "Help Center", sv: "Help Center" },
    { to: "/account", en: "My Hej Ceylon", sv: "Mitt Hej Ceylon" },
    { to: "/favorites", en: "My Favorites", sv: "Mina favoriter" },
    { to: "/my-tours", en: "My Tours", sv: "Mina turer" },
    { to: "/profile", en: "My Profile", sv: "Min profil" },
  ],
  hotlineTitle: {
    en: "Hotline",
    sv: "Hotline",
  },
  contactTitle: {
    en: "Contact Us",
    sv: "Kontakta oss",
  },
  locationTitle: {
    en: "Location",
    sv: "Plats",
  },
  bottomCopy: {
    en: "HejCeylon (PVT) Ltd. | All right reserved 2025",
    sv: "HejCeylon (PVT) Ltd. | Alla rättigheter förbehållna 2025",
  },
  designBy: {
    en: "Design & Develop by Evon Technologies Software Solutions (PVT) Ltd.",
    sv: "Design & Utvecklad av Evon Technologies Software Solutions (PVT) Ltd.",
  },
};

const Footer = () => {
  const location = useLocation();
  const isSwedish = location.pathname.startsWith("/sv");
  const t = (obj: any) => (isSwedish ? obj.sv : obj.en);

  // Helper to prepend language prefix to routes when Swedish
  const prefixed = (path: string) => (isSwedish ? `/sv${path}` : path);

  return (
    <footer className="bg-[#01888E] text-white rounded-t-[40px] flex flex-col pt-12 relative z-10 overflow-hidden">
      {/* Background Pattern with lower opacity */}
      <div 
        className="absolute bottom-14 left-0 w-full h-[380px] bg-bottom bg-no-repeat pointer-events-none opacity-20 z-0"
        style={{ backgroundImage: `url(${footerbg})`, backgroundSize: 'cover' }}
      />
      
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pb-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-5 gap-8 items-start">

          {/* Navigation, Quick Links & Support — right on mobile & tablet */}
          <div className="grid grid-cols-3 gap-x-3 sm:gap-x-4 w-full max-w-md ml-auto md:max-w-none md:ml-0 md:col-span-7 md:col-start-6 md:row-start-1 lg:col-span-3 lg:col-start-auto order-2 lg:order-2">
            <div className="flex flex-col">
              <h3
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className="font-bold text-sm leading-[20px] mb-4 uppercase tracking-wider text-[#E6F3F4]"
              >
                {t(footerText.navigationTitle)}
              </h3>

              <ul className="flex flex-col gap-3 text-[#E6F3F4] text-[13px]">
                {footerText.navigationLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:text-white transition-colors">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-[#E6F3F4]">{t(footerText.quickLinksTitle)}</h3>

              <ul className="flex flex-col gap-3 text-[#E6F3F4] text-[13px]">
                {footerText.quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:text-white transition-colors">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-[#E6F3F4]">{t(footerText.supportTitle)}</h3>

              <ul className="flex flex-col gap-3 text-[#E6F3F4] text-[13px]">
                {footerText.supportLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:text-white transition-colors">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Logo & Description — left on mobile & tablet */}
          <div className="flex flex-col md:col-span-5 md:col-start-1 md:row-start-1 lg:col-span-2 order-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hej Ceylon" className="h-10" />
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Inter' }}>HejCeylon.com</div>
              </div>
            </div>

            <p className="text-[12px] text-white/90 leading-relaxed max-w-[360px] md:max-w-none mb-6" style={{ fontFamily: 'Inter' }}>
              Hej Ceylon, we bring your dream events to life with stunning décor,
              expert planning, and seamless execution. Whether it's a wedding,
              birthday, corporate event, or any special celebration.
            </p>

            <h4 className="font-semibold text-[13px] mb-3 text-white/90" style={{ fontFamily: 'Inter' }}>
              Stay in the loop and sign up for the Wardiere newsletter:
            </h4>

            <div className="flex items-center w-full max-w-[320px] bg-transparent rounded-full border border-white/60 overflow-hidden relative">
              <input
                type="email"
                placeholder={isSwedish ? "Ange din e-post" : "Enter your email"}
                className="flex-1 bg-transparent pl-4 pr-12 py-3 outline-none text-white placeholder:text-white/70 text-[13px]"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white rounded-full text-[#01888E] hover:bg-gray-100 transition shrink-0">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Row: Hotline, Contact Us, Location */}
      <div className="border-t border-white/25 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {/* Hotline */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/80" style={{ fontFamily: 'Inter' }}>
                {t(footerText.hotlineTitle)}
              </h4>
              <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Inter' }}>+94 71 160 2095</span>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/80" style={{ fontFamily: 'Inter' }}>
                {t(footerText.contactTitle)}
              </h4>
              <span className="text-white font-bold text-[14px]" style={{ fontFamily: 'Inter' }}>info@elegantdecos.lk</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 justify-start">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/80" style={{ fontFamily: 'Inter' }}>
                {t(footerText.locationTitle)}
              </h4>
              <span className="text-white font-bold text-[13px] leading-tight block" style={{ fontFamily: 'Inter' }}>
                New Puttalam Rd, Pandulagama, Anuradhapura
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons Row */}
      <div className="border-t border-white/25 py-5 flex justify-center gap-4 relative z-10">
        {/* WhatsApp */}
        <a href="/" className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent text-white hover:bg-white/20 transition">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.78 9.78 0 0 0-6.979-2.882c-5.439 0-9.865 4.372-9.87 9.802 0 1.706.463 3.37 1.34 4.848l-.997 3.642 3.698-.971z"/>
          </svg>
        </a>
        {/* Facebook */}
        <a href="/" className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent text-white hover:bg-white/20 transition">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        {/* Instagram */}
        <a href="/" className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent text-white hover:bg-white/20 transition">
          <svg className="w-5 h-5 fill-none stroke-white stroke-[2]" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        {/* TikTok */}
        <a href="/" className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-transparent text-white hover:bg-white/20 transition">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.42-.43-.61-.67-.02 2.56-.01 5.11-.01 7.67-.01 2.25-.75 4.53-2.3 6.13-1.78 1.87-4.57 2.68-7.04 2.11-2.85-.6-5.18-3.08-5.32-6-.2-3.86 2.82-7.39 6.67-7.55v4.02c-1.89.07-3.41 1.66-3.32 3.55.07 1.68 1.48 3.03 3.16 3.01 1.75-.02 3.15-1.52 3.08-3.27.02-5.04.01-10.08.01-15.11z"/>
          </svg>
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white text-[#0F172A] h-14 flex items-center relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full px-6 text-[11px] sm:text-xs">
          <p>© <strong>{t(footerText.bottomCopy)}</strong></p>

          <p className="mt-2 md:mt-0">{t(footerText.designBy)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;