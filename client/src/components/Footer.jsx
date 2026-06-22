import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";

import logo from "../assets/footerlogo.png"; 

const Footer = () => {
  return (
    <footer className="bg-[#01888E] text-white rounded-t-[40px] overflow-hidden h-[370px] flex flex-col">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
          
          {/* Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Hej Ceylon" className="h-11" />
              <div>
                <div className="text-white font-bold text-lg">HejCeylon.com</div>
              </div>
            </div>

            <p className="text-xs text-[#E6F3F4] leading-5 mb-4">
              Hej Ceylon, we bring your dream events to life with stunning décor,
              expert planning, and seamless execution. Whether it's a wedding,
              birthday, corporate event, or any special celebration.
            </p>

            <h4 className="font-semibold text-sm mb-3">Stay in the loop and sign up for the Wardiere newsletter:</h4>

            {/* Newsletter */}
            <div className="flex items-center w-full max-w-md bg-transparent rounded-full border border-[#E6F3F4] overflow-hidden mb-5">
              <input
                type="email"
                placeholder=""
                className="flex-1 bg-transparent pl-4 py-3 outline-none text-white placeholder:text-white/70 text-sm"
              />
              <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full border-l border-white/10 mr-1">
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {['wa', 'fb', 'ig', 'tt'].map((item, index) => (
                <a
                  key={index}
                  href="/"
                  className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/5 text-white hover:bg-white/10 transition"
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
              Navigations
            </h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/tours">Tours</Link></li>
              <li><Link to="/stays">Stays</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-3 uppercase tracking-wide">Quick Links</h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h3 className="font-bold text-base mb-3 uppercase tracking-wide">Support</h3>

            <ul className="flex flex-col gap-3 text-[#E6F3F4] text-sm">
              <li><Link to="/help-center">Help Center</Link></li>
              <li><Link to="/account">My Hej Ceylon</Link></li>
              <li><Link to="/favorites">My Favorites</Link></li>
              <li><Link to="/my-tours">My Tours</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            {/* Hotline */}
            <h3 className="font-bold text-sm mb-2 uppercase">Hotline</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full border border-[#E6F3F4] flex items-center justify-center">
                <Phone size={18} />
              </div>
              <span className="text-[#E6F3F4] text-xs">+94 71 160 2095</span>
            </div>

            {/* Contact */}
            <h3 className="font-bold text-sm mb-2 uppercase">Contact Us</h3>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full border border-[#E6F3F4] flex items-center justify-center">
                <Mail size={18} />
              </div>

              <span className="text-[#E6F3F4] text-xs">info@elegantdeco.lk</span>
            </div>

            {/* Location */}
            <h3 className="font-bold text-sm mb-2 uppercase">Location</h3>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full border border-[#E6F3F4] flex items-center justify-center shrink-0">
                <MapPin size={18} />
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
      <div className="bg-white text-[#0F172A] h-14 flex items-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full px-6 text-xs">
          <p>© <strong>HejCeylon (PVT) Ltd.</strong> | All rights reserved 2025</p>

          <p className="mt-2 md:mt-0">Design & Develop by <strong>Evon Technologies Software Solutions (PVT) Ltd.</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;