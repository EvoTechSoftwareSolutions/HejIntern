import { useState, useRef, useEffect } from "react";
import {
  Heart,
  Star,
  User,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import heroBanner from "../assets/herobanner.png";
import React from "react";
import aboutus from "../assets/welcomeimage.jpg";
import explorebg from "../assets/explorebg.png";
import sigiriya from "../assets/sigiriya.png";
import DaladaMaligawa from "../assets/DaladaMaligawa.jpg";
import ellaTrain from "../assets/ellaTrain.jpg";
import kandyFort from "../assets/kandyFort.jpg";
import galleFort from "../assets/galleFort.jpg";
import sigiriyaBanner from "../assets/sigiriya.png";
import buddha from "../assets/buddha.jpg";
import tour1 from "../assets/tour 1.png";
import tour2 from "../assets/tour 2.png";
import tour3 from "../assets/tour 3.png";
import tour4 from "../assets/tour 4.png";
import tour5 from "../assets/tour 5.png";
import tour6 from "../assets/tour 6.png";
import stay from "../assets/stayimage.jpg";
import customize from "../assets/customize.png";
import backwardarrow from "../assets/backwardarrow.jpg";
import icon1 from "../assets/1.png";
import icon2 from "../assets/2.png";
import icon3 from "../assets/3.png";
import icon4 from "../assets/4.png";
import icon5 from "../assets/5.png";
import icon6 from "../assets/6.png";
import icon7 from "../assets/7.png";

// Image map: backend image slug -> local imported asset
const tourImageMap: Record<string, string> = { sigiriya };
const stayImageMap: Record<string, string> = { stay };
const resolveImage = (
  slug: string,
  map: Record<string, string>,
  fallback: string,
) => {
  if (slug && slug.startsWith("http")) return slug;
  return map[slug] ?? fallback;
};

// Types
interface Tour {
  id: string;
  title: string;
  short_description?: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  duration: string;
  category: string;
  image: string;
}

interface StayItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  featured: boolean;
}

// Renders the theme icon for a given theme id.
// `t` is passed in explicitly since this is a module-level helper (outside
// the component), so it can't call the useTranslation() hook itself.
const renderThemeIcon = (
  id: number,
  t: (key: string, options?: Record<string, unknown>) => string,
) => {
  const baseClass =
    "object-contain transition-opacity duration-150 group-hover:opacity-95 mx-auto";
  const alt = t("categories.themeIconAlt", { number: id });
  switch (id) {
    case 1:
      // Mask (wide)
      return (
        <img src={icon1} alt={alt} className={`${baseClass} w-[95%] h-[95%]`} />
      );
    case 2:
      // Palm tree (tall)
      return (
        <img src={icon2} alt={alt} className={`${baseClass} w-[75%] h-[95%]`} />
      );
    case 3:
      // Elephant (wide)
      return (
        <img
          src={icon3}
          alt={alt}
          className={`${baseClass} w-[160%] h-[140%]`}
        />
      );
    case 4:
      // Kayak (wide)
      return (
        <img
          src={icon4}
          alt={alt}
          className={`${baseClass} w-[110%] h-[110%]`}
        />
      );
    case 5:
      // Mortar (wide/compact)
      return (
        <img
          src={icon5}
          alt={alt}
          className={`${baseClass} w-[100%] h-[100%]`}
        />
      );
    case 6:
      // Spa bed (wide)
      return (
        <img
          src={icon6}
          alt={alt}
          className={`${baseClass} w-[200%] h-[200%]`}
        />
      );
    case 7:
      // Shield (tall/square)
      return (
        <img
          src={icon7}
          alt={alt}
          className={`${baseClass} w-[100%] h-[110%]`}
        />
      );
    default:
      return null;
  }
};

