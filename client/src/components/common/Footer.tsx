import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

import logo from "../../assets/footerlogo.png";
import footerbg from "../../assets/footerbg.png";

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2v-2.9h2.2V9.3c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3v1.54h2.2l-.35 2.9h-1.85v7A10 10 0 0 0 22 12z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.26 6.32 6.33 6.33 0 0 0 6.31-6.24V8.15a8.32 8.32 0 0 0 4.31 1.78V6.44a4.83 4.83 0 0 1-2.29-.6z" />
  </svg>
);

const footerText = {
  navigationTitle: { en: "Navigations", sv: "Navigationer" },
  navigationLinks: [
    { to: "/", en: "Home", sv: "Hem" },
    { to: "/destinations", en: "Destinations", sv: "Destinationer" },
    { to: "/tours", en: "Tours", sv: "Turer" },
    { to: "/stays", en: "Stays", sv: "Boenden" },
    { to: "/blog", en: "Blog", sv: "Blogg" },
    { to: "/contact", en: "Contact Us", sv: "Kontakta oss" },
  ],
  quickLinksTitle: { en: "Quick Links", sv: "Snabblänkar" },
  quickLinks: [
    { to: "/terms", en: "Terms & Conditions", sv: "Villkor & Förutsättningar" },
    { to: "/privacy", en: "Privacy Policy", sv: "Integritetspolicy" },
    { to: "/faq", en: "FAQ", sv: "Vanliga frågor" },
    { to: "/gallery", en: "Gallery", sv: "Galleri" },
    { to: "/about", en: "About Us", sv: "Om oss" },
  ],
  supportTitle: { en: "Support", sv: "Support" },
  supportLinks: [
    { to: "/help-center", en: "Help Center", sv: "Help Center" },
    { to: "/account", en: "My Hej Ceylon", sv: "Mitt Hej Ceylon" },
    { to: "/favorites", en: "My Favorites", sv: "Mina favoriter" },
    { to: "/my-tours", en: "My Tours", sv: "Mina turer" },
    { to: "/profile", en: "My Profile", sv: "Min profil" },
  ],
  description: {
    en: "Hej Ceylon, we bring your dream events to life with stunning décor, expert planning, and seamless execution. Whether it's a wedding, birthday, corporate event, or any special celebration.",
    sv: "Hej Ceylon, vi förverkligar dina drömevenemang med fantastisk dekoration, professionell planering och smidig genomförande. Oavsett om det är ett bröllop, en födelsedag, ett företagsevent eller en särskild fest.",
  },
  newsletter: {
    en: "Stay in the loop and sign up for the Wardiere newsletter:",
    sv: "Håll dig uppdaterad — anmäl dig till Wardiere-nyhetsbrevet:",
  },
  emailPlaceholder: { en: "Enter your email", sv: "Ange din e-post" },
  hotlineTitle: { en: "Hotline", sv: "Hotline" },
  contactTitle: { en: "Contact Us", sv: "Kontakta oss" },
  locationTitle: { en: "Location", sv: "Plats" },
  bottomCopy: {
    en: "HejCeylon (PVT) Ltd. | All right reserved 2025",
    sv: "HejCeylon (PVT) Ltd. | Alla rättigheter förbehållna 2025",
  },
  designBy: {
    en: "Design & Develop by Evon Technologies Software Solutions (PVT) Ltd.",
    sv: "Design & Utvecklad av Evon Technologies Software Solutions (PVT) Ltd.",
  },
};

type LinkItem = { to: string; en: string; sv: string };

const FooterLinkColumn = ({
  title,
  links,
  prefixed,
  t,
}: {
  title: string;
  links: LinkItem[];
  prefixed: (path: string) => string;
  t: (obj: { en: string; sv: string }) => string;
}) => (
  <div className="flex flex-col">
    <h3 className="font-bold text-[13px] mb-4 uppercase tracking-wider text-white">
      {title}
    </h3>
    <ul className="flex flex-col gap-3 text-[#E6F3F4] text-[13px]">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={prefixed(link.to)} className="hover:text-white transition-colors">
            {t(link)}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactBlock = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="mb-6 last:mb-0">
    <h4 className="font-bold text-[13px] mb-3 uppercase tracking-wider text-white">
      {title}
    </h4>
    <div className="flex items-center gap-3">
      <div className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white/80 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="text-white text-[12px] font-medium leading-snug">
        {children}
      </div>
    </div>
  </div>
);

