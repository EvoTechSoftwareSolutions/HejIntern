import { useState, useRef, useEffect } from 'react';
import { Heart, Star, User, ChevronLeft, CornerUpRight, MapPin } from 'lucide-react';
import heroBanner from '../assets/herobanner.png';
import React from "react";
import aboutus from '../assets/aboutus.png';
import explorebg from '../assets/explorebg.png';
import sigiriya from '../assets/sigiriya.png';
import ninearch from '../assets/ninearch.png';
import thalpe from '../assets/thalpe.png';
import stay from '../assets/stayimage.jpg';
import customize from '../assets/customize.png';
import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';
import icon6 from '../assets/6.png';
import icon7 from '../assets/7.png';

const renderThemeIcon = (id: number) => {
  const iconClass = "w-full h-full object-contain transition-opacity duration-150 group-hover:opacity-95";
  switch (id) {
    case 1:
      return <img src={icon1} alt="Theme 1" className={iconClass} />;
    case 2:
      return <img src={icon2} alt="Theme 2" className={iconClass} />;
    case 3:
      return <img src={icon3} alt="Theme 3" className={iconClass} />;
    case 4:
      return <img src={icon4} alt="Theme 4" className={iconClass} />;
    case 5:
      return <img src={icon5} alt="Theme 5" className={iconClass} />;
    case 6:
      return <img src={icon6} alt="Theme 6" className={iconClass} />;
    case 7:
      return <img src={icon7} alt="Theme 7" className={iconClass} />;
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

  const themes = [
    { id: 1, name: 'Dive into\nhistory and\ntraditions', bgColor: 'bg-[#2DC7F8]', shadow: 'shadow-[#2DC7F8]/50', textColor: 'text-white', iconColor: 'white' },
    { id: 2, name: 'Unwind by\nturquoise\nwaters', bgColor: 'bg-[#0E4751]', shadow: 'shadow-[#0E4751]/50', textColor: 'text-white', iconColor: 'white' },
    { id: 3, name: 'Witness\nnature in its\npurest form', bgColor: 'bg-[#107A76]', shadow: 'shadow-[#107A76]/50', textColor: 'text-white', iconColor: 'white' },
    { id: 4, name: 'Get your\nadrenaline\nrush!', bgColor: 'bg-[#FFC600]', shadow: 'shadow-[#FFC600]/50', textColor: 'text-[#003032]', iconColor: '#003032' },
    { id: 5, name: 'Rejuvenate\nyour soul', bgColor: 'bg-[#FFA800]', shadow: 'shadow-[#FFA800]/50', textColor: 'text-[#003032]', iconColor: '#003032' },
    { id: 6, name: 'Indulge in\nexclusivity', bgColor: 'bg-[#FFB094]', shadow: 'shadow-[#FFB094]/50', textColor: 'text-[#003032]', iconColor: '#003032' },
    { id: 7, name: 'Amazing\nexperiences at\ngreat value!', bgColor: 'bg-[#FF6B74]', shadow: 'shadow-[#FF6B74]/50', textColor: 'text-[#003032]', iconColor: '#003032' },
  ];
  // responsive grid will handle layout on small screens

  const tours = [
    {
      id: 1,
      title: 'Kandy Spice Villa',
      location: 'Kandy, Sri Lanka',
      price: '5$ - 1000$',
      rating: 4.5,
      reviews: 14,
      duration: '3 days',
      category: 'Adventure',
      image: sigiriya
    },
    {
      id: 2,
      title: 'Nine Arch Retreat',
      location: 'Ella, Sri Lanka',
      price: '50$ - 300$',
      rating: 4.8,
      reviews: 42,
      duration: '2 days',
      category: 'Nature',
      image: sigiriya
    },
    {
      id: 3,
      title: 'Thalpe Beach Hut',
      location: 'Thalpe, Sri Lanka',
      price: '30$ - 200$',
      rating: 4.6,
      reviews: 31,
      duration: '4 days',
      category: 'Relax',
      image: sigiriya
    },
    {
      id: 4,
      title: 'Sigiriya Sunrise Stay',
      location: 'Sigiriya, Sri Lanka',
      price: '40$ - 250$',
      rating: 4.7,
      reviews: 28,
      duration: '3 days',
      category: 'Heritage',
      image: sigiriya
    },
  ];

  // (removed unused uniform stay constants)

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
    {
      id: 4,
      name: 'Ethan Wilson',
      country: 'Sweden',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
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
    const amount = el.clientWidth * 0.9 || 320;
    el.scrollBy({ left: -amount, behavior: 'smooth' });
  };
  const scrollNextTours = () => {
    const el = toursRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9 || 320;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const staysRef = useRef<HTMLDivElement | null>(null);
  const scrollPrevStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9 || 320;
    el.scrollBy({ left: -amount, behavior: 'smooth' });
  };
  const scrollNextStays = () => {
    const el = staysRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9 || 320;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const stays = [
    { id: 1, name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: true },
    { id: 2, name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: false },
    { id: 3, name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: false },
    { id: 4, name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: false },
  ];

  const destinationDescription = 'Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach.';

  const destinationCards = [
    { id: 1, name: 'Nine Arch', image: ninearch, wide: true, description: destinationDescription },
    { id: 2, name: 'Thalpe', image: thalpe, wide: false, description: destinationDescription },
    { id: 3, name: 'Nine Arch', image: ninearch, wide: false, description: destinationDescription },
    { id: 4, name: 'Nine Arch', image: ninearch, wide: false, description: destinationDescription },
    { id: 5, name: 'Thalpe', image: thalpe, wide: false, description: destinationDescription },
    { id: 6, name: 'Thalpe', image: thalpe, wide: true, description: destinationDescription },
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
    <div className="w-full font-sans text-dark bg-white overflow-hidden pt-[110px] md:pt-[110px] lg:pt-0">

      {/* Hero Section */}
      <section className="relative w-full h-[520px] md:h-[640px] flex flex-col justify-center items-center text-center text-secondary mt-0">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBanner})` }} />

        <div className="absolute top-0 left-0 w-full h-[118px] bg-gradient-to-b from-white/90 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[272px] bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

          <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 flex flex-col gap-3 items-center">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <button key={index} onClick={() => setHeroSlide(index)} className={`rounded-full transition-all flex items-center justify-center ${heroSlide === index ? 'w-[44px] h-[44px] border-[2px] border-[#01888E] p-[3px]' : 'w-[6px] h-[6px] bg-white hover:bg-gray-200'} cursor-pointer`}>
                {heroSlide === index && <img src={heroBanner} className="w-full h-full rounded-full object-cover ring-2 ring-white" alt="" />}
              </button>
            ))}
          </div>

        <div className="relative z-20 flex flex-col items-center mt-16 px-4">
          <h1 className="font-kaisei text-[40px] md:text-[40px] leading-[48px] font-bold text-white tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">FIND YOUR PERFECT GETAWAY</h1>
          <p className="font-alex text-[28px] md:text-[34px] leading-[40px] text-white mt-2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">Crafted Just for You!</p>

          <div className="flex flex-col items-center mt-4 w-full">
            <p className="font-sans text-[14px] leading-[18px] text-white/90 font-normal drop-shadow-sm mb-4">Tailored Experiences, Unmatched Adventures</p>
            <div className="w-[300px] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-2 items-center w-full px-4 md:px-0">
            <button className="px-10 py-3.5 rounded-[12px] bg-white/90 backdrop-blur-sm text-[#003032] font-sans font-bold text-[14px] leading-[18px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center w-full sm:w-[260px] hover:bg-white">
              Let's Start Your Journey
            </button>
            <button className="px-10 py-3.5 rounded-[12px] bg-[#01888E] text-white font-sans font-bold text-[14px] leading-[18px] shadow-[0px_4px_12px_rgba(1,136,142,0.3)] transition-colors flex items-center justify-center w-full sm:w-[260px] hover:bg-[#006D6D]">
              Build My Trip
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white max-w-7xl mx-auto text-center mt-2">
        <p className="text-[17px] text-[#003032] font-sans max-w-[800px] mx-auto mb-6 leading-[28px] text-center px-4 font-normal">
          We offer <span className="font-bold text-[#01888E]">seven</span> extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka. Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 pb-8 px-2 md:px-4 max-w-[1100px] mx-auto justify-center">
          {themes.map((theme) => {
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`group flex flex-col items-center justify-start gap-2 rounded-[12px] p-3 w-[120px] sm:w-[140px] bg-[#EAF5F5] cursor-pointer`}
                aria-pressed={activeTheme === theme.id}
              >
                <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[96px] md:h-[96px] flex items-center justify-center pt-1">
                  {renderThemeIcon(theme.id)}
                </div>
                <span className={`text-[11px] md:text-[12px] font-semibold text-center leading-[14px] text-[#003032] whitespace-pre-line`}>{theme.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-petemoss text-[56px] md:text-[96px] text-[#01888E]">Hello !</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: framed image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="bg-white rounded-[18px] p-4 inline-block">
                <img
                  src={aboutus}
                  alt="About Hej Ceylon"
                  className="w-full max-w-[400px] h-auto md:h-[420px] object-cover rounded-[12px]"
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div className="max-w-[800px]">
              <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Explore Sri Lanka</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                <span className="font-light">A Land of </span>
                <span className="font-bold text-[#01888E]">Diverse Wonders!</span>
              </h3>
              <p className="text-[14px] leading-[22px] text-[#003032] font-normal" style={{ fontFamily: 'Inter' }}>
                We offer seven extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka. Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-end mt-3">
              <div className="flex gap-1 shrink-0 mr-0 md:mr-16">
                <button onClick={scrollPrevTours} aria-label="Previous tours" className="w-[34px] h-[28px] bg-[#01888E] rounded-[14px_0_0_14px] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={scrollNextTours} aria-label="Next tours" className="w-[34px] h-[28px] bg-[#01888E] rounded-[0_14px_14px_0] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            </div>
          </div>

          <div ref={(el) => { toursRef.current = el; }} className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-4 md:gap-5">
            {tours.map((tour) => (
              <div key={tour.id} className="snap-start min-w-[85%] sm:min-w-[48%] md:min-w-0 bg-white rounded-[12px] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col flex-shrink-0">
                {/* Image area */}
                <div className="relative w-full h-[180px] bg-gray-100 shrink-0">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Rating badge top-left */}
                  <div className="absolute left-3 top-3 bg-[#0BA77A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="text-[#FFC600] text-[12px]">★</span>
                    <span>4.5</span>
                  </div>

                  {/* Heart top-right */}
                  <button aria-label="favorite" className="absolute right-3 top-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Heart size={14} className="text-[#003032] fill-none" />
                  </button>

                  {/* Text overlay bottom-left */}
                  <div className="absolute left-3 bottom-3 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-white text-[12px] font-semibold">
                      <User size={13} className="text-white fill-white/20" />
                      <span>Lorem Ipsum Is Simply</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-medium">
                      <Star size={11} className="text-white fill-white/20" />
                      <span>Lorem Ipsum Is Simply</span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div className="flex items-center gap-2 mb-2 text-[12px] font-bold" style={{ fontFamily: 'Inter' }}>
                    <span className="text-[#01888E]">{tour.reviews} Ratings</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 font-normal">
                      From <span className="text-[#FFA800] font-bold">{tour.price}</span>
                    </span>
                  </div>

                  <p className="text-[12px] text-gray-500 leading-relaxed mb-4" style={{ fontFamily: 'Inter' }}>
                    Lorem Ipsum is simply dummy text of the printing and type setting industry.
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[13px] text-[#01888E] font-bold" style={{ fontFamily: 'Inter' }}>{tour.category}</div>
                      <div className="text-[11px] text-gray-400 font-medium mt-0.5" style={{ fontFamily: 'Inter' }}>{tour.duration}</div>
                    </div>
                    <button aria-label="share" className="text-gray-400 hover:text-[#01888E] transition-colors">
                      <CornerUpRight size={18} />
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
      <section className="py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Reach Your Dream Destination</span>
            <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Your Adventure</span> <span className="font-bold text-[#01888E]">Starts Here!</span>
            </h3>
            <p className="text-[14px] leading-[22px] text-[#757575] font-normal max-w-[800px]" style={{ fontFamily: 'Inter' }}>
              Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach. With us, you don't just travel—you experience Sri Lanka like never before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
            {destinationCards.map((card) => (
              <div
                key={card.id}
                className={`group ${card.wide ? 'md:col-span-2' : 'md:col-span-1'} h-[220px] sm:h-[250px] md:h-[260px] rounded-[14px] overflow-hidden relative cursor-pointer`}
              >
                <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
                <div className="absolute left-5 bottom-5 right-5 z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h4 className={`font-bold text-[#003032] ${card.wide ? 'text-[22px]' : 'text-[20px]'}`} style={{ fontFamily: 'Inter' }}>
                    {card.name}
                  </h4>
                  <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-in-out">
                    <p className={`text-[#003032]/75 leading-snug pt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150 ${card.wide ? 'text-[13px] max-w-[90%]' : 'text-[11px]'}`} style={{ fontFamily: 'Inter' }}>
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-8 py-3.5 bg-[#01888E] text-white rounded-full text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.25)] hover:bg-[#006D6D] transition-colors" style={{ fontFamily: 'Inter' }}>
              Start Your Adventure Today
            </button>
          </div>
        </div>
      </section>


      {/* Stays Section (background: explorebg.png) */}
      <section className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div className="max-w-[800px]">
              <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>STAYS</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">Stay In</span> <span className="font-bold text-[#01888E]">Sri Lanka</span>
              </h3>
              <p className="text-[14px] leading-[22px] text-[#003032] font-normal max-w-[600px]" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="flex justify-end mt-3">
              <div className="flex gap-1 shrink-0 mr-0 md:mr-16">
                <button onClick={scrollPrevStays} aria-label="Previous stays" className="w-[34px] h-[28px] bg-[#01888E] rounded-[14px_0_0_14px] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={scrollNextStays} aria-label="Next stays" className="w-[34px] h-[28px] bg-[#01888E] rounded-[0_14px_14px_0] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            </div>
          </div>

          <div ref={(el) => { staysRef.current = el; }} className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-4 md:gap-5 md:overflow-visible">
            {stays.map((item) => (
              <div key={item.id} className="snap-start min-w-[85%] sm:min-w-[48%] md:min-w-0 flex-shrink-0">
                {item.featured ? (
                  <div className="relative rounded-[12px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer group">
                    <div className="relative w-full h-[240px] bg-gray-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                      <div className="absolute top-3 left-3 bg-[#01888E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                        <Star className="fill-[#FFC600] text-[#FFC600]" size={11} />
                        <span>{item.rating}</span>
                      </div>

                      <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition">
                        <Heart size={14} className="stroke-[2.5]" />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-[16px] font-bold text-white mb-1" style={{ fontFamily: 'Inter' }}>{item.name}</h4>
                        <div className="flex items-center text-white/90 text-[12px]" style={{ fontFamily: 'Inter' }}>
                          <MapPin size={12} className="mr-1 shrink-0" /> {item.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-[12px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.08)] cursor-pointer group flex flex-col">
                    <div className="relative w-full h-[180px] bg-gray-200 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />

                      <div className="absolute top-3 left-3 bg-[#01888E] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px] flex items-center gap-1">
                        <Star className="fill-[#FFC600] text-[#FFC600]" size={11} />
                        <span>{item.rating}</span>
                      </div>

                      <button aria-label="Add to wishlist" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/50 transition">
                        <Heart size={14} className="stroke-[2.5]" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h4 className="text-[15px] font-bold text-[#003032] mb-1.5" style={{ fontFamily: 'Inter' }}>{item.name}</h4>
                      <div className="flex items-center text-[#757575] text-[12px]" style={{ fontFamily: 'Inter' }}>
                        <MapPin size={12} className="mr-1 text-[#01888E] shrink-0" /> {item.location}
                      </div>
                    </div>
                  </div>
                )}
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
      <section className="relative w-full bg-white">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] bg-cover bg-center" style={{ backgroundImage: `url(${customize})` }}>
          <div className="absolute top-0 left-0 w-full h-36 sm:h-44 bg-gradient-to-b from-white from-40% via-white/90 to-transparent pointer-events-none" />

          <div className="absolute left-0 right-0 bottom-0 translate-y-[45%] flex justify-center px-4 sm:px-6 z-10">
            <div className="bg-white max-w-3xl w-full md:w-[720px] mx-auto rounded-[24px] shadow-[0px_8px_32px_rgba(0,0,0,0.12)] px-8 py-10 md:px-12 md:py-12">
              <h3 className="text-center text-[#003032] font-bold text-[24px] md:text-[28px] leading-tight mb-5" style={{ fontFamily: 'Inter' }}>
                Let's Customize Your <span className="text-[#01888E]">Dream Tour</span> Today!
              </h3>
              <p className="text-center text-[13px] md:text-[14px] text-[#757575] leading-relaxed max-w-2xl mx-auto mb-8 px-2" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <div className="flex justify-center">
                <button className="px-10 py-3 bg-[#01888E] text-white rounded-[12px] text-[15px] font-bold shadow-[0px_4px_12px_rgba(1,136,142,0.3)] hover:bg-[#006D6D] transition-colors" style={{ fontFamily: 'Inter' }}>
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[100px] sm:h-[120px] md:h-[130px] bg-white" />
      </section>



      {/* Testimonials Section */}
      <section className="relative py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 overflow-hidden" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-8 text-center md:text-left">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>TESTIMONIALS</span>
            <h2 className="text-[28px] md:text-[34px] leading-tight text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">What Our</span> <span className="font-bold text-[#01888E]">Clients Say</span>
            </h2>
          </div>

          <div
            className="relative flex justify-center items-center h-[420px] sm:h-[460px] cursor-grab touch-pan-y"
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
              const cardWidth = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 260 : window.innerWidth < 1024 ? 300 : 360) : 360;
              const translateX = `translateX(${position * cardWidth}px)`;

              return (
                <div
                  key={testimonial.id}
                  className={`absolute ease-in-out ${isActive ? 'z-30' : 'z-10'}`}
                  style={{
                    transform: `${translateX}${isActive ? ' translateY(-8px) scale(1.05)' : ' scale(0.92)'}`,
                    transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out`,
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  <div
                    className={`relative bg-white rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 text-center overflow-hidden transition-all duration-700 flex flex-col items-center ${
                      isActive
                        ? 'w-[260px] sm:w-[300px] lg:w-[360px] min-h-[360px] shadow-[0px_8px_32px_rgba(1,136,142,0.18)]'
                        : 'w-[240px] sm:w-[280px] lg:w-[320px] min-h-[320px] shadow-[0px_4px_16px_rgba(0,0,0,0.06)]'
                    }`}
                  >
                    <div className="absolute top-4 left-5 text-[#01888E] font-serif leading-none font-bold text-[56px] sm:text-[64px] pointer-events-none select-none">
                      “
                    </div>

                    <div
                      className={`rounded-full bg-cover bg-center border-2 border-[#01888E] z-10 mt-2 ${isActive ? 'w-[80px] h-[80px] sm:w-[88px] sm:h-[88px]' : 'w-[68px] h-[68px] sm:w-[76px] sm:h-[76px]'}`}
                      style={{ backgroundImage: `url(${testimonial.avatar})` }}
                    />

                    <div className="flex justify-center gap-1 mt-4 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={isActive ? 16 : 14} className="text-[#FFC600] fill-[#FFC600]" />
                      ))}
                    </div>

                    <p
                      className={`italic text-[#003032]/80 mb-6 px-1 ${isActive ? 'text-[12px] leading-[20px]' : 'text-[11px] leading-[18px]'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      {testimonial.text}
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

          <div className="flex justify-center mt-6 gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`rounded-full transition-all flex items-center justify-center ${
                  currentSlide === index
                    ? 'w-[18px] h-[18px] bg-[#01888E]'
                    : 'w-[12px] h-[12px] bg-white border border-[#01888E] hover:opacity-100 opacity-80'
                }`}
              >
                {currentSlide === index && <div className="w-[6px] h-[6px] bg-white rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
