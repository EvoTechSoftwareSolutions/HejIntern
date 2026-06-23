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
    en: "HejCeylon (PVT) Ltd. | All rights reserved 2025",
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
  const t = (obj) => (isSwedish ? obj.sv : obj.en);

  // Helper to prepend language prefix to routes when Swedish
  const prefixed = (path) => (isSwedish ? `/sv${path}` : path);

  return (
    <footer className="bg-[#01888E] text-white rounded-t-[40px] flex flex-col pt-8 relative z-10 overflow-hidden">
      {/* Background Pattern with lower opacity */}
      <div 
        className="absolute bottom-14 left-0 w-full h-[300px] bg-bottom bg-no-repeat pointer-events-none opacity-20"
        style={{ backgroundImage: `url(${footerbg})`, backgroundSize: '100% 300px' }}
      />
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6 pb-12 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start relative z-10">
          
          {/* Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hej Ceylon" className="h-10" />
              <div>
                <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Inter' }}>HejCeylon.com</div>
              </div>
            </div>

            <p className="text-[12px] text-white/90 leading-relaxed mb-6" style={{ fontFamily: 'Inter' }}>
              Hej Ceylon, we bring your dream events to life with stunning décor,
              expert planning, and seamless execution. Whether it's a wedding,
              birthday, corporate event, or any special celebration.
            </p>

            <h4 className="font-semibold text-[13px] mb-3 text-white/90" style={{ fontFamily: 'Inter' }}>Stay in the loop and sign up for the Wardiere newsletter:</h4>

            {/* Newsletter */}
            <div className="flex items-center w-full max-w-sm bg-transparent rounded-full border border-white overflow-hidden mb-6">
              <input
                type="email"
                placeholder=""
                className="flex-1 bg-transparent pl-4 py-2.5 outline-none text-white placeholder:text-white/70 text-sm"
              />
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-[#01888E] mr-1 transition hover:bg-gray-100">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {['wa', 'fb', 'ig', 'tt'].map((item, index) => (
                <a
                  key={index}
                  href="/"
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center bg-transparent text-white hover:bg-white/20 transition"
                >
                  {item === 'wa' ? '✓' : item === 'fb' ? 'f' : item === 'ig' ? '◯' : '♪'}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col ">
            <h3
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="font-bold text-sm leading-[20px] mb-3 uppercase tracking-wide text-[#E6F3F4] w-[99px] h-[20px]"
            >
              {t(footerText.navigationTitle)}
            </h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              {footerText.navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link to={prefixed(link.to)}>{t(link)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-3 uppercase tracking-wide">{t(footerText.quickLinksTitle)}</h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              {footerText.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={prefixed(link.to)}>{t(link)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-3 uppercase tracking-wide">{t(footerText.supportTitle)}</h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              {footerText.supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={prefixed(link.to)}>{t(link)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            {/* Hotline */}
            <h3 className="font-bold text-sm mb-2 uppercase">{t(footerText.hotlineTitle)}</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0">
                <Phone size={16} />
              </div>
              <span className="text-[#E6F3F4] text-xs">+94 71 160 2095</span>
            </div>

            {/* Contact */}
            <h3 className="font-bold text-sm mb-2 uppercase">{t(footerText.contactTitle)}</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0">
                <Mail size={16} />
              </div>

              <span className="text-[#E6F3F4] text-xs">info@elegantdeco.lk</span>
            </div>

            {/* Location */}
            <h3 className="font-bold text-sm mb-2 uppercase">{t(footerText.locationTitle)}</h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </div>

              <span className="text-[#E6F3F4] text-xs">
                New Puttalam Rd,
                <br />
                Pandulagama,
                <br />
                Anuradhapura
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white text-[#0F172A] h-14 flex items-center relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full px-6 text-[11px] sm:text-xs">
          <p>© <strong>{footerText.bottomCopy[isSwedish ? "sv" : "en"]}</strong></p>

          <p className="mt-2 md:mt-0">{footerText.designBy[isSwedish ? "sv" : "en"]}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;