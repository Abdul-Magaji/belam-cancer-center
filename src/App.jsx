import React, { useState, useEffect, useRef } from 'react';
import { Phone, Calendar, Clock, CheckCircle2, Star, ChevronRight, User, Menu, X, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Booking Form States
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({ specialty: '', doctor: '', date: '', time: '', name: '', email: '' });

  // Handle Navbar Background Change on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple Scroll-into-view helper for the components
  const ScrollReveal = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(ref.current);
          }
        },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translateY-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased text-[#2D3748]">
      
      {/* 1. STICKY NAVIGATION */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white border-b border-gray-100 shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/belam.svg" 
              alt="Belam Cancer Center Logo" 
              className={`h-10 w-auto transition-all duration-300 ${
                isScrolled ? 'brightness-100' : 'brightness-0 invert'
              }`}
            />
          </div>
          
          <div className={`hidden md:flex space-x-10 text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}>
            <a href="#about" className="hover:text-[#2A9D8F] transition-colors">Our Mission</a>
            <a href="#services" className="hover:text-[#2A9D8F] transition-colors">Treatments</a>
            <a href="#process" className="hover:text-[#2A9D8F] transition-colors">Your Journey</a>
            <a href="#doctors" className="hover:text-[#2A9D8F] transition-colors">Oncologists</a>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+2348149751331" className={`flex items-center space-x-2 font-medium text-sm tracking-wider transition-colors duration-300 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              <Phone size={16} className="text-[#2A9D8F]" />
              <span>0814 975 1331</span>
            </a>
            <button 
              onClick={() => { setIsBookingOpen(true); setBookingStep(1); }}
              className="bg-belam-blue hover:bg-belam-pink text-white font-medium text-sm tracking-wide uppercase px-6 py-3 rounded shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Consultation
            </button>
          </div>

          <button className="md:hidden text-white mix-blend-difference" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center space-y-8 text-xl font-serif text-[#0F2942]">
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our Mission</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)}>Your Journey</a>
          <a href="#doctors" onClick={() => setMobileMenuOpen(false)}>Oncologists</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setIsBookingOpen(true); }}
            className="bg-[#2A9D8F] text-white px-8 py-3 rounded text-base font-sans font-medium uppercase tracking-wider"
          >
            Book Consultation
          </button>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0F2942]">
        {/* Background Image with Ken Burns Zoom Effect */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center scale-105" 
             style={{ animation: 'kenburns 25s infinite alternate ease-in-out' }} />
        
        <style>{`
          @keyframes kenburns {
            0% { transform: scale(1); }
            100% { transform: scale(1.12); }
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-belam-pink">
              ADVANCED ONCOLOGY CARE
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-600 text-white leading-[1.1] max-w-xl">
              Transforming your care.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light max-w-lg leading-relaxed">
              Our specialists bring decades of world-class oncological expertise and empathetic, tailored science directly to your recovery.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-belam-blue hover:bg-belam-pink text-white px-8 py-4 rounded font-medium shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                Book your appointment
              </button>
              <a 
                href="#doctors"
                className="border border-white/30 hover:border-white text-white px-8 py-4 rounded font-medium bg-white/5 hover:bg-white/10 transition-all duration-300 text-center"
              >
                Meet our oncologists
              </a>
            </div>
          </div>

          {/* Overlapping Floating Badges */}
          <div className="hidden lg:col-span-5 relative h-[500px] flex items-center justify-center">
            <div className="absolute top-12 left-6 bg-white/95 backdrop-blur shadow-2xl p-6 rounded-xl border border-gray-100 animate-[bounce_4s_infinite]">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-teal-50 rounded-lg text-[#2A9D8F]"><Star fill="currentColor" size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">NCI Design Standards</p>
                  <p className="font-serif text-xl font-bold text-[#0F2942]">Top-Tier Rating</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-16 right-6 bg-white/95 backdrop-blur shadow-2xl p-6 rounded-xl border border-gray-100 animate-[bounce_5s_infinite_2s]">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-amber-50 rounded-lg text-amber-500"><CheckCircle2 size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Clinical Trials</p>
                  <p className="font-serif text-xl font-bold text-[#0F2942]">120+ Active Paths</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCREDITATION TICKER */}
      <section className="bg-white border-b border-gray-100 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-4">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400">Collaborating with Premier Research & Insurance Networks</p>
        </div>
        <div className="flex space-x-12 justify-center items-center opacity-40 grayscale pointer-events-none select-none max-w-5xl mx-auto px-6">
          <span className="font-serif text-xl font-bold">OncoAlliance</span>
          <span className="font-serif text-xl font-bold">AetnaElite</span>
          <span className="font-serif text-xl font-bold">CrossBlue</span>
          <span className="font-serif text-xl font-bold">GlobalMed Trials</span>
          <span className="font-serif text-xl font-bold">UnitedOncology</span>
        </div>
      </section>

      {/* 4. ABOUT MISSION SNAPSHOT */}
      <section id="about" className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000" 
                     alt="Oncologist analyzing clinical data" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-widest text-belam-blue uppercase block">OUR MISSION</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0F2942] leading-tight">
                Care you can trust. Science that empowers.
              </h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                At Belam Cancer Center, we believe beating cancer requires more than exceptional medicine—it demands an environment focused entirely on your dignity and unique physiological profile.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By integrating real-time genomic mapping, targeted radiation therapies, and compassionate holistic survivorship programs, our tumor boards build customized maps for every step of your healing journey.
              </p>
              <div className="pt-4">
                <button onClick={() => setIsBookingOpen(true)} className="group inline-flex items-center space-x-2 text-belam-blue font-semibold tracking-wide hover:text-belam-pink transition-colors">
                  <span>Begin your consultation path</span>
                  <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. SERVICES / TREATMENTS GRID */}
      <section id="services" className="bg-[#FAFAFA] py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-semibold tracking-widest text-[#2A9D8F] uppercase block">WHAT WE OFFER</span>
            <h2 className="font-serif text-4xl font-bold text-[#0F2942]">Targeted Oncological Disciplines</h2>
            <p className="text-gray-500 font-light">Advanced modal therapeutic frameworks managed by multi-disciplinary clinical teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Precision Immunotherapy', desc: 'Harnessing and engineering your biological immune framework to target specific tumor cell markers.' },
              { title: 'Advanced Radiotherapy', desc: 'Highly confined, image-guided beam delivery architectures minimizing damage to surrounding healthy tissue.' },
              { title: 'Surgical Oncology', desc: 'Minimally invasive approaches geared towards complex tissue margin removals and systemic protection.' },
              { title: 'Genomic Profiling', desc: 'Deep cellular mapping to isolate specific DNA mutations, allowing hyper-customized chemical therapy.' },
              { title: 'Experimental Therapeutics', desc: 'Direct, prioritized pipeline routing to global Phase I-III oncology clinical trials.' },
              { title: 'Integrative Survivorship', desc: 'Comprehensive nutrition, mental health, and physical therapeutic blueprints for post-treatment life.' },
            ].map((srv, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <h3 className="font-serif text-xl font-bold text-[#0F2942] mb-3 group-hover:text-[#2A9D8F] transition-colors relative inline-block">
                  {srv.title}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2A9D8F] transition-all duration-300 group-hover:w-full" />
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS / THE JOURNEY */}
      <section id="process" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#2A9D8F] uppercase block mb-2">OUR PROCESS</span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2942]">Your First 3 Steps</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            { num: '01', title: 'Intake Discovery', desc: 'Upload previous pathology reports seamlessly. Our coordinators align your data with specific department chairs.' },
            { num: '02', title: 'Tumor Board Analysis', desc: 'A dedicated multi-disciplinary specialist cluster meets to evaluate your custom therapeutic map.' },
            { num: '03', title: 'Empowered Navigation', desc: 'Meet your lifelong nurse navigator and finalize a clear, predictable roadmap built for your family.' },
          ].map((proc, idx) => (
            <div key={idx} className="space-y-4 border-t border-gray-200 pt-6">
              <span className="font-serif text-5xl font-extrabold text-[#2A9D8F]/20 block">{proc.num}</span>
              <h3 className="font-serif text-2xl font-bold text-[#0F2942]">{proc.title}</h3>
              <p className="text-gray-600 font-light text-sm leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. STATS BAR */}
      <section className="bg-[#0F2942] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Oncology Specialists', val: '120+' },
            { label: 'Years of Excellence', val: '25+' },
            { label: 'Clinical Trial Enrollments', val: '1,400+' },
            { label: 'Patient Satisfaction', val: '99.2%' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="font-serif text-4xl lg:text-5xl font-bold text-[#D4AF37]">{stat.val}</p>
              <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. DOCTOR SPOTLIGHTS */}
      <section id="doctors" className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#2A9D8F] uppercase block mb-2">EXPERT LEADERSHIP</span>
            <h2 className="font-serif text-4xl font-bold text-[#0F2942]">Oncology Specialists</h2>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="text-sm font-semibold tracking-wider text-[#2A9D8F] uppercase border-b-2 border-[#2A9D8F] pb-1 hover:text-[#21766C] hover:border-[#21766C] transition-all"
          >
            Meet our entire medical board
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Dr. Evelyn Sterling, MD', spec: 'Chair, Breast Cancer Therapeutics', img: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=600' },
            { name: 'Dr. Marcus Vance, PhD', spec: 'Director, Hematologic Research', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600' },
            { name: 'Dr. Sarah Jenkins, MD', spec: 'Chief of Surgical Oncology', img: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600' },
          ].map((doc, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-80 bg-gray-100 overflow-hidden relative">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-xs font-semibold tracking-wide uppercase text-[#2A9D8F]">{doc.spec}</p>
                <h4 className="font-serif text-xl font-bold text-[#0F2942]">{doc.name}</h4>
                <button 
                  onClick={() => {
                    setBookingData({ ...bookingData, doctor: doc.name });
                    setIsBookingOpen(true);
                  }} 
                  className="pt-2 text-xs font-medium tracking-wider uppercase text-gray-500 flex items-center space-x-1 hover:text-[#2A9D8F] transition-colors"
                >
                  <span>Request Consultation</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. APPOINTMENT CTA BANNER */}
      <section className="bg-gradient-to-br from-[#0F2942] to-[#0A1A2A] text-white py-24 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Your journey matters. Let us stand with you.</h2>
          <p className="text-gray-300 font-light max-w-xl mx-auto">
            Get an expert second opinion or map out immediate treatment parameters. Our intake office manages transitions cleanly and securely.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-[#2A9D8F] hover:bg-[#21766C] text-white px-10 py-4 rounded font-medium shadow-xl tracking-wider transition-all"
            >
              Request an Urgent Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-[#12161A] text-gray-400 py-16 text-sm border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-white tracking-tight">Belam Cancer Center</h3>
            <p className="font-light leading-relaxed text-gray-500">Dedicated precision oncology networks designed around innovative therapeutic blueprints.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Therapies</h4>
            <ul className="space-y-2 font-light">
              <li><a href="#services" className="hover:text-white transition-colors">Immunotherapy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Targeted Radiation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Clinical Research</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Contact & Intake</h4>
            <ul className="space-y-2 font-light text-gray-500">
              <li>No. 16A Patrick O. Bokkor Crescent Abuja, Jabi, Nigeria</li>
              <li>belammedical15@gmail.com</li>
              <li className="text-white font-medium">0814 975 1331</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Accreditation</h4>
            <p className="font-light text-xs text-gray-500 leading-relaxed">NCI Comprehensive Care Standard Registry Indicator.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Belam Cancer Center Limited. All rights reserved.
        </div>
      </footer>

      {/* 11. STEPPED BOOKING ENGINE MODAL */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F2942]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
            <div className="bg-[#0F2942] p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold">Request Consultation</h3>
                <p className="text-xs text-gray-400 mt-0.5">Step {bookingStep} of 3</p>
              </div>
              <button onClick={() => setIsBookingOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-6">
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Oncology Department Focus</label>
                  <select 
                    value={bookingData.specialty} 
                    onChange={(e) => setBookingData({...bookingData, specialty: e.target.value})}
                    className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-[#2A9D8F]"
                  >
                    <option value="">Select Specialty Path...</option>
                    <option value="immunotherapy">Precision Immunotherapy</option>
                    <option value="radiotherapy">Advanced Radiotherapy</option>
                    <option value="surgical">Surgical Oncology</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mt-4">Preferred Oncologist</label>
                  <select 
                    value={bookingData.doctor} 
                    onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})}
                    className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-[#2A9D8F]"
                  >
                    <option value="">First Available Tumor Board Specialist</option>
                    <option value="Dr. Evelyn Sterling, MD">Dr. Evelyn Sterling, MD</option>
                    <option value="Dr. Marcus Vance, PhD">Dr. Marcus Vance, PhD</option>
                    <option value="Dr. Sarah Jenkins, MD">Dr. Sarah Jenkins, MD</option>
                  </select>

                  <button 
                    disabled={!bookingData.specialty}
                    onClick={() => setBookingStep(2)}
                    className="w-full mt-6 bg-[#2A9D8F] disabled:bg-gray-200 disabled:cursor-not-allowed text-white p-3 rounded font-medium transition-all text-sm"
                  >
                    Continue to Scheduling
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Preferred Date Range</label>
                  <input 
                    type="date" 
                    value={bookingData.date} 
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-[#2A9D8F]" 
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">Preferred Time Frame</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                      <button 
                        key={time} 
                        onClick={() => setBookingData({...bookingData, time})}
                        className={`p-2.5 text-xs border rounded transition-all ${bookingData.time === time ? 'bg-[#2A9D8F] text-white border-[#2A9D8F]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button onClick={() => setBookingStep(1)} className="w-1/3 border border-gray-200 text-gray-600 p-3 rounded text-sm font-medium">Back</button>
                    <button 
                      disabled={!bookingData.date || !bookingData.time}
                      onClick={() => setBookingStep(3)}
                      className="w-2/3 bg-[#2A9D8F] disabled:bg-gray-200 text-white p-3 rounded text-sm font-medium transition-all"
                    >
                      Patient Intake
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Full Legal Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    value={bookingData.name} 
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-[#2A9D8F]" 
                  />

                  <label className="block text-sm font-medium text-gray-700">Secure Contact Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    value={bookingData.email} 
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-[#2A9D8F]" 
                  />

                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 flex items-start space-x-2 mt-2">
                    <Clock size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>A secure verification link along with an intake questionnaire will route immediately to this channel.</span>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button onClick={() => setBookingStep(2)} className="w-1/3 border border-gray-200 text-gray-600 p-3 rounded text-sm font-medium">Back</button>
                    <button 
                      disabled={!bookingData.name || !bookingData.email}
                      onClick={() => {
                        alert(`Consultation Requested for ${bookingData.name}. Our intake office will connect shortly.`);
                        setIsBookingOpen(false);
                      }}
                      className="w-2/3 bg-[#2A9D8F] disabled:bg-gray-200 text-white p-3 rounded text-sm font-medium transition-all"
                    >
                      Complete Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}