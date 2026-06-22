import { useState, useRef, useEffect } from 'react';
import { Share2, Heart, Star, User, ChevronLeft, Umbrella, TreePine, Mountain, Sparkles, Tag } from 'lucide-react';
import heroBanner from '../assets/herobanner.png';

import aboutus from '../assets/aboutus.png';
import explorebg from '../assets/explorebg.png';
import sigiriya from '../assets/sigiriya.png';
import ninearch from '../assets/ninearch.png';
import thalpe from '../assets/thalpe.png';
import stay from '../assets/stay.png';
import customize from '../assets/customize.png';

const renderThemeIcon = (id: number, isActive: boolean) => {
  switch (id) {
    case 1: // Dive into history and traditions / Dyk ner i historia och traditioner
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#003032]" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 8v-2c-2.24 0-4.16-.96-5.6-2.68l-1.34-1.6C13.68 9.26 13.12 9 12.5 9h-1c-.62 0-1.18.26-1.56.72l-1.34 1.6C7.16 13.04 5.24 14 3 14v2c2.77 0 5.19-1.17 7-3.25V15l-3.88 1.55c-.67.27-1.12.9-1.12 1.62v.33c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-.33c0-.72-.45-1.35-1.12-1.62L14 15v-2.25c1.81 2.08 4.23 3.25 7 3.25z" />
        </svg>
      );
    case 5: // Rejuvenate your soul / Återupplev din själ
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#003032]" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 8v-2c-2.24 0-4.16-.96-5.6-2.68l-1.34-1.6C13.68 9.26 13.12 9 12.5 9h-1c-.62 0-1.18.26-1.56.72l-1.34 1.6C7.16 13.04 5.24 14 3 14v2c2.77 0 5.19-1.17 7-3.25V15l-3.88 1.55c-.67.27-1.12.9-1.12 1.62v.33c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-.33c0-.72-.45-1.35-1.12-1.62L14 15v-2.25c1.81 2.08 4.23 3.25 7 3.25z" />
        </svg>
      );
    case 2: // Unwind by turquoise waters / Koppla av vid turkosa vatten
      return (
        <svg viewBox="0 0 100 80" className="w-10 h-10 text-[#003032]" fill="currentColor">
          {/* Head */}
          <circle cx="68" cy="12" r="9" />
          {/* Body leaning forward with arm outstretched */}
          <path d="M62 22 Q50 28 30 26 Q28 26 28 28 Q28 30 30 30 Q54 32 66 26 L78 38 Q80 40 82 38 Q84 36 82 34 Z" />
          {/* Legs kicking back */}
          <path d="M62 24 L56 42 Q55 44 57 45 Q59 46 60 44 L65 30 Z" />
          <path d="M58 26 L50 44 Q49 46 51 47 Q53 48 54 46 L62 28 Z" />
          {/* Wave 1 */}
          <path d="M10 56 Q20 50 30 56 Q40 62 50 56 Q60 50 70 56 Q80 62 90 56" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          {/* Wave 2 */}
          <path d="M10 68 Q20 62 30 68 Q40 74 50 68 Q60 62 70 68 Q80 74 90 68" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );
    case 3: // Witness nature in its purest form / Upplev naturen i sin renaste form
      return (
        <svg viewBox="0 0 100 90" className="w-10 h-10 text-[#003032]" fill="currentColor">
          {/* Person: head */}
          <circle cx="22" cy="20" r="7" />
          {/* Person: body */}
          <rect x="18" y="30" width="8" height="22" rx="3" />
          {/* Person: legs */}
          <rect x="16" y="52" width="6" height="18" rx="3" />
          <rect x="24" y="52" width="6" height="18" rx="3" />
          {/* Ground line */}
          <rect x="5" y="70" width="90" height="4" rx="2" />
          {/* Tree trunk */}
          <rect x="56" y="48" width="10" height="22" rx="3" />
          {/* Tree canopy (cloud-like circle) */}
          <circle cx="61" cy="32" r="22" />
        </svg>
      );
    case 4: // Get your adrenaline rush! / Få adrenalinkicken!
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#003032]" fill="currentColor">
          <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 6.7 1.4z"/>
          <path d="M2 10h3M3 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 6: // Indulge in exclusivity / Skäm bort dig i exklusivitet
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#003032]" fill="currentColor">
          <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
        </svg>
      );
    case 7: // Amazing experiences at great value! / Fantastiska upplevelser till bra pris!
      return (
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#003032]" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.23 8.35L12 20l-4.73-4.65c-.32-.32-.52-.76-.52-1.25 0-1 .8-1.8 1.8-1.8.61 0 1.15.3 1.48.77l1.97 1.95 1.97-1.95c.33-.47.87-.77 1.48-.77 1 0 1.8.8 1.8 1.8 0 .49-.2 1.03-.52 1.25z" />
        </svg>
      );
    default:
      return null;
  }
};