const Home = () => {
  const { t } = useTranslation("home");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTheme, setActiveTheme] = useState(1);
  const [_dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // API state
  const [tours, setTours] = useState<Tour[]>([]);
  const [stays, setStays] = useState<StayItem[]>([]);

  const heroSlides = [
    heroBanner,
    DaladaMaligawa,
    buddha,
    ellaTrain,
    kandyFort,
    galleFort,
    sigiriyaBanner,
  ];
  const [heroSlide, setHeroSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<boolean[]>(
    new Array(heroSlides.length).fill(false),
  );
  useEffect(() => {
    heroSlides.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedSlides((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const themes = [
    { id: 1, name: t("categories.themes.1") },
    { id: 2, name: t("categories.themes.2") },
    { id: 3, name: t("categories.themes.3") },
    { id: 4, name: t("categories.themes.4") },
    { id: 5, name: t("categories.themes.5") },
    { id: 6, name: t("categories.themes.6") },
    { id: 7, name: t("categories.themes.7") },
  ];

  // responsive grid will handle layout on small screens

  // Fetch tours from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/packages")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setTours(
            json.data.map((pkg: any) => ({
              id: pkg.id,
              title: pkg.package_name,
              short_description: pkg.short_description,
              location: pkg.location,
              price: `5$ - ${pkg.base_price}$`,
              rating: pkg.rating,
              reviews: pkg.reviews,
              duration: t("tours.durationDay", { count: pkg.duration_days }),
              category: pkg.category,
              image: resolveImage(pkg.image, tourImageMap, sigiriya),
            })),
          );
        }
      })
      .catch(() => {
        setTours([
          {
            id: "1",
            title: t("tours.fallbackData.1.title"),
            location: t("tours.fallbackData.1.location"),
            price: "10$ - 50$",
            rating: 4.8,
            reviews: 142,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.1.category"),
            image: sigiriya,
          },
          {
            id: "2",
            title: t("tours.fallbackData.2.title"),
            location: t("tours.fallbackData.2.location"),
            price: "5$ - 20$",
            rating: 4.9,
            reviews: 320,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.2.category"),
            image: sigiriya,
          },
          {
            id: "3",
            title: t("tours.fallbackData.3.title"),
            location: t("tours.fallbackData.3.location"),
            price: "10$ - 40$",
            rating: 4.7,
            reviews: 215,
            duration: t("tours.durationDay", { count: 2 }),
            category: t("tours.fallbackData.3.category"),
            image: sigiriya,
          },
          {
            id: "4",
            title: t("tours.fallbackData.4.title"),
            location: t("tours.fallbackData.4.location"),
            price: "30$ - 150$",
            rating: 4.9,
            reviews: 450,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.4.category"),
            image: sigiriya,
          },
          {
            id: "5",
            title: t("tours.fallbackData.5.title"),
            location: t("tours.fallbackData.5.location"),
            price: "15$ - 80$",
            rating: 4.8,
            reviews: 290,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.5.category"),
            image: sigiriya,
          },
          {
            id: "6",
            title: t("tours.fallbackData.6.title"),
            location: t("tours.fallbackData.6.location"),
            price: "20$ - 100$",
            rating: 4.6,
            reviews: 180,
            duration: t("tours.durationDay", { count: 2 }),
            category: t("tours.fallbackData.6.category"),
            image: sigiriya,
          },
          {
            id: "7",
            title: t("tours.fallbackData.7.title"),
            location: t("tours.fallbackData.7.location"),
            price: "40$ - 120$",
            rating: 4.5,
            reviews: 260,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.7.category"),
            image: sigiriya,
          },
          {
            id: "8",
            title: t("tours.fallbackData.8.title"),
            location: t("tours.fallbackData.8.location"),
            price: "50$ - 200$",
            rating: 4.8,
            reviews: 380,
            duration: t("tours.durationDay", { count: 1 }),
            category: t("tours.fallbackData.8.category"),
            image: sigiriya,
          },
        ]);
      });
  }, [t]);

  const testimonials = [
    {
      id: 1,
      name: t("testimonials.items.1.name"),
      country: t("testimonials.items.1.country"),
      text: t("testimonials.items.1.text"),
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: t("testimonials.items.2.name"),
      country: t("testimonials.items.2.country"),
      text: t("testimonials.items.2.text"),
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: t("testimonials.items.3.name"),
      country: t("testimonials.items.3.country"),
      text: t("testimonials.items.3.text"),
      avatar:
        "https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=200&auto=format&fit=crop",
    },
  ];

  // Auto-slide configuration (ms)
  const AUTO_SLIDE_MS = 4000; // time between slides
  const SLIDE_TRANSITION_MS = 700; // slide transition duration

  const prevTestimonial = () => {
    setCurrentSlide((s) => (s - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setCurrentSlide((s) => (s + 1) % testimonials.length);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch (err) {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    setDragOffset(dx);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const dx = e.clientX - startXRef.current;
    setDragOffset(0);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (err) {}
    const threshold = 60;
    if (dx < -threshold) nextTestimonial();
    else if (dx > threshold) prevTestimonial();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setDragOffset(0);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (err) {}
  };

  const toursRef = useRef<HTMLDivElement | null>(null);
  const scrollPrevTours = () => {
    const el = toursRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };
  const scrollNextTours = () => {
    const el = toursRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const staysRef = useRef<HTMLDivElement | null>(null);
  const scrollPrevStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };
  const scrollNextStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Fetch stays from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/stays")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setStays(
            json.data.map((s: any) => ({
              id: s.id,
              name: s.name,
              location: s.location,
              rating: s.rating,
              image: resolveImage(s.image, stayImageMap, stay),
              featured: s.featured,
            })),
          );
        }
      })
      .catch(() => {
        setStays([
          {
            id: "1",
            name: t("stays.fallbackData.1.name"),
            location: t("stays.fallbackData.1.location"),
            rating: 4.5,
            image: stay,
            featured: true,
          },
          {
            id: "2",
            name: t("stays.fallbackData.2.name"),
            location: t("stays.fallbackData.2.location"),
            rating: 4.8,
            image: stay,
            featured: false,
          },
          {
            id: "3",
            name: t("stays.fallbackData.3.name"),
            location: t("stays.fallbackData.3.location"),
            rating: 4.7,
            image: stay,
            featured: false,
          },
          {
            id: "4",
            name: t("stays.fallbackData.4.name"),
            location: t("stays.fallbackData.4.location"),
            rating: 4.6,
            image: stay,
            featured: false,
          },
          {
            id: "5",
            name: t("stays.fallbackData.5.name"),
            location: t("stays.fallbackData.5.location"),
            rating: 4.9,
            image: stay,
            featured: false,
          },
          {
            id: "6",
            name: t("stays.fallbackData.6.name"),
            location: t("stays.fallbackData.6.location"),
            rating: 4.7,
            image: stay,
            featured: false,
          },
          {
            id: "7",
            name: t("stays.fallbackData.7.name"),
            location: t("stays.fallbackData.7.location"),
            rating: 4.8,
            image: stay,
            featured: false,
          },
          {
            id: "8",
            name: t("stays.fallbackData.8.name"),
            location: t("stays.fallbackData.8.location"),
            rating: 4.6,
            image: stay,
            featured: false,
          },
        ]);
      });
  }, [t]);

  const destinationDescription = t("destinations.cardDescription");

  const destinationCards = [
    {
      id: 1,
      name: t("destinations.cardNames.nineArch"),
      image: tour1,
      wide: true,
      description: destinationDescription,
    },
    {
      id: 2,
      name: t("destinations.cardNames.thalpe"),
      image: tour2,
      wide: false,
      description: destinationDescription,
    },
    {
      id: 3,
      name: t("destinations.cardNames.nineArch"),
      image: tour3,
      wide: false,
      description: destinationDescription,
    },
    {
      id: 4,
      name: t("destinations.cardNames.nineArch"),
      image: tour4,
      wide: false,
      description: destinationDescription,
    },
    {
      id: 5,
      name: t("destinations.cardNames.thalpe"),
      image: tour5,
      wide: false,
      description: destinationDescription,
    },
    {
      id: 6,
      name: t("destinations.cardNames.thalpe"),
      image: tour6,
      wide: true,
      description: destinationDescription,
    },
  ];

  // Autoplay: advance testimonial every AUTO_SLIDE_MS, but pause while dragging
  useEffect(() => {
    const id = setInterval(() => {
      if (isDraggingRef.current) return;
      setCurrentSlide((s) => (s + 1) % testimonials.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="w-full font-sans text-dark bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[100svh] min-h-[560px] flex flex-col justify-center items-center text-center text-secondary overflow-hidden bg-[#003032]">
        {heroSlides.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="sync"
            className={`absolute inset-0 z-0 h-full w-full object-cover object-[center_45%] sm:object-[center_50%] transition-opacity duration-[1200ms] ease-in-out ${
              heroSlide === index && loadedSlides[index]
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{ willChange: "opacity" }}
          />
        ))}

        {/* Top fade */}
        <div className="absolute top-0 left-0 w-full h-14 md:h-24 lg:h-[118px] bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none" />

        {/* Dark veils for text contrast — sit BELOW the bottom white fade now */}
        <div className="absolute inset-0 z-10 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/35 to-black/10 pointer-events-none" />

        {/* Bottom fade — raised to z-15, smooth ramp with no flat white plateau, blends into page white below */}
        <div className="absolute bottom-0 left-0 w-full h-[34%] min-h-[220px] bg-gradient-to-t from-white via-white/70 via-40% to-transparent z-[15] pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center px-4 pt-[110px] pb-28 sm:pb-32 md:pb-36">
          <h1 className="font-kaisei text-[36px] md:text-[44px] leading-[48px] text-white tracking-wide [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_6px_18px_rgba(0,0,0,0.6)]">
            {t("hero.title")}
          </h1>
          <p className="font-alex text-[28px] md:text-[36px] leading-[40px] text-white mt-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_6px_18px_rgba(0,0,0,0.6)]">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col items-center mt-4 w-full">
            <p className="font-sans text-[14px] md:text-[15px] leading-[20px] text-white font-medium [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] mb-3">
              {t("hero.tagline")}
            </p>
            <div className="w-[280px] h-px bg-gradient-to-r from-transparent via-white/60 to-transparent mb-5" />
          </div>

          <div className="flex flex-row justify-center gap-2 sm:gap-4 mt-1 items-stretch w-full px-4 md:px-0">
            <button className="flex-1 sm:flex-none px-2 sm:px-6 py-1.5 sm:py-3 rounded-[6px] sm:rounded-[8px] bg-[#E2E8F0]/95 backdrop-blur-sm text-[#003032] font-sans font-bold text-[8px] sm:text-[13px] leading-[10px] sm:leading-[18px] uppercase tracking-normal sm:tracking-wide whitespace-normal sm:whitespace-nowrap shadow-[0px_4px_12px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center sm:w-[240px] hover:bg-white">
              {t("hero.primaryButton")}
            </button>
            <button className="flex-1 sm:flex-none px-2 sm:px-6 py-1.5 sm:py-3 rounded-[6px] sm:rounded-[8px] bg-[#01888E] text-white font-sans font-bold text-[8px] sm:text-[13px] leading-[10px] sm:leading-[18px] uppercase tracking-normal sm:tracking-wide whitespace-normal sm:whitespace-nowrap shadow-[0px_4px_12px_rgba(1,136,142,0.3)] transition-colors flex items-center justify-center sm:w-[240px] hover:bg-[#006D6D]">
              {t("hero.secondaryButton")}
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-row gap-2.5 items-center">
          {heroSlides.map((src, index) => (
            <button
              key={index}
              onClick={() => setHeroSlide(index)}
              aria-label={t("hero.slideAriaLabel", { number: index + 1 })}
              className={`rounded-full transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer ${
                heroSlide === index
                  ? "w-9 h-9 sm:w-11 sm:h-11 border-2 border-[#fff] p-[2px] bg-transparent shadow-md"
                  : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-black/30 hover:bg-white/90"
              }`}
            >
              {heroSlide === index && (
                <div
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-0 bg-white max-w-7xl mx-auto text-center relative z-20">
        <p className="text-[13px] text-[#003032] font-sans max-w-[800px] mx-auto leading-[18px] text-center px-4 font-normal whitespace-pre-line mb-8 sm:mb-10">
          <Trans
            i18nKey="categories.description"
            ns="home"
            components={{ 1: <span className="font-bold text-[#01888E]" /> }}
          />
        </p>
        <div className="flex flex-row items-stretch justify-start lg:justify-center lg:gap-4 gap-1 sm:gap-2 pb-0 px-3 sm:px-6 md:px-8 max-w-[1100px] mx-auto overflow-hidden">
          {themes.map((theme) => {
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className="group flex flex-col items-center rounded-[10px] p-2 bg-[#EAF5F5] cursor-pointer
             w-[calc((100%-18px)/7)] max-w-[calc((100%-18px)/7)]
             lg:w-[109px] h-[96px] sm:h-[104px] lg:h-[171px]"
              >
                {/* Icon */}
                <div className="flex items-center justify-center h-[36px] sm:h-[40px] lg:h-[80px]">
                  {renderThemeIcon(theme.id, t)}
                </div>

                {/* Text */}
                <div className="flex-1 flex items-start justify-center mt-1 lg:mt-2">
                  <span
                    className="text-center font-bold text-[#003032]
                 text-[6px] sm:text-[8px] md:text-[9px] lg:text-[12px]
                 leading-[8px] sm:leading-[10px] md:leading-[12px] lg:leading-[18px]
                 break-words whitespace-pre-line"
                  >
                    {theme.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="pt-2 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full relative">
  <div className="max-w-[1200px] mx-auto">
    {/* Heading */}
    <div className="text-center mb-6">
      <h2 className="font-petemoss text-[clamp(40px,8vw,96px)] leading-none text-[#01888E]">
        {t("about.greeting")}
      </h2>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,420px)_1fr] items-start gap-8 md:gap-12">
      {/* Left: Image */}
      <div className="bg-white rounded-[18px] p-3 sm:p-4 w-full">
        <img
          src={aboutus}
          alt={t("about.imageAlt")}
          className="w-full aspect-[4/3] md:aspect-[5/6] object-cover rounded-[12px]"
        />
      </div>

      {/* Right: Text */}
      <div className="flex flex-col w-full font-sans">
        {/* Label */}
        <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 text-center md:text-left">
          {t("about.label")}
        </span>

        {/* Title */}
        <h3 className="text-[clamp(26px,4vw,40px)] leading-[1.15] text-[#003032] mb-3 font-bold text-center md:text-left">
          {t("about.titlePrefix")}
          <span className="text-[#01888E]">{t("about.titleHighlight")}</span>
        </h3>

        {/* Subtitle */}
        <div className="text-[16px] font-bold text-[#003032] mb-4 text-center md:text-left">
          {t("about.subtitle")}
        </div>

        {/* Paragraphs */}
        <div className="text-[14px] md:text-[15px] font-normal text-[#003032] leading-[24px] space-y-4 text-left">
          <p dangerouslySetInnerHTML={{ __html: t("about.paragraph1Html") }} />
          <p dangerouslySetInnerHTML={{ __html: t("about.paragraph2Html") }} />
          <p dangerouslySetInnerHTML={{ __html: t("about.paragraph3Html") }} />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Tours Section (background: explorebg.png) */}
      <section
        className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        style={{
          backgroundImage: `url(${explorebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-6">
            <span
              className="text-[#01888E] text-[11px] font-normal uppercase tracking-[0.15em] mb-2 block"
              style={{ fontFamily: "Inter" }}
            >
              {t("tours.label")}
            </span>
            <h3
              className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold"
              style={{ fontFamily: "Inter" }}
            >
              <span className="font-light">{t("tours.titlePrefix")}</span>
              <span className="font-bold text-[#01888E]">
                {t("tours.titleHighlight")}
              </span>
            </h3>
            <div className="flex flex-col items-stretch gap-6">
              <p
                className="text-[13px] leading-[18px] text-[#003032] font-normal max-w-[1500px] mt-4"
                style={{ fontFamily: "Inter" }}
              >
                <Trans
                  i18nKey="tours.description"
                  ns="home"
                  components={{ 1: <span className="font-bold" /> }}
                />
              </p>

              {/* Carousel Navigation Buttons */}
              <div className="flex justify-end mt-3 md:mt-0 shrink-0">
                <div className="flex gap-[2px] md:mr-2">
                  <button
                    onClick={scrollPrevTours}
                    aria-label={t("tours.prevAriaLabel")}
                    className="w-10 h-8 bg-[#01888E] rounded-l-full rounded-r-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={scrollNextTours}
                    aria-label={t("tours.nextAriaLabel")}
                    className="w-10 h-8 bg-[#01888E] rounded-r-full rounded-l-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              toursRef.current = el;
            }}
            className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="snap-start flex-shrink-0 w-[calc(25%-15px)] min-w-[260px] bg-white rounded-[12px] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image area */}
                <div className="relative w-full h-[180px] bg-gray-100 shrink-0">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Rating badge top-left */}
                  <div className="absolute left-3 top-3 bg-[#0BA77A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[#FFC600] text-[12px]">★</span>
                    <span>{tour.rating}</span>
                  </div>

                  {/* Heart top-right */}
                  <button
                    aria-label={t("tours.favoriteAriaLabel")}
                    className="absolute right-3 top-3 w-7 h-7 bg-white/20 border border-white rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Heart size={14} className="text-white fill-transparent" />
                  </button>

                  {/* Text overlay bottom-left */}
                  <div className="absolute left-3 bottom-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-white text-[12px] font-semibold">
                      <User size={13} className="text-white fill-white/20" />
                      <span>{tour.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-medium">
                      <MapPin size={11} className="text-white fill-white/20" />
                      <span>{tour.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                  <div
                    className="flex items-center gap-2 mb-2 text-[12px] font-bold"
                    style={{ fontFamily: "Inter" }}
                  >
                    <span className="text-[#01888E]">
                      {t("tours.ratingsCount", { count: tour.reviews })}
                    </span>
                    <span className="text-gray-300 font-light">|</span>
                    <span className="text-gray-600 font-normal">
                      {t("tours.fromLabel")}{" "}
                      <span className="text-[#FF2A2A] font-bold">
                        {tour.price}
                      </span>
                    </span>
                  </div>

                  <p
                    className="text-[12px] text-[#4A4A4A] leading-relaxed mb-4 tracking-wide"
                    style={{ fontFamily: "Inter" }}
                  >
                    {tour.short_description ?? t("tours.fallbackDescription")}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div
                        className="text-[13px] text-[#01888E] font-bold"
                        style={{ fontFamily: "Inter" }}
                      >
                        {tour.category}
                      </div>
                      <div
                        className="text-[11px] text-[#003032] font-bold mt-0.5"
                        style={{ fontFamily: "Inter" }}
                      >
                        {tour.duration}
                      </div>
                    </div>
                    <button
                      aria-label={t("tours.shareAriaLabel")}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:text-[#01888E]"
                    >
                      <img
                        src={backwardarrow}
                        alt={t("tours.backwardArrowAlt")}
                        className="h-4 w-4 object-contain"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-8 py-3 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors"
              style={{ fontFamily: "Inter" }}
            >
              {t("tours.exploreAllButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 text-center md:text-left">
            <span className="text-[13px] font-medium text-[#01888E] mb-2 block">
              {t("destinations.label")}
            </span>
            <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-4 font-bold">
              <span className="font-bold">{t("destinations.titlePrefix")}</span>{" "}
              <span className="font-bold text-[#01888E]">
                {t("destinations.titleHighlight")}
              </span>
            </h3>
            <p
              className="text-[14px] leading-[22px] text-[#757575] font-normal max-w-[1000px] mx-auto md:mx-0"
              dangerouslySetInnerHTML={{
                __html: t("destinations.descriptionHtml"),
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-2">
            {destinationCards.map((card) => (
              <div
                key={card.id}
                className={`${card.wide ? "md:col-span-2" : "md:col-span-1"} h-[220px] sm:h-[240px] md:h-[260px] lg:h-[300px] rounded-[12px] overflow-hidden relative cursor-pointer group`}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-white from-15% via-white/45 via-55% to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white from-20% via-white/55 via-70% to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute left-5 bottom-5 right-5 z-10">
                  <h4
                    className={`font-bold text-[#003032] ${card.wide ? "text-[22px]" : "text-[18px] md:text-[20px]"}`}
                  >
                    {card.name}
                  </h4>
                  <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="w-20 h-0.5 bg-[#01888E]/60 mt-1.5 mb-2" />
                    <p
                      className={`text-[#003032]/75 leading-snug ${card.wide ? "text-[12px] md:text-[13px] max-w-[92%]" : "text-[11px] md:text-[12px]"}`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-10 py-3.5 bg-[#01888E] text-white rounded-full text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors">
              {t("destinations.ctaButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Stays Section (background: explorebg.png) */}
      <section
        className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20"
        style={{
          backgroundImage: `url(${explorebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-6">
            <span
              className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block"
              style={{ fontFamily: "Inter" }}
            >
              {t("stays.label")}
            </span>
            <h3
              className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold"
              style={{ fontFamily: "Inter" }}
            >
              <span className="font-bold">{t("stays.titlePrefix")}</span>{" "}
              <span className="font-bold text-[#01888E]">
                {t("stays.titleHighlight")}
              </span>
            </h3>
            <div className="flex flex-col items-stretch gap-6">
              <p
                className="text-[13px] leading-[18px] text-[#003032] font-normal max-w-[1500px] mt-4"
                style={{ fontFamily: "Inter" }}
              >
                {t("stays.description")}
              </p>

              {/* Carousel Navigation Buttons */}
              <div className="flex justify-end mt-3 md:mt-0 shrink-0">
                <div className="flex gap-[2px] md:mr-2">
                  <button
                    onClick={scrollPrevStays}
                    aria-label={t("stays.prevAriaLabel")}
                    className="w-10 h-8 bg-[#01888E] rounded-l-full rounded-r-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={scrollNextStays}
                    aria-label={t("stays.nextAriaLabel")}
                    className="w-10 h-8 bg-[#01888E] rounded-r-full rounded-l-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={(el) => {
              staysRef.current = el;
            }}
            className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {stays.map((item) => (
              <div
                key={item.id}
                className="snap-start flex-shrink-0 w-[calc(25%-15px)] min-w-[260px]"
              >
                <div className="relative rounded-[12px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer group h-[260px] bg-white">
                  {/* Image and overlay container */}
                  <div className="absolute inset-x-0 top-0 h-[180px] group-hover:h-full transition-all duration-500 ease-in-out bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Rating badge top-left */}
                  <div className="absolute top-3 left-3 bg-[#01888E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px] flex items-center gap-1 z-20">
                    <Star className="fill-[#FFC600] text-[#FFC600]" size={11} />
                    <span>{item.rating}</span>
                  </div>

                  {/* Wishlist button top-right */}
                  <button
                    aria-label={t("stays.wishlistAriaLabel")}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition z-20"
                  >
                    <Heart size={14} className="stroke-[2.5]" />
                  </button>

                  {/* Card Info Content */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-white group-hover:bg-transparent transition-all duration-500 ease-in-out flex flex-col justify-center h-[80px] z-10">
                    <h4
                      className="text-[15px] font-bold text-[#003032] group-hover:text-white mb-1.5 transition-colors duration-500"
                      style={{ fontFamily: "Inter" }}
                    >
                      {item.name}
                    </h4>
                    <div
                      className="flex items-center text-[#757575] group-hover:text-white/90 text-[12px] transition-colors duration-500"
                      style={{ fontFamily: "Inter" }}
                    >
                      <MapPin
                        size={12}
                        className="mr-1 text-[#01888E] group-hover:text-white shrink-0 transition-colors duration-500"
                      />
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="px-8 py-3 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors"
              style={{ fontFamily: "Inter" }}
            >
              {t("stays.viewAllButton")}
            </button>
          </div>
        </div>
      </section>

      {/* Customize CTA Section */}
      <section className="relative w-full bg-white overflow-hidden">
        {/* Full-width background image */}
        <div
          className="relative w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${customize})`, height: "585px" }}
        >
          {/* White fade at top */}
          <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />

          {/* White fade at sides */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Floating card anchored to bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center px-4 translate-y-[40%] z-10">
            <div className="bg-white w-full max-w-[800px] mx-auto rounded-[20px] shadow-[0px_8px_40px_rgba(0,0,0,0.10)] px-8 py-10 text-center">
              <h3
                className="text-[#003032] font-bold text-[20px] md:text-[22px] leading-tight mb-4"
                style={{ fontFamily: "Inter" }}
              >
                {t("customize.titlePrefix")}
                <span className="text-[#01888E]">
                  {t("customize.titleHighlight")}
                </span>
                {t("customize.titleSuffix")}
              </h3>
              <p
                className="text-[13px] md:text-[14px] text-[#757575] leading-relaxed max-w-[700px] mx-auto mb-7"
                style={{ fontFamily: "Inter" }}
              >
                {t("customize.description")}
              </p>
              <button
                className="px-12 py-3 bg-[#01888E] text-white rounded-[10px] text-[15px] font-bold shadow-[0px_4px_16px_rgba(1,136,142,0.35)] hover:bg-[#006D6D] transition-colors min-w-[180px]"
                style={{ fontFamily: "Inter" }}
              >
                {t("customize.button")}
              </button>
            </div>
          </div>
        </div>

        {/* Spacer so next section doesn't overlap the card */}
        <div className="h-[220px] bg-white" />
      </section>

      {/* Testimonials Section */}
      <section
        className="relative py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden"
        style={{
          backgroundImage: `url(${explorebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-8 text-center md:text-left">
            <span
              className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block"
              style={{ fontFamily: "Inter" }}
            >
              {t("testimonials.label")}
            </span>
            <h2
              className="text-[28px] md:text-[34px] leading-tight text-[#003032] mb-3 font-bold"
              style={{ fontFamily: "Inter" }}
            >
              <span className="font-bold">{t("testimonials.titlePrefix")}</span>{" "}
              <span className="font-bold text-[#01888E]">
                {t("testimonials.titleHighlight")}
              </span>
            </h2>
          </div>

          <div
            className="relative flex justify-center items-center h-[440px] sm:h-[480px] cursor-grab touch-pan-y overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
          >
            {testimonials.map((testimonial, index) => {
              let position = index - currentSlide;
              if (position < -1) position += testimonials.length;
              if (position > 1) position -= testimonials.length;

              const isActive = position === 0;
              const cardWidth =
                typeof window !== "undefined"
                  ? window.innerWidth < 640
                    ? 260
                    : window.innerWidth < 1024
                      ? 300
                      : 340
                  : 340;
              const translateX = `translateX(${position * (cardWidth + (typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 24))}px)`;

              return (
                <div
                  key={testimonial.id}
                  className={`absolute ease-in-out ${isActive ? "z-30" : "z-10"}`}
                  style={{
                    transform: `${translateX}${isActive ? " translateY(-8px) scale(1.03)" : " scale(0.92)"}`,
                    transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out`,
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  <div
                    className={`relative bg-white rounded-[24px] px-6 py-8 sm:px-8 sm:py-9 text-center overflow-hidden transition-all duration-700 flex flex-col items-center ${
                      isActive
                        ? "w-[260px] sm:w-[300px] lg:w-[360px] min-h-[380px] shadow-[0px_8px_32px_rgba(1,136,142,0.18)]"
                        : "w-[240px] sm:w-[280px] lg:w-[320px] min-h-[320px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    <div className="absolute top-6 left-6 text-[#01888E] pointer-events-none select-none">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                      </svg>
                    </div>

                    <div
                      className={`rounded-full bg-cover bg-center ring-[4px] ring-[#01888E]/20 border-2 border-[#01888E] z-10 mt-2 ${isActive ? "w-[80px] h-[80px] sm:w-[88px] sm:h-[88px]" : "w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]"}`}
                      style={{
                        backgroundImage: `url(${testimonial.avatar})`,
                        boxShadow: "0 4px 14px rgba(1, 136, 142, 0.3)",
                      }}
                    />

                    <div className="flex justify-center gap-1 mt-5 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={isActive ? 16 : 14}
                          className="text-[#FFC600] fill-[#FFC600]"
                        />
                      ))}
                    </div>

                    <p
                      className={`italic text-[#003032]/80 mb-6 px-2 sm:px-4 ${isActive ? "text-[12px] leading-[20px]" : "text-[11px] leading-[18px]"}`}
                      style={{ fontFamily: "Inter" }}
                    >
                      "{testimonial.text}"
                    </p>

                    <div className="mt-auto">
                      <h3
                        className={`text-[#003032] font-bold ${isActive ? "text-[18px] mb-1" : "text-[15px] mb-0.5"}`}
                        style={{ fontFamily: "Inter" }}
                      >
                        {testimonial.name}
                      </h3>
                      <p
                        className={`text-[#01888E] font-semibold ${isActive ? "text-[14px]" : "text-[12px]"}`}
                        style={{ fontFamily: "Inter" }}
                      >
                        {testimonial.country}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={t("testimonials.slideAriaLabel", {
                  number: index + 1,
                })}
                className={`rounded-full transition-all flex items-center justify-center ${
                  currentSlide === index
                    ? "w-[18px] h-[18px] border-[2px] border-[#01888E] bg-white"
                    : "w-[14px] h-[14px] bg-white border border-[#01888E]/40 hover:border-[#01888E]/60"
                }`}
              >
                {currentSlide === index && (
                  <div className="w-[10px] h-[10px] bg-[#01888E] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
