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

const HomeSV = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeTheme, setActiveTheme] = useState(1);
  const [_dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const themes = [
    { id: 1, name: 'Dyk ner i historia\noch traditioner' },
    { id: 2, name: 'Koppla av vid\nturkosa\nvatten' },
    { id: 3, name: 'Upplev\nnaturen i sin\nrenaste form' },
    { id: 4, name: 'Få din\nadrenalinkick!' },
    { id: 5, name: 'Återuppliva din\nsjäl' },
    { id: 6, name: 'Skäm bort dig i\nexklusivitet' },
    { id: 7, name: 'Fantastiska\nupplevelser till\nbra pris!' },
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
      duration: '3 dagar',
      category: 'Äventyr',
      image: sigiriya
    },
    {
      id: 2,
      title: 'Nine Arch Retreat',
      location: 'Ella, Sri Lanka',
      price: '50$ - 300$',
      rating: 4.8,
      reviews: 42,
      duration: '2 dagar',
      category: 'Natur',
      image: sigiriya
    },
    {
      id: 3,
      title: 'Thalpe Beach Hut',
      location: 'Thalpe, Sri Lanka',
      price: '30$ - 200$',
      rating: 4.6,
      reviews: 31,
      duration: '4 dagar',
      category: 'Avslappning',
      image: sigiriya
    },
    {
      id: 4,
      title: 'Sigiriya Sunrise Stay',
      location: 'Sigiriya, Sri Lanka',
      price: '40$ - 250$',
      rating: 4.7,
      reviews: 28,
      duration: '3 dagar',
      category: 'Kulturarv',
      image: sigiriya
    },
    {
      id: 5,
      title: 'Galle Fort Explorer',
      location: 'Galle, Sri Lanka',
      price: '20$ - 150$',
      rating: 4.9,
      reviews: 56,
      duration: '2 dagar',
      category: 'Kulturarv',
      image: sigiriya
    },
    {
      id: 6,
      title: 'Nuwara Eliya Tea Trail',
      location: 'Nuwara Eliya, Sri Lanka',
      price: '35$ - 220$',
      rating: 4.6,
      reviews: 38,
      duration: '3 dagar',
      category: 'Natur',
      image: sigiriya
    },
    {
      id: 7,
      title: 'Mirissa Whale Watch',
      location: 'Mirissa, Sri Lanka',
      price: '25$ - 180$',
      rating: 4.5,
      reviews: 22,
      duration: '1 dag',
      category: 'Äventyr',
      image: sigiriya
    },
    {
      id: 8,
      title: 'Yala Safari Jeep',
      location: 'Yala, Sri Lanka',
      price: '60$ - 400$',
      rating: 4.8,
      reviews: 47,
      duration: '2 dagar',
      category: 'Vilda Djur',
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

  const stays = [
    { id: 1, name: 'Amanwella Resort', location: 'Tangalle, Southern Province', rating: 4.5, image: stay, featured: false },
    { id: 2, name: 'Heritance Kandalama', location: 'Dambulla, Central Province', rating: 4.8, image: stay, featured: false },
    { id: 3, name: 'Cape Weligama', location: 'Weligama, Southern Province', rating: 4.7, image: stay, featured: false },
    { id: 4, name: 'Jetwing Surf', location: 'Arugam Bay, Eastern Province', rating: 4.6, image: stay, featured: false },
    { id: 5, name: 'Wild Coast Tented Lodge', location: 'Yala, Southern Province', rating: 4.9, image: stay, featured: false },
    { id: 6, name: 'Santani Wellness Resort', location: 'Kandy, Central Province', rating: 4.7, image: stay, featured: false },
    { id: 7, name: 'Tri Lanka', location: 'Koggala Lake, Southern Province', rating: 4.8, image: stay, featured: false },
    { id: 8, name: 'The Fortress Resort', location: 'Koggala, Southern Province', rating: 4.6, image: stay, featured: false },
  ];

  const destinationDescription = 'Föreställ dig att stå på ett dimmigt berg, promenera genom uråldriga ruiner eller känna havsbrisen på en gyllene strand.';

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
              {heroSlide === index && <div className="w-full h-full rounded-full bg-cover ring-2 ring-white" style={{ backgroundImage: `url('/carousel-3.jpg')` }} />}
            </button>
          ))}
        </div>

        <div className="relative z-20 flex flex-col items-center mt-16 px-4">
          <h1 className="font-kaisei text-[36px] md:text-[44px] leading-[48px] text-white tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]">Hitta Din Perfekta Semester</h1>
          <p className="font-alex text-[28px] md:text-[36px] leading-[40px] text-white mt-2 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">Skräddarsydd bara för dig!</p>

          <div className="flex flex-col items-center mt-4 w-full">
            <p className="font-sans text-[14px] md:text-[15px] leading-[20px] text-white/95 font-medium drop-shadow-sm mb-3">Skräddarsydda upplevelser, oslagbara äventyr</p>
            <div className="w-[280px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mb-5" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-1 items-center w-full px-4 md:px-0">
            <button className="px-6 py-3 rounded-[8px] bg-[#E2E8F0]/95 backdrop-blur-sm text-[#003032] font-sans font-bold text-[13px] leading-[18px] uppercase tracking-wide whitespace-nowrap shadow-[0px_4px_12px_rgba(0,0,0,0.1)] transition-colors flex items-center justify-center w-full sm:w-[240px] hover:bg-white">
              BÖRJA DITT ÄVENTYR
            </button>
            <button className="px-6 py-3 rounded-[8px] bg-[#01888E] text-white font-sans font-bold text-[13px] leading-[18px] uppercase tracking-wide whitespace-nowrap shadow-[0px_4px_12px_rgba(1,136,142,0.3)] transition-colors flex items-center justify-center w-full sm:w-[240px] hover:bg-[#006D6D]">
              SKAPA MIN RESA
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white max-w-7xl mx-auto text-center mt-2">
        <p className="text-[13px] text-[#003032] font-sans max-w-[800px] mx-auto mb-6 leading-[18px] text-center px-4 font-normal whitespace-pre-line">
          Vi erbjuder <span className="font-bold text-[#01888E]">sju</span> extraordinära resekategorier, var och en noggrant utvald för att ge dig det bästa av Sri Lanka.{'\n'}Oavsett om du söker kulturarv, spännande äventyr eller en lyxig reträtt, har vi dig täckt!
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
                <span className={`text-[12px] md:text-[13px] font-bold text-center leading-[16px] text-[#003032] whitespace-pre-line`}>{theme.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 px-4 md:pl-[104px] md:pr-8 w-full relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-petemoss text-[56px] md:text-[96px] text-[#01888E]">Hej !</h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: framed image */}
            <div className="flex-shrink-0 w-full md:w-[420px]">
              <div className="bg-white rounded-[18px] p-4 inline-block">
                <img
                  src={aboutus}
                  alt="About Hej Ceylon"
                  className="w-[360px] md:w-[392px] h-auto md:h-[420px] object-cover rounded-[12px]"
                />
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex flex-col max-w-[700px]">
              <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2" style={{ fontFamily: 'Inter' }}>OM OSS</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                Vilka Vi <span className="text-[#01888E]">Är</span>
              </h3>

              <div className="text-[16px] font-bold text-[#003032] mb-4" style={{ fontFamily: 'Inter' }}>Din Pålitliga Reskamrat</div>

              <div className="text-[14px] font-normal text-[#003032] leading-[22px] space-y-4" style={{ fontFamily: 'Inter' }}>
                <p>På <strong className="text-[#01888E]">Hej Ceylon</strong> planerar vi inte bara resor—vi skapar minnen för livet!</p>
                <p>Vi är en <strong className="text-[#01888E]">Sri Lanka- och Sverigebaserad</strong> resebyrå, byggd på tillit, omsorg och ett orubbligt engagemang för <strong>gästfrihet, kundnöjdhet och säkerhet</strong>. Oavsett om du utforskar hisnande landskap eller dyker in i rik kultur, säkerställer vi en <strong>sömlös, trygg och hjärtlig reseupplevelse</strong>.</p>
                <p><strong>Låt oss ta dig bortom det vanliga—eftersom din resa är viktig!</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section (background: explorebg.png) */}
      <section className="py-10 relative w-full overflow-hidden px-4 md:pl-[104px] md:pr-8" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div className="max-w-[800px]">
              <span className="text-[#01888E] text-[11px] font-normal uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Utforska Sri Lanka</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                <span className="font-light">Ett Land av </span>
                <span className="font-bold text-[#01888E]">Mångsidiga Underverk!</span>
              </h3>
              <p className="text-[13px] leading-[18px] text-[#003032] font-normal whitespace-pre-line" style={{ fontFamily: 'Inter' }}>
                Vi erbjuder <span className="font-bold">sju</span> extraordinära resekategorier, var och en noggrant utvald för att ge dig det bästa av Sri Lanka.{'\n'}Oavsett om du söker kulturarv, spännande äventyr eller en lyxig reträtt, har vi dig täckt!
              </p>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-end mt-3 md:mt-0">
              <div className="flex gap-2 shrink-0 md:mr-4">
                <button onClick={scrollPrevTours} aria-label="Previous tours" className="w-8 h-8 bg-[#01888E] rounded-[8px] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={scrollNextTours} aria-label="Next tours" className="w-8 h-8 bg-[#01888E] rounded-[8px] flex items-center justify-center text-white hover:bg-[#003032] transition-colors">
                  <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
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
                    <span>4.5</span>
                  </div>

                  {/* Heart top-right */}
                  <button aria-label="favorite" className="absolute right-3 top-3 w-7 h-7 bg-white/20 border border-white rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart size={14} className="text-white fill-transparent" />
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
                <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                  <div className="flex items-center gap-2 mb-2 text-[12px] font-bold" style={{ fontFamily: 'Inter' }}>
                    <span className="text-[#01888E]">{tour.reviews} Omdömen</span>
                    <span className="text-gray-300 font-light">|</span>
                    <span className="text-gray-600 font-normal">
                      Från <span className="text-[#FF2A2A] font-bold">{tour.price}</span>
                    </span>
                  </div>

                  <p className="text-[12px] text-[#4A4A4A] leading-relaxed mb-4 tracking-wide" style={{ fontFamily: 'Inter' }}>
                    Lorem Ipsum is simply dummy text of the printing and type setting industry.
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[13px] text-[#01888E] font-bold" style={{ fontFamily: 'Inter' }}>{tour.category}</div>
                      <div className="text-[11px] text-[#003032] font-bold mt-0.5" style={{ fontFamily: 'Inter' }}>{tour.duration}</div>
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
              Utforska Alla Turer
            </button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white w-full">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-6">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>Nå Din Drömdestination</span>
            <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Ditt Äventyr</span> <span className="font-bold text-[#01888E]">Börjar Här!</span>
            </h3>
            <p className="text-[14px] leading-[22px] text-[#757575] font-normal max-w-[800px]" style={{ fontFamily: 'Inter' }}>
              Föreställ dig att stå på ett dimmigt berg, promenera genom uråldriga ruiner eller känna havsbrisen på en gyllene strand. Med oss reser du inte bara—du upplever Sri Lanka som aldrig förr.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-6">
            {destinationCards.map((card) => (
              <div
                key={card.id}
                className={`group ${card.wide ? 'md:col-span-2' : 'md:col-span-1'} h-[200px] sm:h-[240px] md:h-[260px] lg:h-[300px] rounded-[14px] overflow-hidden relative cursor-pointer`}
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
              Börja ditt äventyr idag
            </button>
          </div>
        </div>
      </section>


      {/* Stays Section (background: explorebg.png) */}
      <section className="py-10 relative w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20" style={{ backgroundImage: `url(${explorebg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div className="max-w-[800px]">
              <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>BOENDEN</span>
              <h3 className="text-[34px] md:text-[40px] leading-[44px] text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
                <span className="font-bold">Bo I</span> <span className="font-bold text-[#01888E]">Sri Lanka</span>
              </h3>
              <p className="text-[14px] leading-[22px] text-[#003032] font-normal max-w-[600px]" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum är helt enkelt dummytext från tryckeri- och förlagsindustrin. Lorem Ipsum har varit branschens standarddummytext sedan 1500-talet.
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

          <div ref={(el) => { staysRef.current = el; }} className="flex gap-5 mb-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {stays.map((item) => (
              <div key={item.id} className="snap-start flex-shrink-0 w-[calc(25%-15px)] min-w-[260px]">
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
              Visa Alla
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
                Låt oss anpassa din <span className="text-[#01888E]">drömresa</span> idag!
              </h3>
              <p className="text-[13px] md:text-[14px] text-[#757575] leading-relaxed max-w-[700px] mx-auto mb-7" style={{ fontFamily: 'Inter' }}>
                Lorem Ipsum är helt enkelt dummytext från tryckeri- och förlagsindustrin. Lorem Ipsum har varit branschens standarddummytext sedan 1500-talet, när en okänd tryckare tog en typgalleri och blandade den.
              </p>
              <button className="px-12 py-3 bg-[#01888E] text-white rounded-[10px] text-[15px] font-bold shadow-[0px_4px_16px_rgba(1,136,142,0.35)] hover:bg-[#006D6D] transition-colors min-w-[180px]" style={{ fontFamily: 'Inter' }}>
                Anpassa
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
          <div className="mb-8 text-center md:text-left">
            <span className="text-[11px] font-normal text-[#01888E] uppercase tracking-[0.15em] mb-2 block" style={{ fontFamily: 'Inter' }}>KUNDRECENSIONER</span>
            <h2 className="text-[28px] md:text-[34px] leading-tight text-[#003032] mb-3 font-bold" style={{ fontFamily: 'Inter' }}>
              <span className="font-bold">Vad Våra</span> <span className="font-bold text-[#01888E]">Kunder Säger</span>
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
              const cardWidth = typeof window !== 'undefined' ? (window.innerWidth < 640 ? 240 : window.innerWidth < 1024 ? 280 : 320) : 320;
              const translateX = `translateX(${position * cardWidth}px)`;

              return (
                <div
                  key={testimonial.id}
                  className={`absolute ease-in-out ${isActive ? 'z-30' : 'z-10'}`}
                  style={{
                    transform: `${translateX}${isActive ? ' translateY(-8px) scale(1.05)' : ' scale(0.92)'}`,
                    transition: `transform ${SLIDE_TRANSITION_MS}ms ease-in-out, opacity ${SLIDE_TRANSITION_MS}ms ease-in-out`,
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  <div
                    className={`relative bg-white rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 text-center overflow-hidden transition-all duration-700 flex flex-col items-center ${isActive
                      ? 'w-[260px] sm:w-[300px] lg:w-[360px] min-h-[360px] shadow-[0px_8px_32px_rgba(1,136,142,0.18)]'
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

                    <div className="flex justify-center gap-1 mt-5 mb-5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={isActive ? 16 : 14} className="text-[#FFC600] fill-[#FFC600]" />
                      ))}
                    </div>

                    <p
                      className={`italic text-[#003032]/80 mb-6 px-4 ${isActive ? 'text-[12px] leading-[20px]' : 'text-[11px] leading-[18px]'}`}
                      style={{ fontFamily: 'Inter' }}
                    >
                      “{testimonial.text}”
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

export default HomeSV;