const HomeSV = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTheme, setActiveTheme] = useState(1);
  const [_dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const themes = [
    { id: 1, name: 'Dyk ner i historia och traditioner', icon: '🏛️' },
    { id: 2, name: 'Koppla av vid turkosa vatten', icon: '🏖️' },
    { id: 3, name: 'Upplev naturen i sin renaste form', icon: '🐘' },
    { id: 4, name: 'Få adrenalinkicken!', icon: '🧗' },
    { id: 5, name: 'Återupplev din själ', icon: '🧘' },
    { id: 6, name: 'Skäm bort dig i exklusivitet', icon: '✨' },
    { id: 7, name: 'Fantastiska upplevelser till bra pris!', icon: '🎒' },
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

<div className="absolute top-[122px] right-8 md:right-16 z-20 flex flex-col gap-3">
            {themes.map((_, index) => (
              <button key={index} onClick={() => setHeroSlide(index)} className={`w-3 h-3 rounded-full transition-all ${heroSlide === index ? 'bg-primary' : 'bg-secondary'} cursor-pointer hover:bg-primary`} />
            ))}
          </div>

        <div className="relative z-20 flex flex-col items-center mt-16 px-4">
          <h1 className="font-kaisei text-[40px] md:text-[40px] leading-[48px] font-bold text-white tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">HITTA DIN PERFEKTA SEMESTER</h1>
          <p className="font-alex text-[28px] md:text-[34px] leading-[40px] text-white mt-2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">Skräddarsydd bara för dig!</p>

          <div className="flex flex-col items-center mt-4">
            <p className="font-sans text-[14px] leading-[18px] text-white/90 font-normal drop-shadow-sm mb-6">Skräddarsydda upplevelser, oslagbara äventyr</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-2 items-center">
            <button className="px-10 py-3 rounded-full bg-white text-[#003032] font-sans font-bold text-[14px] leading-[18px] shadow-lg transition-colors flex items-center justify-center min-w-[260px] border border-[rgba(1,136,142,0.08)]">
              Börja ditt äventyr
            </button>
            <button className="px-10 py-3 rounded-full bg-gradient-to-r from-[#01888E] to-[#006D6D] text-white font-sans font-bold text-[14px] leading-[18px] shadow-lg transition-colors flex items-center justify-center min-w-[260px]">
              Skapa min resa
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white max-w-7xl mx-auto text-center mt-6">
        <p className="text-[16px] text-[#003032] font-sans max-w-4xl mx-auto mb-10 leading-[26px] text-center px-4">
          Vi erbjuder <span className="font-bold text-[#01888E]">{themes.length}</span> extraordinära resekategorier, var och en noggrant utvald för att ge dig det bästa av Sri Lanka. Oavsett om du söker kulturarv, spännande äventyr eller en lyxig reträtt, har vi dig täckt!
        </p>
        <div
          className="flex flex-nowrap justify-center gap-3 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {themes.map((theme) => {
            const isActive = activeTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`w-[118px] h-[155px] rounded-[16px] p-2 flex flex-col items-center justify-start transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#01888E] text-white shadow-[0_12px_24px_rgba(1,136,142,0.3)] transform -translate-y-1'
                    : 'bg-[#E6F3F4] text-[#003032] hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                {/* Inner Icon Container */}
                <div className="w-[95px] h-[78px] rounded-[12px] bg-[#D8EDEE] flex items-center justify-center mb-2 mt-1 shadow-sm">
                  {renderThemeIcon(theme.id, isActive)}
                </div>
                {/* Label Text */}
                <span className="text-[11px] font-bold text-center leading-[14px] px-1 mt-auto mb-1">
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
              <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block" style={{ fontFamily: 'Inter' }}>Utforska Sri Lanka</span>
              <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">Ett land</span> <span className="font-normal">av mångsidiga underverk!</span>
              </h2>
              <p className="text-[12px] leading-[15px] text-[#003032] font-normal max-w-[880px]" style={{ fontFamily: 'Inter' }}>
                Vi erbjuder sju extraordinära resekategorier, var och en noggrant utvald för att ge dig det bästa av Sri Lanka. Oavsett om du söker kulturarv, spännande äventyr eller en lyxig reträtt, har vi dig täckt!
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
              Utforska alla turer
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
          Börja ditt äventyr idag
        </button>
      </div>


      {/* Stays Section (background: explorebg.png) */}
      <section className="relative py-16 pl-[104px] pr-4 md:pr-8 overflow-hidden" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-2">
            <div>
              <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block" style={{ fontFamily: 'Inter' }}>BOENDEN</span>
              <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">Bo i</span> <span className="font-normal">Sri Lanka</span>
              </h2>
              <p className="text-[12px] leading-[15px] text-[#003032] font-normal max-w-[880px] mt-0" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum är bara dummytext för utskrift och typsättning. Lorem Ipsum har varit branschens standarddummytext sedan 1500-talet.
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
            <h3 className="text-center text-[#003032] font-bold text-[20px] md:text-[22px] leading-tight mb-3">Anpassa din drömresa idag!</h3>
            <p className="text-center text-[13px] text-gray-600 max-w-3xl mx-auto mb-6">Lorem Ipsum är bara dummytext för utskrift och typsättning. Lorem Ipsum har varit branschens standarddummytext sedan 1500-talet, när en okänd tryckare tog en typgalleri och blandade den för att skapa en provbok.</p>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-[#01888E] text-white rounded-md font-bold shadow-[0px_8px_12px_rgba(1,136,142,0.25)] hover:opacity-95 transition">Anpassa</button>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="relative py-24 pl-[104px] pr-4 md:pr-8 overflow-hidden" style={{ backgroundImage: `url(${explorebg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-12">
            <span className="text-[#01888E] text-[11px] leading-[13px] font-normal mb-2 block">TESTIMONIALS</span>
            <h2 className="text-[26px] leading-[31px] text-[#003032] mb-3"><span className="font-bold">Vad våra</span> <span className="font-normal">kunder säger</span></h2>
          </div>

          <div className="relative flex justify-center items-center h-[420px] cursor-grab"
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

              return (
                <div key={testimonial.id} className={`absolute ease-in-out ${position === 0 ? 'scale-100 opacity-100 z-30' : 'scale-90 opacity-60 z-10'}`} style={{ transform: `translateX(${position * 340}px) ${position === 0 ? 'scale(1)' : 'scale(0.9)'}`, transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out` }}>
                  <div className={`bg-white rounded-[24px] shadow-xl p-8 text-center overflow-hidden ${position === 0 ? 'w-[360px] h-[380px]' : 'w-[320px] h-[340px]'}`}>
                    <div className="w-24 h-24 rounded-2xl mx-auto mb-5 bg-cover bg-center" style={{ backgroundImage: `url(${testimonial.avatar})` }} />
                    <h3 className="text-[#003032] font-bold text-[18px]">{testimonial.name}</h3>
                    <p className="text-[#01888E] font-semibold mb-4">{testimonial.country}</p>
                    <p className={position === 0 ? 'text-[#003032] text-sm leading-relaxed break-words max-h-[180px] overflow-auto' : 'text-[#003032] text-xs leading-[16px] break-words max-h-[120px] overflow-hidden'}>{testimonial.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center mt-10 gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-primary' : 'bg-secondary'}`} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomeSV;
