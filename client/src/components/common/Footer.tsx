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
    en: "NAVIGATIONS",
    sv: "NAVIGATIONER",
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
    en: "QUICK LINKS",
    sv: "SNABBLÄNKAR",
  },
  quickLinks: [
    { to: "/terms", en: "Terms & Conditions", sv: "Villkor & Förutsättningar" },
    { to: "/privacy", en: "Privacy Policy", sv: "Integritetspolicy" },
    { to: "/faq", en: "FAQ", sv: "Vanliga frågor" },
    { to: "/gallery", en: "Gallery", sv: "Galleri" },
    { to: "/about", en: "About Us", sv: "Om oss" },
  ],
  supportTitle: {
    en: "SUPPORT",
    sv: "SUPPORT",
  },
  supportLinks: [
    { to: "/help-center", en: "Help Center", sv: "Hjälpcenter" },
    { to: "/account", en: "My Hej Ceylon", sv: "Mitt Hej Ceylon" },
    { to: "/favorites", en: "My Favorites", sv: "Mina favoriter" },
    { to: "/my-tours", en: "My Tours", sv: "Mina resor" },
    { to: "/profile", en: "My Profile", sv: "Min profil" },
  ],
  hotlineTitle: {
    en: "HOTLINE",
    sv: "HOTLINE",
  },
  contactTitle: {
    en: "CONTACT US",
    sv: "KONTAKTA OSS",
  },
  locationTitle: {
    en: "LOCATION",
    sv: "PLATS",
  },
  bottomCopy: {
    en: "© HejCeylon (PVT) Ltd. | All right reserved 2025",
    sv: "© HejCeylon (PVT) Ltd. | Alla rättigheter förbehållna 2025",
  },
};

// WhatsApp custom icon
const WhatsAppIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// TikTok custom icon
const TiktokIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.33 6.33 0 0 0 6.31-6.24V8.15a8.32 8.32 0 0 0 4.31 1.78V6.44a4.83 4.83 0 0 1-2.29-.6z"/>
  </svg>
);

// Simple Facebook icon (SVG)
const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3v1.54h2.2l-.35 2.9h-1.85v7A10 10 0 0 0 22 12z" />
  </svg>
);

// Simple Instagram icon (SVG)
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm6.6-3.1a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1zM12 10.2A1.8 1.8 0 1 1 10.2 12 1.8 1.8 0 0 1 12 10.2z" />
  </svg>
);

const Footer = () => {
  const location = useLocation();
  const isSwedish = location.pathname.startsWith("/sv");
  const t = (obj: any) => (isSwedish ? obj.sv : obj.en);

  // Helper to prepend language prefix to routes when Swedish
  const prefixed = (path: string) => (isSwedish ? `/sv${path}` : path);

  return (
    <footer className="relative bg-[#01888E] text-white rounded-t-[40px] overflow-hidden flex flex-col font-sans">
      {/* Background Image Overlay */}
      <div
        className="absolute left-0 right-0 z-0 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${footerbg})`, backgroundSize: 'auto 160px', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', opacity: 0.10, height: '160px', top: '38%' }}
      />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 pt-12 pb-6 flex flex-col h-full">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column - Description & Newsletter */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hej Ceylon" className="h-[40px]" />
              <div className="text-white font-bold text-[20px]">HejCeylon.com</div>
            </div>

            <p className="text-[14px] text-white/90 leading-[22px] mb-6">
              <span className="font-bold">Hej Ceylon</span>, we bring your dream events to life with stunning
              décor, expert planning, and seamless execution. Whether it's
              a wedding, birthday, corporate event, or any special
              celebration.
            </p>

            <h4 className="font-semibold text-[13px] mb-3">Stay in the loop and sign up for the Wardiere newsletter:</h4>

            {/* Newsletter */}
            <div className="flex items-center w-full max-w-[360px] bg-transparent rounded-full border border-white/30 overflow-hidden mb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent pl-4 py-3 outline-none text-white placeholder:text-white/80 text-[14px]"
              />
              <button className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#01888E] mr-2 shadow-sm">
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="lg:col-span-7 flex flex-wrap justify-between gap-6 lg:pl-4">
            
            {/* Navigations */}
            <div className="flex flex-col min-w-[120px]">
              <h3 className="font-bold text-[14px] mb-4 text-white">
                {t(footerText.navigationTitle)}
              </h3>
              <ul className="flex flex-col gap-3 text-white/90 text-[14px]">
                {footerText.navigationLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:underline">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col min-w-[140px]">
              <h3 className="font-bold text-[14px] mb-4 text-white">
                {t(footerText.quickLinksTitle)}
              </h3>
              <ul className="flex flex-col gap-3 text-white/90 text-[14px]">
                {footerText.quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:underline">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="flex flex-col min-w-[120px]">
              <h3 className="font-bold text-[14px] mb-4 text-white">
                {t(footerText.supportTitle)}
              </h3>
              <ul className="flex flex-col gap-3 text-white/90 text-[14px]">
                {footerText.supportLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={prefixed(link.to)} className="hover:underline">{t(link)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 my-8"></div>

        {/* Middle Section - Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pb-4">
          
          {/* Hotline */}
          <div className="flex flex-col md:items-start">
            <h3 className="font-bold text-[14px] mb-3 text-white">{t(footerText.hotlineTitle)}</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <span className="text-white text-[14px]">+94 71 160 2095</span>
            </div>
          </div>

          {/* Contact Us & Socials */}
          <div className="flex flex-col items-start md:items-center">
            <div className="w-full flex flex-col items-start md:items-center">
              <h3 className="font-bold text-[14px] mb-3 text-white">{t(footerText.contactTitle)}</h3>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-white text-[14px]">info@elegantdecos.lk</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a href="#" className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <WhatsAppIcon size={16} />
                </a>
                <a href="#" className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <FacebookIcon size={16} />
                </a>
                <a href="#" className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <InstagramIcon size={16} />
                </a>
                <a href="#" className="w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <TiktokIcon size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-start md:items-end text-left">
            <div className="w-full flex flex-col items-start md:items-start md:w-fit">
              <h3 className="font-bold text-[14px] mb-3 text-white">{t(footerText.locationTitle)}</h3>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <span className="text-white text-[14px] leading-relaxed">
                  New Puttalam Rd,<br />Pandulagama, Anuradhapura
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-white text-[#0F172A] py-4 relative z-10 w-full mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center w-full px-6 text-[13px]">
          <p className="text-[13px]"><strong>{footerText.bottomCopy[isSwedish ? "sv" : "en"]}</strong></p>
          <p className="mt-2 md:mt-0 font-medium text-[13px]">Design & Develop by <strong>Evon Technologies Software Solutions (PVT) Ltd.</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;