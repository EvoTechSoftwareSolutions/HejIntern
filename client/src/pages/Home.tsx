import { useState, useRef, useEffect } from 'react';
import { Heart, Star, User, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import heroBanner from '../assets/herobanner.png';
import React from "react";
import aboutus from '../assets/welcomeimage.jpg';
import explorebg from '../assets/explorebg.png';
import sigiriya from '../assets/sigiriya.png';
import tour1 from '../assets/tour 1.png';
import tour2 from '../assets/tour 2.png';
import tour3 from '../assets/tour 3.png';
import tour4 from '../assets/tour 4.png';
import tour5 from '../assets/tour 5.png';
import tour6 from '../assets/tour 6.png';
import stay from '../assets/stayimage.jpg';
import customize from '../assets/customize.png';
import backwardarrow from '../assets/backwardarrow.jpg';
import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';
import icon6 from '../assets/6.png';
import icon7 from '../assets/7.png';

// Image map: backend image slug -> local imported asset
const tourImageMap: Record<string, string> = { sigiriya };
const stayImageMap: Record<string, string> = { stay };
const resolveImage = (slug: string, map: Record<string, string>, fallback: string) => {
  if (slug && slug.startsWith('http')) return slug;
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

const renderThemeIcon = (id: number) => {
  const baseClass = "object-contain transition-opacity duration-150 group-hover:opacity-95 mx-auto";
  switch (id) {
    case 1:
      // Mask (wide)
      return <img src={icon1} alt="Theme 1" className={`${baseClass} w-[95%] h-[95%]`} />;
    case 2:
      // Palm tree (tall)
      return <img src={icon2} alt="Theme 2" className={`${baseClass} w-[75%] h-[95%]`} />;
    case 3:
      // Elephant (wide)
      return <img src={icon3} alt="Theme 3" className={`${baseClass} w-[95%] h-[85%]`} />;
    case 4:
      // Kayak (wide)
      return <img src={icon4} alt="Theme 4" className={`${baseClass} w-[90%] h-[90%]`} />;
    case 5:
      // Mortar (wide/compact)
      return <img src={icon5} alt="Theme 5" className={`${baseClass} w-[80%] h-[80%]`} />;
    case 6:
      // Spa bed (wide)
      return <img src={icon6} alt="Theme 6" className={`${baseClass} w-[85%] h-[85%]`} />;
    case 7:
      // Shield (tall/square)
      return <img src={icon7} alt="Theme 7" className={`${baseClass} w-[80%] h-[90%]`} />;
    default:
      return null;
  }
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTheme, setActiveTheme] = useState(1);
  const [_dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  // API state
  const [tours, setTours] = useState<Tour[]>([]);
  const [stays, setStays] = useState<StayItem[]>([]);

  const themes = [
    { id: 1, name: 'Dive into history and traditions' },
    { id: 2, name: 'Unwind by turquoise waters' },
    { id: 3, name: 'Witness nature in its purest form' },
    { id: 4, name: 'Get your adrenaline rush!' },
    { id: 5, name: 'Rejuvenate your soul' },
    { id: 6, name: 'Indulge in exclusivity' },
    { id: 7, name: 'Amazing experiences at great value!' },
  ];
  // responsive grid will handle layout on small screens

  // Fetch tours from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/packages')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setTours(json.data.map((pkg: any) => ({
            id: pkg.id,
            title: pkg.package_name,
            short_description: pkg.short_description,
            location: pkg.location,
            price: `5$ - ${pkg.base_price}$`,
            rating: pkg.rating,
            reviews: pkg.reviews,
            duration: `${pkg.duration_days} day${pkg.duration_days !== 1 ? 's' : ''}`,
            category: pkg.category,
            image: resolveImage(pkg.image, tourImageMap, sigiriya),
          })));
        }
      })
      .catch(() => {
        setTours([
          { id: '1', title: 'Temple of the Tooth', location: 'Kandy, Sri Lanka', price: '10$ - 50$', rating: 4.8, reviews: 142, duration: '1 day', category: 'Heritage', image: sigiriya },
          { id: '2', title: 'Nine Arch Bridge', location: 'Ella, Sri Lanka', price: '5$ - 20$', rating: 4.9, reviews: 320, duration: '1 day', category: 'Nature', image: sigiriya },
          { id: '3', title: 'Thalpe Beach', location: 'Thalpe, Sri Lanka', price: '10$ - 40$', rating: 4.7, reviews: 215, duration: '2 days', category: 'Relax', image: sigiriya },
          { id: '4', title: 'Sigiriya Rock Fortress', location: 'Sigiriya, Sri Lanka', price: '30$ - 150$', rating: 4.9, reviews: 450, duration: '1 day', category: 'Heritage', image: sigiriya },
          { id: '5', title: 'Galle Dutch Fort', location: 'Galle, Sri Lanka', price: '15$ - 80$', rating: 4.8, reviews: 290, duration: '1 day', category: 'Heritage', image: sigiriya },
          { id: '6', title: 'Nuwara Eliya Tea Estates', location: 'Nuwara Eliya, Sri Lanka', price: '20$ - 100$', rating: 4.6, reviews: 180, duration: '2 days', category: 'Nature', image: sigiriya },
          { id: '7', title: 'Mirissa Whale Watching', location: 'Mirissa, Sri Lanka', price: '40$ - 120$', rating: 4.5, reviews: 260, duration: '1 day', category: 'Adventure', image: sigiriya },
          { id: '8', title: 'Yala National Park Safari', location: 'Yala, Sri Lanka', price: '50$ - 200$', rating: 4.8, reviews: 380, duration: '1 day', category: 'Wildlife', image: sigiriya },
        ]);
      });
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Ethan Wilson',
      country: 'Sweden',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Ethan Wilson',
      country: 'Sweden',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Ethan Wilson',
      country: 'Sweden',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=200&auto=format&fit=crop'
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
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (err) { }
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
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch (err) { }
    const threshold = 60;
    if (dx < -threshold) nextTestimonial();
    else if (dx > threshold) prevTestimonial();
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setDragOffset(0);
    try { e.currentTarget.releasePointerCapture?.(e.pointerId); } catch (err) { }
  };

  const toursRef = useRef<HTMLDivElement | null>(null);
  const scrollPrevTours = () => {
    const el = toursRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: -amount, behavior: 'smooth' });
  };
  const scrollNextTours = () => {
    const el = toursRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const staysRef = useRef<HTMLDivElement | null>(null);
  const scrollPrevStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: -amount, behavior: 'smooth' });
  };
  const scrollNextStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    const amount = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Fetch stays from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/stays')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setStays(json.data.map((s: any) => ({
            id: s.id,
            name: s.name,
            location: s.location,
            rating: s.rating,
            image: resolveImage(s.image, stayImageMap, stay),
            featured: s.featured,
          })));
        }
      })
      .catch(() => {
        setStays([
          { id: '1', name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: true },
          { id: '2', name: 'Heritance Kandalama', location: 'Dambulla, Central Province', rating: 4.8, image: stay, featured: false },
          { id: '3', name: 'Cape Weligama', location: 'Weligama, Southern Province', rating: 4.7, image: stay, featured: false },
          { id: '4', name: 'Jetwing Surf', location: 'Arugam Bay, Eastern Province', rating: 4.6, image: stay, featured: false },
          { id: '5', name: 'Wild Coast Tented Lodge', location: 'Yala, Southern Province', rating: 4.9, image: stay, featured: false },
          { id: '6', name: 'Santani Wellness Resort', location: 'Kandy, Central Province', rating: 4.7, image: stay, featured: false },
          { id: '7', name: 'Tri Lanka', location: 'Koggala Lake, Southern Province', rating: 4.8, image: stay, featured: false },
          { id: '8', name: 'The Fortress Resort', location: 'Koggala, Southern Province', rating: 4.6, image: stay, featured: false },
        ]);
      });
  }, []);

  const destinationDescription = 'Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach.';

  const destinationCards = [
    { id: 1, name: 'Nine Arch', image: tour1, wide: true, description: destinationDescription },
    { id: 2, name: 'Thalpe', image: tour2, wide: false, description: destinationDescription },
    { id: 3, name: 'Nine Arch', image: tour3, wide: false, description: destinationDescription },
    { id: 4, name: 'Nine Arch', image: tour4, wide: false, description: destinationDescription },
    { id: 5, name: 'Thalpe', image: tour5, wide: false, description: destinationDescription },
    { id: 6, name: 'Thalpe', image: tour6, wide: true, description: destinationDescription },
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
      <section className="relative w-full h-[100svh] min-h-[560px] flex flex-col justify-center items-center text-center text-secondary overflow-hidden">
        <img
          src={heroBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_25%] sm:object-[center_40%] md:object-[center_50%] lg:object-[center_45%]"
        />

        <div className="absolute top-0 left-0 w-full h-14 md:h-24 lg:h-[118px] bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[28%] min-h-[180px] bg-gradient-to-t from-white from-15% via-white/45 via-70% to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center px-4 pt-[110px] pb-36 sm:pb-40 md:pb-44 w-full max-w-5xl mx-auto">
          <div className="w-full flex justify-end mb-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-4 xl:-right-12 lg:mb-0 lg:w-auto z-30">
            <div className="flex flex-row lg:flex-col gap-3 items-center">
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <button
                  key={index}
                  onClick={() => setHeroSlide(index)}
                  className={`rounded-full transition-all duration-300 flex items-center justify-center shrink-0 ${
                    heroSlide === index
                      ? 'w-[36px] h-[33px] sm:w-[48px] sm:h-[48px] border-[2.5px] border-[#01888E]/80 p-[2px] sm:p-[3px] bg-transparent'
                      : 'w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] bg-white/70 hover:bg-white'
                  } cursor-pointer`}
                >
                  {heroSlide === index && (
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center ring-2 ring-white/80"
                      style={{ backgroundImage: `url(${heroBanner})` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <h1 className="font-kaisei text-[36px] md:text-[44px] leading-[48px] text-white tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.20)] text-center">Find Your Perfect Gateway</h1>
          <p className="font-alex text-[28px] md:text-[36px] leading-[40px] text-white mt-2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] text-center">Crafted Just for You!</p>

          <div className="flex flex-col items-center mt-4 w-full">
            <p className="font-sans text-[14px] md:text-[15px] leading-[20px] text-white/95 font-medium drop-shadow-sm mb-3 text-center">Tailored Experiences, Unmatched Adventures</p>
            <div className="w-[280px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-5" />
          </div>

          <div className="flex flex-row justify-center gap-2 sm:gap-4 mt-1 items-stretch w-full px-4 md:px-0">
            <button className="flex-1 sm:flex-none px-2 sm:px-6 py-1.5 sm:py-3 rounded-[6px] sm:rounded-[8px] bg-[#E2E8F0]/95 backdrop-blur-sm text-[#003032] font-sans font-bold text-[8px] sm:text-[13px] leading-[10px] sm:leading-[18px] uppercase tracking-normal sm:tracking-wide whitespace-normal sm:whitespace-nowrap shadow-[0px_4px_12px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center sm:w-[240px] hover:bg-white">
              LET'S START YOUR JOURNEY
            </button>
            <button className="flex-1 sm:flex-none px-2 sm:px-6 py-1.5 sm:py-3 rounded-[6px] sm:rounded-[8px] bg-[#01888E] text-white font-sans font-bold text-[8px] sm:text-[13px] leading-[10px] sm:leading-[18px] uppercase tracking-normal sm:tracking-wide whitespace-normal sm:whitespace-nowrap shadow-[0px_4px_12px_rgba(1,136,142,0.3)] transition-colors flex items-center justify-center sm:w-[240px] hover:bg-[#006D6D]">
              BUILD MY TRIP
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-0 bg-white max-w-7xl mx-auto text-center relative z-20">
        <p className="text-[13px] text-[#003032] font-sans max-w-[800px] mx-auto leading-[18px] text-center px-4 font-normal whitespace-pre-line mb-8 sm:mb-10">
          We offer <span className="font-bold text-[#01888E]">seven</span> extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka.{'\n'}Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
        </p>
        <div className="flex flex-row items-stretch justify-start lg:justify-center lg:gap-4 gap-1 sm:gap-2 pb-0 px-4 sm:px-6 md:px-8 max-w-[1100px] mx-auto overflow-hidden">
          {themes.map((theme) => {
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`group flex flex-col items-center justify-center gap-1 lg:gap-3 rounded-[10px] p-1 flex-shrink-0 w-[calc((100%_-_18px)/7)] max-w-[calc((100%_-_18px)/7)] min-w-0 bg-[#EAF5F5] cursor-pointer h-[96px] sm:h-[104px] lg:w-[109px] lg:max-w-[109px] lg:h-[171px]`}
                aria-pressed={activeTheme === theme.id}
              >
                <div className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[72px] lg:h-[72px] flex items-center justify-center">
                  {renderThemeIcon(theme.id)}
                </div>
                <span className={`text-[7px] sm:text-[8px] md:text-[9px] lg:text-[14px] font-bold text-center leading-[8.5px] sm:leading-[9.5px] md:leading-[11px] lg:leading-[18px] text-[#003032] whitespace-pre-line break-words max-w-full`}>{theme.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="pt-2 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-petemoss text-[56px] md:text-[96px] text-[#01888E]">Hello !</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: framed image */}
            <div className="flex-shrink-0 w-full md:w-[420px]">
              <div className="bg-white rounded-[18px] p-4 inline-block">
                <img
                  src={aboutus}
                  alt="About Hej Ceylon"
                  className="w-[360px] md:w-[392px] h-auto md:h-[352px] object-cover rounded-[12px]"
                />
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col max-w-[700px]">
              <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: 'Inter' }}>ABOUT US</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                Who We <span className="text-[#01888E]">Are</span>
              </h3>

              <div className="text-[16px] font-bold text-[#003032] mb-4" style={{ fontFamily: 'Inter' }}>Your Trusted Travel Companion</div>

              <div className="text-[14px] font-normal text-[#003032] leading-[22px] space-y-4" style={{ fontFamily: 'Inter' }}>
                <p>At <strong className="text-[#01888E]">Hej Ceylon</strong>, we don't just plan trips—we create memories that last a lifetime!</p>
                <p>We are a <strong className="text-[#01888E]">Sri Lanka &amp; Sweden-based</strong> travel service, built on trust, care, and an unshakable commitment to <strong>hospitality, customer satisfaction, and safety</strong>. Whether you're exploring breathtaking landscapes or diving into rich culture, we ensure a <strong>seamless, secure, and heartfelt travel experience</strong>.</p>
                <p><strong>Let us take you beyond the ordinary—because your journey matters!</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section (background: explorebg.png) */}
      <section className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-6">
            <div className="max-w-[800px]">
              <span className="text-[#01888E] text-[11px] font-normal uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Explore Sri Lanka</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                <span className="font-light">A Land of </span>
                <span className="font-bold text-[#01888E]">Diverse Wonders!</span>
              </h3>
              <p className="text-[13px] leading-[18px] text-[#003032] font-normal whitespace-pre-line" style={{ fontFamily: 'Inter' }}>
                We offer <span className="font-bold">seven</span> extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka. Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-end mt-3 md:mt-0">
              <div className="flex gap-[2px] md:mr-2">
                <button onClick={scrollPrevTours} aria-label="Previous tours" className="w-10 h-8 bg-[#01888E] rounded-l-full rounded-r-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={scrollNextTours} aria-label="Next tours" className="w-10 h-8 bg-[#01888E] rounded-r-full rounded-l-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div ref={(el) => { toursRef.current = el; }} className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {tours.map((tour) => (
              <div key={tour.id} className="snap-start flex-shrink-0 w-[calc(25%-15px)] min-w-[260px] bg-white rounded-[12px] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col">
                {/* Image area */}
                <div className="relative w-full h-[180px] bg-gray-100 shrink-0">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Rating badge top-left */}
                  <div className="absolute left-3 top-3 bg-[#0BA77A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[#FFC600] text-[12px]">★</span>
                    <span>{tour.rating}</span>
                  </div>

                  {/* Heart top-right */}
                  <button aria-label="favorite" className="absolute right-3 top-3 w-7 h-7 bg-white/20 border border-white rounded-full flex items-center justify-center backdrop-blur-sm">
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
                  <div className="flex items-center gap-2 mb-2 text-[12px] font-bold" style={{ fontFamily: 'Inter' }}>
                    <span className="text-[#01888E]">{tour.reviews} Ratings</span>
                    <span className="text-gray-300 font-light">|</span>
                    <span className="text-gray-600 font-normal">
                      From <span className="text-[#FF2A2A] font-bold">{tour.price}</span>
                    </span>
                  </div>

                  <p className="text-[12px] text-[#4A4A4A] leading-relaxed mb-4 tracking-wide" style={{ fontFamily: 'Inter' }}>
                    {tour.short_description ?? 'Discover the beauty of Sri Lanka with this exclusive tour package.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[13px] text-[#01888E] font-bold" style={{ fontFamily: 'Inter' }}>{tour.category}</div>
                      <div className="text-[11px] text-[#003032] font-bold mt-0.5" style={{ fontFamily: 'Inter' }}>{tour.duration}</div>
                    </div>
                    <button aria-label="share" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-colors hover:text-[#01888E]">
                      <img src={backwardarrow} alt="Backward arrow" className="h-4 w-4 object-contain" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

          <div className="flex justify-center mt-6">
            <button className="px-8 py-3 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors" style={{ fontFamily: 'Inter' }}>
              Explore All Tours
            </button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Reach Your Dream Destination</span>
            <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Your Adventure</span>{' '}
              <span className="font-bold text-[#01888E]">Starts Here!</span>
            </h3>
            <div className="mx-auto mb-4 h-[1px] w-[78px] rounded-full" style={{ backgroundImage: 'linear-gradient(90deg, #01888E 51%, #FFFFFF 81%)' }} />
            <p className="text-[14px] leading-[22px] text-[#757575] font-normal max-w-[800px]" style={{ fontFamily: 'Inter' }}>
              Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach. With us, you don't just travel—you{' '}
              <span className="font-bold text-[#003032]">experience Sri Lanka like never before</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-2">
            {destinationCards.map((card) => (
              <div
                key={card.id}
                className={`${card.wide ? 'md:col-span-2' : 'md:col-span-1'} h-[220px] sm:h-[240px] md:h-[260px] lg:h-[300px] rounded-[12px] overflow-hidden relative cursor-pointer group`}
              >
                <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-white from-15% via-white/45 via-55% to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white from-20% via-white/55 via-70% to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute left-5 bottom-5 right-5 z-10">
                  <h4 className={`font-bold text-[#003032] ${card.wide ? 'text-[22px]' : 'text-[18px] md:text-[20px]'}`}>
                    {card.name}
                  </h4>
                  <div className="w-20 h-[1px] rounded-full bg-gradient-to-r from-[#01888E] via-[#01888E] to-white mt-1.5 mb-2" />
                  <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className={`text-[#003032]/75 leading-snug ${card.wide ? 'text-[12px] md:text-[13px] max-w-[92%]' : 'text-[11px] md:text-[12px]'}`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-8 py-3.5 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors" style={{ fontFamily: 'Inter' }}>
              Start Your Adventure Today
            </button>
          </div>
        </div>
      </section>


      {/* Stays Section (background: explorebg.png) */}
      <section className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-6">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>STAYS</span>
            <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Stay In</span> <span className="font-bold text-[#01888E]">Sri Lanka</span>
            </h3>
            <div className="flex flex-col items-stretch gap-6">
              <p className="text-[13px] leading-[18px] text-[#003032] font-normal max-w-[1500px] mt-4" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>

              {/* Carousel Navigation Buttons */}
              <div className="flex justify-end mt-3 md:mt-0 shrink-0">
                <div className="flex gap-[2px] md:mr-2">
                  <button onClick={scrollPrevStays} aria-label="Previous stays" className="w-10 h-8 bg-[#01888E] rounded-l-full rounded-r-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button onClick={scrollNextStays} aria-label="Next stays" className="w-10 h-8 bg-[#01888E] rounded-r-full rounded-l-none flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref={(el) => { staysRef.current = el; }} className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {stays.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 w-[calc(25%-15px)] min-w-[260px]">
                <div className="relative rounded-[12px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer group h-[260px] bg-white">
                  {/* Image and overlay container */}
                  <div className="absolute inset-x-0 top-0 h-[180px] group-hover:h-full transition-all duration-500 ease-in-out bg-gray-200 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Rating badge top-left */}
                  <div className="absolute top-3 left-3 bg-[#01888E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px] flex items-center gap-1 z-20">
                    <Star className="fill-[#FFC600] text-[#FFC600]" size={11} />
                    <span>{item.rating}</span>
                  </div>

                  {/* Wishlist button top-right */}
                  <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition z-20">
                    <Heart size={14} className="stroke-[2.5]" />
                  </button>

                  {/* Card Info Content */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-white group-hover:bg-transparent transition-all duration-500 ease-in-out flex flex-col justify-center h-[80px] z-10">
                    <h4 className="text-[15px] font-bold text-[#003032] group-hover:text-white mb-1.5 transition-colors duration-500" style={{ fontFamily: 'Inter' }}>
                      {item.name}
                    </h4>
                    <div className="flex items-center text-[#757575] group-hover:text-white/90 text-[12px] transition-colors duration-500" style={{ fontFamily: 'Inter' }}>
                      <MapPin size={12} className="mr-1 text-[#01888E] group-hover:text-white shrink-0 transition-colors duration-500" />
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-8 py-3 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors" style={{ fontFamily: 'Inter' }}>
              View All
            </button>
          </div>
        </div>
      </section>



      {/* Customize CTA Section */}
      <section className="relative w-full bg-white overflow-hidden">
        {/* Full-width background image */}
        <div
          className="relative w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${customize})`, height: '585px' }}
        >
          {/* White fade at top */}
          <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />

          {/* White fade at sides */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Floating card anchored to bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center px-4 translate-y-[40%] z-10">
            <div className="bg-white w-full max-w-[800px] mx-auto rounded-[20px] shadow-[0px_8px_40px_rgba(0,0,0,0.10)] px-8 py-10 text-center">
              <h3 className="text-[#003032] font-bold text-[20px] md:text-[22px] leading-tight mb-4" style={{ fontFamily: 'Inter' }}>
                Let's Customize Your <span className="text-[#01888E]">Dream Tour</span> Today!
              </h3>
              <p className="text-[13px] md:text-[14px] text-[#757575] leading-relaxed max-w-[700px] mx-auto mb-7" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <button className="px-12 py-3 bg-[#01888E] text-white rounded-[10px] text-[15px] font-bold shadow-[0px_4px_16px_rgba(1,136,142,0.35)] hover:bg-[#006D6D] transition-colors min-w-[180px]" style={{ fontFamily: 'Inter' }}>
                Customize
              </button>
            </div>
          </div>
        </div>

        {/* Spacer so next section doesn't overlap the card */}
        <div className="h-[220px] bg-white" />
      </section>



      {/* Testimonials Section */}
      <section className="relative py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-8 text-left">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>TESTIMONIALS</span>
            <h2 className="text-[28px] md:text-[34px] leading-tight text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">What Our</span> <span className="font-bold text-[#01888E]">Clients Say</span>
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
              const cardWidth = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 300 : 340) : 340;
              const translateX = `translateX(${position * (cardWidth + (typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 24))}px)`;

              return (
                <div
                  key={testimonial.id}
                  className={`absolute ease-in-out ${isActive ? 'z-30' : 'z-10'}`}
                  style={{
                    transform: `${translateX}${isActive ? ' translateY(-8px) scale(1.03)' : ' scale(0.92)'}`,
                    transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out`,
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  <div
                    className={`relative bg-white rounded-[24px] px-6 py-8 sm:px-8 sm:py-9 text-center overflow-hidden transition-all duration-700 flex flex-col items-center ${
                      isActive
                        ? 'w-[260px] sm:w-[300px] lg:w-[360px] min-h-[380px] shadow-[0px_8px_32px_rgba(1,136,142,0.18)]'
                        : 'w-[240px] sm:w-[280px] lg:w-[320px] min-h-[320px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    <div className="absolute top-6 left-6 text-[#01888E] pointer-events-none select-none">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                      </svg>
                    </div>

                    <div
                      className={`rounded-full bg-cover bg-center ring-[4px] ring-[#01888E]/20 border-2 border-[#01888E] z-10 mt-2 ${isActive ? 'w-[80px] h-[80px] sm:w-[88px] sm:h-[88px]' : 'w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]'}`}
                      style={{ backgroundImage: `url(${testimonial.avatar})`, boxShadow: '0 4px 14px rgba(1, 136, 142, 0.3)' }}
                    />

                    <div className="flex justify-center gap-1 mt-5 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={isActive ? 16 : 14} className="text-[#FFC600] fill-[#FFC600]" />
                      ))}
                    </div>

                    <p
                      className={`italic text-[#003032]/80 mb-6 px-2 sm:px-4 ${isActive ? 'text-[12px] leading-[20px]' : 'text-[11px] leading-[18px]'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      "{testimonial.text}"
                    </p>

                    <div className="mt-auto">
                      <h3 className={`text-[#003032] font-bold ${isActive ? 'text-[18px] mb-1' : 'text-[15px] mb-0.5'}`} style={{ fontFamily: 'Inter' }}>
                        {testimonial.name}
                      </h3>
                      <p className={`text-[#01888E] font-semibold ${isActive ? 'text-[14px]' : 'text-[12px]'}`} style={{ fontFamily: 'Inter' }}>
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
                aria-label={`Go to testimonial ${index + 1}`}
                className={`rounded-full transition-all flex items-center justify-center ${currentSlide === index
                  ? 'w-[18px] h-[18px] border-[2px] border-[#01888E] bg-white'
                  : 'w-[14px] h-[14px] bg-white border border-[#01888E]/40 hover:border-[#01888E]/60'
                  }`}
              >
                {currentSlide === index && <div className="w-[10px] h-[10px] bg-[#01888E] rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;