const Footer = () => {
  const location = useLocation();
  const isSwedish = location.pathname.startsWith("/sv");
  const t = (obj: { en: string; sv: string }) => (isSwedish ? obj.sv : obj.en);
  const prefixed = (path: string) => (isSwedish ? `/sv${path}` : path);

  const socialLinks = [
    { href: "#", label: "WhatsApp", Icon: WhatsAppIcon },
    { href: "#", label: "Facebook", Icon: FacebookIcon },
    { href: "#", label: "Instagram", Icon: InstagramIcon },
    { href: "#", label: "TikTok", Icon: TikTokIcon },
  ];

  return (
    <footer className="relative bg-[#01888E] text-white rounded-t-[40px] overflow-hidden flex flex-col">
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{
          height: "55%",
          backgroundImage: `url(${footerbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.22,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative z-10 w-full">
        <div className="grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-12 gap-6 items-start">
          {/* Brand, newsletter & social — full width on mobile */}
          <div className="col-span-6 lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Hej Ceylon" className="h-[38px] w-auto" />
              <div className="text-white font-bold text-[20px] tracking-wide">
                HejCeylon.com
              </div>
            </div>

            <p className="text-[13px] text-white leading-[22px] mb-5 max-w-[360px]">
              {t(footerText.description)}
            </p>

            <h4 className="font-semibold text-[13px] mb-3 text-white/95">
              {t(footerText.newsletter)}
            </h4>

            <div className="flex items-center w-full max-w-[320px] bg-transparent rounded-full border-[1.5px] border-white/80 overflow-hidden mb-6">
              <input
                type="email"
                placeholder={t(footerText.emailPlaceholder)}
                aria-label={t(footerText.emailPlaceholder)}
                className="flex-1 min-w-0 bg-transparent pl-4 py-2.5 outline-none text-white placeholder:text-white/70 text-[13px]"
              />
              <button
                type="button"
                aria-label="Subscribe to newsletter"
                className="w-[34px] h-[34px] flex items-center justify-center bg-white rounded-full m-1 text-[#01888E] hover:bg-gray-100 transition shrink-0"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-[36px] h-[36px] rounded-full border-[1.5px] border-white/80 flex items-center justify-center text-white hover:bg-white/20 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigations */}
          <div className="col-span-2 lg:col-span-2">
            <FooterLinkColumn
              title={t(footerText.navigationTitle)}
              links={footerText.navigationLinks}
              prefixed={prefixed}
              t={t}
            />
          </div>

          {/* Support */}
          <div className="col-span-2 lg:col-span-2">
            <FooterLinkColumn
              title={t(footerText.supportTitle)}
              links={footerText.supportLinks}
              prefixed={prefixed}
              t={t}
            />
          </div>

          {/* Quick Links */}
          <div className="col-span-2 lg:col-span-2">
            <FooterLinkColumn
              title={t(footerText.quickLinksTitle)}
              links={footerText.quickLinks}
              prefixed={prefixed}
              t={t}
            />
          </div>

          {/* Contact details */}
          <div className="col-span-6 lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4 lg:gap-0">
              <ContactBlock title={t(footerText.hotlineTitle)} icon={<Phone size={16} className="text-white" />}>
                +94 71 160 2095
              </ContactBlock>
              <ContactBlock title={t(footerText.contactTitle)} icon={<Mail size={16} className="text-white" />}>
                info@elegantdecos.lk
              </ContactBlock>
            </div>
            <ContactBlock title={t(footerText.locationTitle)} icon={<MapPin size={16} className="text-white" />}>
              New Puttalam Rd, Pandulagama, Anuradhapura
            </ContactBlock>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="bg-white text-[#4B5563] relative z-20 py-3 min-h-[44px] flex items-center">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 lg:px-8 gap-2 text-[11px] sm:text-[12px]">
          <p className="text-center sm:text-left">
            © <span className="font-bold">{t(footerText.bottomCopy)}</span>
          </p>
          <p className="text-center sm:text-right">
            {isSwedish ? (
              <>
                Design & Utvecklad av{" "}
                <span className="font-bold text-[#1F2937]">Evon Technologies Software Solutions (PVT) Ltd.</span>
              </>
            ) : (
              <>
                Design & Develop by{" "}
                <span className="font-bold text-[#1F2937]">Evon Technologies Software Solutions (PVT) Ltd.</span>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
