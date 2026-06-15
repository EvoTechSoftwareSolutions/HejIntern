import { useState, useRef, useEffect } from 'react';
import { Share2, Heart, Star, User, ChevronLeft } from 'lucide-react';
import heroBanner from '../assets/herobanner.png';
import React from "react";
import aboutus from '../assets/aboutus.png';
import explorebg from '../assets/explorebg.png';
import sigiriya from '../assets/sigiriya.png';
import ninearch from '../assets/ninearch.png';
import thalpe from '../assets/thalpe.png';
import stay from '../assets/stay.png';
import customize from '../assets/customize.png';
import icon1 from '../assets/1.png';
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';
import icon6 from '../assets/6.png';
import icon7 from '../assets/7.png';

const renderThemeIcon = (id: number) => {
  const iconClass = "w-[85px] h-[85px] object-contain transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110";
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
      image: ninearch
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
      image: thalpe
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

  // Uniform display values for Stay cards (use same text across cards)
  const uniformStayTitle = 'Kandy Spice Villa';
  const uniformStayLocation = 'Kandy, Sri Lanka';
  const uniformStayRating = '4.5';

  const testimonials = [
    {
      id: 1,
      name: 'Name',
      country: 'Country',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Name',
      country: 'Country',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Name',
      country: 'Country',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      avatar: 'https://images.unsplash.com/photo-1517849845537-1d51a20414de?q=80&w=100&auto=format&fit=crop'
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

  // Autoplay: advance testimonial every AUTO_SLIDE_MS, but pause while dragging
  useEffect(() => {
    const id = setInterval(() => {
      if (isDraggingRef.current) return;
      setCurrentSlide((s) => (s + 1) % testimonials.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="w-full font-sans text-dark bg-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative w-full h-[640px] flex flex-col justify-center items-center text-center text-secondary mt-0">
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBanner})` }} />

        <div className="absolute top-0 left-0 w-full h-[118px] bg-gradient-to-b from-white/90 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[272px] bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

          <div className="absolute top-[20%] right-8 md:right-16 z-20 flex flex-col gap-4 items-center">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <button key={index} onClick={() => setHeroSlide(index)} className={`rounded-full transition-all flex items-center justify-center ${heroSlide === index ? 'w-[36px] h-[36px] border-[2px] border-white/80 p-[2px]' : 'w-[6px] h-[6px] bg-white hover:bg-gray-200'} cursor-pointer`}>
                {heroSlide === index && <img src={heroBanner} className="w-full h-full rounded-full object-cover" alt="" />}
              </button>
            ))}
          </div>

        <div className="relative z-20 flex flex-col items-center mt-16 px-4">
          <h1 className="font-kaisei text-[40px] md:text-[40px] leading-[48px] font-bold text-white tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">FIND YOUR PERFECT GETAWAY</h1>
          <p className="font-alex text-[28px] md:text-[34px] leading-[40px] text-white mt-2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">Crafted Just for You!</p>

          <div className="flex flex-col items-center mt-4">
            <p className="font-sans text-[14px] leading-[18px] text-white/90 font-normal drop-shadow-sm mb-6">Tailored Experiences, Unmatched Adventures</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-2 items-center">
            <button className="px-10 py-3 rounded-full bg-white text-[#003032] font-sans font-bold text-[14px] leading-[18px] shadow-lg transition-colors flex items-center justify-center min-w-[260px] border border-[rgba(1,136,142,0.08)]">
              Let's Start Your Journey
            </button>
            <button className="px-10 py-3 rounded-full bg-gradient-to-r from-[#01888E] to-[#006D6D] text-white font-sans font-bold text-[14px] leading-[18px] shadow-lg transition-colors flex items-center justify-center min-w-[260px]">
              Build My Trip
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white max-w-7xl mx-auto text-center mt-6">
        <p className="text-[17px] text-[#003032] font-sans max-w-[800px] mx-auto mb-10 leading-[28px] text-center px-4 font-normal">
          We offer <span className="font-bold text-[#01888E]">seven</span> extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka. Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
        </p>
        <div
          className="flex flex-nowrap justify-center gap-4 overflow-x-auto pb-8 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {themes.map((theme) => {
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`group w-[145px] h-[210px] rounded-[14px] p-4 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer flex-shrink-0 ${theme.bgColor} shadow-lg hover:-translate-y-2 hover:shadow-2xl ${theme.shadow}`}
              >
                {/* Inner Icon Container */}
                <div className="flex-1 flex items-center justify-center">
                  {renderThemeIcon(theme.id)}
                </div>
                {/* Label Text */}
                <span className={`text-[15px] font-bold text-center leading-[18px] ${theme.textColor} whitespace-pre-line flex items-center justify-center h-[54px] transition-all duration-300 group-hover:text-[15px]`}>
                  {theme.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 pl-[104px] pr-4 md:pr-8 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-petemoss text-[56px] md:text-[96px] text-[#01888E]">Hello !</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: framed image */}
            <div className="flex-shrink-0 w-full md:w-[420px]">
              <div className="bg-white rounded-[18px] p-4 shadow-lg inline-block">
                <img
                  src={aboutus}
                  alt="About Hej Ceylon"
                  className="w-[360px] md:w-[392px] h-auto md:h-[420px] object-cover rounded-[12px]"
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
      <section className="py-16 relative w-full overflow-hidden pl-[104px] pr-4 md:pr-8" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-10">
            <div>
              <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block" style={{ fontFamily: 'Inter' }}>Explore Sri Lanka</span>
              <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">A Land</span> <span className="font-normal">of Diverse Wonders!</span>
              </h2>
              <p className="text-[12px] leading-[15px] text-[#003032] font-normal max-w-[880px]" style={{ fontFamily: 'Inter' }}>
                We offer seven extraordinary travel categories, each carefully curated to bring you the best of Sri Lanka. Whether you seek cultural heritage, thrilling adventures, or a luxury retreat, we've got you covered!
              </p>
            </div>

            {/* Carousel Navigation Buttons - right aligned on new line */}
            <div className="flex justify-end mt-4">
              <div className="flex gap-2 shrink-0 mr-16">
                <button className="w-[32px] h-[22px] bg-[#01888E] rounded-[10px_0px_0px_10px] flex items-center justify-center text-[#E6F3F4] hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-[32px] h-[22px] bg-[#01888E] rounded-[10px_0px_0px_10px] flex items-center justify-center text-[#E6F3F4] hover:bg-[#003032] transition-colors transform rotate-180">
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {tours.map((tour, index) => {

              return (
                <div key={tour.id} className="bg-white rounded-[5px] w-[220px] h-[320px] shadow-sm hover:shadow-md transition-shadow cursor-pointer relative">

                  {/* Card Image */}
                  <div className="relative overflow-hidden bg-gray-100" style={{ width: '220px', height: '170px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${sigiriya})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Image overlay text */}
                    <div className="absolute left-3 bottom-3 flex flex-col gap-1">
                      {index > 0 && (
                        <div className="flex items-center gap-1">
                          <User size={10} className="text-white" />
                          <span className="text-white text-[10px] font-medium leading-[12px] capitalize" style={{ fontFamily: 'Inter' }}>Lorem Ipsum is simply</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-white fill-white" />
                        <span className="text-white text-[10px] font-medium leading-[12px] capitalize" style={{ fontFamily: 'Inter' }}>Lorem Ipsum is simply</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-[14px] px-[8px] pb-3 relative">

                    {/* Rating & Price Row */}
                    <div className="flex items-center">
                      <div className="h-[18px] px-1 border border-[#008000] rounded-[4px] flex items-center justify-center text-[#008000] text-[9px] font-bold" style={{ fontFamily: 'Inter' }}>
                        {tour.rating || '4.5'}
                      </div>
                      <span className="ml-[8px] text-[9px] font-semibold text-[#008000] leading-[11px]" style={{ fontFamily: 'Inter' }}>
                        {tour.reviews || '14'} Ratings
                      </span>

                      <div className="w-[1px] h-[13px] bg-[#003032] mx-[10px]"></div>

                      <span className="text-[9px] font-semibold text-[#003032] leading-[11px] mr-[3px]" style={{ fontFamily: 'Inter' }}>From</span>
                      <span className="text-[11px] font-semibold text-[#F30000] leading-[13px]" style={{ fontFamily: 'Inter' }}>
                        {tour.price || '5$ - 1000$'}
                      </span>
                    </div>

                    {/* Description text */}
                    <p className="mt-[10px] mb-[15px] ml-[8px] text-[11px] leading-[13px] text-[#003032] font-normal w-[165px]" style={{ fontFamily: 'Inter' }}>
                      Lorem Ipsum is simply dummy text of the printing and type setting industry.
                    </p>

                    {/* Divider Line */}
                    <div className="w-[131px] h-[1px] bg-[#003032] opacity-[0.35] ml-[27px] mb-[4px]"></div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between ml-[8px]">
                      <div>
                        <div className="text-[10px] font-normal text-[#008000] leading-[12px]" style={{ fontFamily: 'Inter' }}>{tour.category || 'Adventure'}</div>
                        <div className="text-[10px] font-bold text-[#008000] leading-[12px]" style={{ fontFamily: 'Inter' }}>{tour.duration || '3 days'}</div>
                      </div>

                      <div className="flex gap-[6px] text-[#003032]">
                        <button aria-label="share" className="hover:text-primary transition-colors"><Share2 size={16} strokeWidth={1.5} /></button>
                        <button aria-label="favorite" className="hover:text-red-500 transition-colors"><Heart size={16} strokeWidth={1.5} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explore All Button */}
          <div className="flex justify-center mt-8">
            <button className="w-[176px] h-[36px] bg-[#01888E] text-[#E6F3F4] rounded-full text-[15px] font-bold tracking-wide shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#003032] transition-colors" style={{ fontFamily: 'Inter' }}>
              Explore all tours
            </button>
          </div>
        </div>
      </section>

      {/* Stays Section (background removed) */}
      {/* Destinations Section */}
      <section className="py-16 px-[104px] pr-4 md:pr-8 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block" style={{ fontFamily: 'Inter' }}>Reach Your Dream Destination</span>
            <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Your Adventure</span> <span className="font-normal">Starts Here!</span>
            </h2>
            <p className="text-[12px] leading-[15px] text-[#003032] font-normal max-w-[880px]" style={{ fontFamily: 'Inter' }}>
              Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach. With us, you don't just travel—you experience Sri Lanka like never before.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 mt-6">
            <div className="w-[377px] h-[187px] rounded-[8px] overflow-hidden relative">
              <img src={ninearch} alt="Nine Arch" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-4 bottom-4 text-white">
                <div className="text-[18px] font-extrabold drop-shadow-md">Nine Arch</div>
                <div className="text-[11px] max-w-[340px] drop-shadow-sm">Imagine standing atop a misty mountain, strolling through ancient ruins, or feeling the ocean breeze on a golden beach.</div>
              </div>
            </div>

            <div className="w-[195px] h-[188px] rounded-[8px] overflow-hidden relative">
              <img src={thalpe} alt="Thalpe" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-3 bottom-3 text-[16px] font-extrabold text-white drop-shadow-md">Thalpe</div>
            </div>

            <div className="w-[213px] h-[187px] rounded-[8px] overflow-hidden relative">
              <img src={ninearch} alt="Nine Arch 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-4 bottom-4 text-[16px] font-extrabold text-white drop-shadow-md">Nine Arch</div>
            </div>

            <div className="w-[187px] h-[187px] rounded-[8px] overflow-hidden relative">
              <img src={ninearch} alt="Nine Arch small" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-3 bottom-3 text-[16px] font-extrabold text-white drop-shadow-md">Nine Arch</div>
            </div>

            <div className="w-[178px] h-[188px] rounded-[8px] overflow-hidden relative">
              <img src={thalpe} alt="Thalpe 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-3 bottom-3 text-[16px] font-extrabold text-white drop-shadow-md">Thalpe</div>
            </div>

            <div className="w-[419px] h-[187px] rounded-[8px] overflow-hidden relative">
              <img src={thalpe} alt="Thalpe big" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/10 to-black/60" />
              <div className="absolute left-4 bottom-4 text-[18px] font-extrabold text-white drop-shadow-md">Thalpe</div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-[#01888E] text-[#E6F3F4] rounded-full text-[15px] font-bold shadow-[0px_8px_12px_rgba(1,136,142,0.25)] hover:opacity-95 transition">
          Start your adventure today
        </button>
      </div>


      {/* Stays Section (background: explorebg.png) */}
      <section className="relative py-16 pl-[104px] pr-4 md:pr-8 overflow-hidden" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-2">
            <div>
              <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block" style={{ fontFamily: 'Inter' }}>STAYS</span>
              <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">Stay In</span> <span className="font-normal">Sri Lanka</span>
              </h2>
              <p className="text-[12px] leading-[15px] text-[#003032] font-normal max-w-[880px] mt-0" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* Carousel Navigation Buttons - right aligned on new line */}
            <div className="flex justify-end mt-3">
              <div className="flex gap-2 shrink-0 mr-16">
                <button className="w-[32px] h-[22px] bg-[#01888E] rounded-[10px_0px_0px_10px] flex items-center justify-center text-[#E6F3F4] hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-[32px] h-[22px] bg-[#01888E] rounded-[10px_0px_0px_10px] flex items-center justify-center text-[#E6F3F4] hover:bg-[#003032] transition-colors transform rotate-180">
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-items-center">
            {tours.slice(0, 4).map((card, idx) => (
              <div
                key={card.id}
                className={`relative rounded-[12px] overflow-hidden shadow-lg bg-white border border-[rgba(0,0,0,0.06)]`}
                style={{
                  width: idx === 0 ? '280px' : '240px',
                  height: idx === 0 ? '320px' : '280px'
                }}
              >
                {idx === 0 ? (
                  <>
                    <div
                      className="w-full bg-cover bg-center"
                      style={{ height: '180px', backgroundImage: `url(${stay})` }}
                    />

                    {/* heart icon top-right */}
                    <button className="absolute right-3 top-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Heart size={16} className="text-[#003032]" />
                    </button>

                    {/* Card content (larger) */}
                    <div className="p-4 bg-white h-full flex flex-col justify-between">
                      <div>
                        <h4 className="text-[16px] font-bold leading-[18px] text-[#003032]" style={{ fontFamily: 'Inter' }}>{uniformStayTitle}</h4>
                        <p className="text-[12px] text-[#003032] mt-1" style={{ fontFamily: 'Inter' }}>{uniformStayLocation}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[26px] px-3 border border-[#003032] rounded-[8px] flex items-center justify-center text-[#003032] text-[13px] font-bold" style={{ fontFamily: 'Inter' }}>{uniformStayRating}</div>
                          <div className="flex items-center gap-[4px]">
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                          </div>
                        </div>

                        <div className="text-[13px] text-[#008000] font-semibold">{card.duration}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="w-full bg-cover bg-center"
                      style={{ height: '150px', backgroundImage: `url(${stay})` }}
                    />

                    {/* heart icon top-right */}
                    <button className="absolute right-3 top-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Heart size={14} className="text-[#003032]" />
                    </button>



                    {/* Card content */}
                    <div className="p-3 bg-white h-[110px] flex flex-col justify-between">
                      <div>
                        <h4 className="text-[13px] font-bold leading-[15px] text-[#003032]" style={{ fontFamily: 'Inter' }}>{uniformStayTitle}</h4>
                        <p className="text-[11px] text-[#003032] mt-1" style={{ fontFamily: 'Inter' }}>{uniformStayLocation}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-[20px] px-2 border border-[#003032] rounded-[6px] flex items-center justify-center text-[#003032] text-[12px] font-bold" style={{ fontFamily: 'Inter' }}>{uniformStayRating}</div>
                          <div className="flex items-center gap-[4px]">
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                            <Star size={14} className="text-[#FFCC00]" />
                          </div>
                        </div>

                        <div className="text-[12px] text-[#008000] font-semibold">{card.duration}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="px-8 py-3 bg-[#01888E] text-white rounded-full text-[16px] font-bold shadow-[0px_8px_12px_rgba(1,136,142,0.25)]">
              View all
            </button>
          </div>
        </div>
      </section>



      {/* Customize CTA Section */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-full h-[520px] bg-cover bg-center" style={{ backgroundImage: `url(${customize})` }} />
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/95 to-transparent pointer-events-none" />
        <div className="w-full h-28 bg-white" />
        <div className="absolute left-0 right-0 top-[78%] transform -translate-y-1/2 flex justify-center px-4">
          <div className="bg-white max-w-3xl w-full md:w-[720px] mx-auto rounded-sm shadow-xl p-6 md:p-8 border border-gray-100">
            <h3 className="text-center text-[#003032] font-bold text-[20px] md:text-[22px] leading-tight mb-3">Let's Customize Your Dream Tour Today!</h3>
            <p className="text-center text-[13px] text-gray-600 max-w-3xl mx-auto mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-[#01888E] text-white rounded-md font-bold shadow-[0px_8px_12px_rgba(1,136,142,0.25)] hover:opacity-95 transition">Customize</button>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="relative py-24 pl-[104px] pr-4 md:pr-8 overflow-hidden bg-[#EAF5F5]" style={{ backgroundImage: `url(${explorebg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
        <div className="absolute inset-0 bg-white/60 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block uppercase tracking-wider">TESTIMONIALS</span>
            <h2 className="text-[28px] md:text-[34px] leading-tight text-[#003032] mb-3"><span className="font-bold">What Our</span> <span className="font-bold text-[#01888E]">Clients Say</span></h2>
          </div>

          <div className="relative flex justify-center items-center h-[460px] cursor-grab"
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
              const translateX = `translateX(${position * 380}px)`;
              return (
                <div
                  key={testimonial.id}
                  className={`absolute ease-in-out ${isActive ? 'z-30' : 'z-10'}`}
                  style={{ 
                    transform: `${translateX} ${isActive ? ' translateY(-12px)' : ''}`, 
                    transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out`, 
                    opacity: isActive ? 1 : 0.6 
                  }}
                >
                  <div className={`relative bg-white/95 rounded-[24px] p-8 text-center overflow-hidden transition-all duration-700 flex flex-col items-center justify-between ${isActive ? 'w-[380px] h-[400px] scale-100 shadow-[0_10px_40px_rgba(1,136,142,0.15)] ring-1 ring-[#01888E]/20' : 'w-[340px] h-[360px] scale-95 shadow-md'}`}>
                    
                    {/* Top Row: Quote & Avatar */}
                    <div className="w-full relative flex flex-col items-center mt-2">
                      <div className={`absolute -top-4 left-0 text-[#01888E] font-serif leading-none font-bold ${isActive ? 'text-[72px]' : 'text-[56px] opacity-60'}`}>
                        “
                      </div>
                      <div className={`rounded-full bg-cover bg-center shadow-sm z-10 ${isActive ? 'w-[88px] h-[88px] ring-4 ring-[#EAF5F5]' : 'w-[72px] h-[72px] ring-2 ring-gray-100'}`} style={{ backgroundImage: `url(${testimonial.avatar})` }} />
                    </div>

                    {/* Stars */}
                    <div className="flex justify-center gap-1 mt-4 mb-3">
                      {[1,2,3,4,5].map(s => <Star key={s} size={isActive ? 16 : 14} className="text-[#FFC600] fill-[#FFC600]" />)}
                    </div>

                    {/* Text */}
                    <p className={`italic text-[#003032] mb-6 ${isActive ? 'text-[14px] leading-[22px]' : 'text-[12px] leading-[18px] opacity-80'} overflow-hidden flex-1 flex items-center`}>
                      "{testimonial.text}"
                    </p>

                    {/* Name & Country */}
                    <div className="mt-auto">
                      <h3 className={`text-[#003032] font-extrabold ${isActive ? 'text-[20px] mb-1' : 'text-[16px] mb-0.5'}`}>Ethan Wilson</h3>
                      <p className={`text-[#01888E] font-bold ${isActive ? 'text-[14px]' : 'text-[12px]'}`}>Sweden</p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)} 
                className={`rounded-full transition-all flex items-center justify-center border border-[#01888E] ${
                  currentSlide === index ? 'w-[16px] h-[16px] bg-transparent' : 'w-[12px] h-[12px] bg-white opacity-60 hover:opacity-100'
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
