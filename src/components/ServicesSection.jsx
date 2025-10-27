"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ServicesSection = ({ isDark }) => {
  const containerRef = useRef(null);
  const cardsInitialized = useRef(false);

  const servicesData = [
    {
      index: "01",
      title: "Web Development",
      icon: "🌐",
      description:
        "Building responsive, high-performance websites with modern frameworks. Every pixel is crafted for speed, accessibility, and seamless user experience across all devices.",
      gradientFrom: "#3b82f6",
      gradientVia: "#8b5cf6",
      gradientTo: "#d946ef"
    },
    {
      index: "02",
      title: "AI Solutions",
      icon: "🤖",
      description:
        "Intelligent systems powered by machine learning and deep learning. From computer vision to NLP, creating AI that solves real-world problems with precision.",
      gradientFrom: "#10b981",
      gradientVia: "#14b8a6",
      gradientTo: "#06b6d4"
    },
    {
      index: "03",
      title: "Mobile Development",
      icon: "📱",
      description:
        "Native and cross-platform mobile apps that users love. Clean architecture, smooth animations, and intuitive interfaces that work flawlessly on iOS and Android.",
      gradientFrom: "#f59e0b",
      gradientVia: "#f97316",
      gradientTo: "#ef4444"
    },
    {
      index: "04",
      title: "Database Engineering",
      icon: "🗄️",
      description:
        "Robust data architecture and optimization. Designing scalable database solutions that ensure data integrity, performance, and security at every level.",
      gradientFrom: "#8b5cf6",
      gradientVia: "#a855f7",
      gradientTo: "#ec4899"
    },
  ];

  useEffect(() => {
    if (cardsInitialized.current) return;
    if (!containerRef.current) return;

    const initStickyCards = () => {
      if (window.innerWidth < 1000) {
        // Kill all ScrollTriggers on mobile
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.trigger?.closest('.services-sticky-cards')) {
            st.kill();
          }
        });
        
        const cards = containerRef.current?.querySelectorAll('.services-sticky-card');
        cards?.forEach(card => {
          gsap.set(card, { clearProps: 'all' });
        });
        return;
      }

      const stickyCards = containerRef.current?.querySelectorAll('.services-sticky-card');
      if (!stickyCards || stickyCards.length === 0) return;

      // Kill existing ScrollTriggers first
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger?.closest('.services-sticky-cards')) {
          st.kill();
        }
      });

      stickyCards.forEach((card, index) => {
        // Pin each card except the last one
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }

        // Scale and rotate animation for all except last
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const overlayOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
              });

              // Update overlay opacity via CSS variable
              card.style.setProperty('--overlay-opacity', overlayOpacity);
            },
          });
        }
      });

      cardsInitialized.current = true;
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initStickyCards, 100);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cardsInitialized.current = false;
        initStickyCards();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger?.closest('.services-sticky-cards')) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <>
      {/* Services Intro Section */}
      <section className={`relative w-full min-h-screen flex items-center justify-center px-4 py-20 ${isDark ? 'bg-[#171717]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-[8rem] md:text-[12rem] font-extrabold uppercase leading-[0.8] text-blue-600" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            My Services
          </h2>
          <p className={`text-2xl md:text-4xl font-normal leading-relaxed ${isDark ? 'text-white/80' : 'text-[#171717]/80'}`} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 400 }}>
            Crafting <span className="text-blue-600 font-semibold">Digital Solutions</span> from concept to deployment — Web, Mobile, AI, and Database Engineering with precision and passion.
          </p>
        </div>
      </section>

      {/* Sticky Cards Section */}
      <div className={`services-sticky-cards w-full pb-20 ${isDark ? 'bg-[#171717]' : 'bg-white'}`} ref={containerRef}>
      {servicesData.map((service, index) => {
        // Determine if this is the last card
        const isLastCard = index === servicesData.length - 1;
        
        return (
        <div
          key={index}
          className={`services-sticky-card relative w-full min-h-screen ${
            isDark ? 'bg-[#edf1e8] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#edf1e8]'
          } p-6 md:p-8 lg:p-12 flex gap-8 lg:gap-16 lg:flex-row flex-col ${isLastCard ? 'mb-20' : ''}`}
          style={{ willChange: 'transform' }}
        >
          {/* Dark overlay that appears on scroll */}
          <div
            className="absolute inset-0 bg-black/50 pointer-events-none z-10 transition-opacity duration-100"
            style={{ opacity: 'var(--overlay-opacity, 0)' }}
          />

          {/* Index Number - Left Side */}
          <div className="flex-[1] lg:flex-[2] flex items-start pt-4 lg:items-center justify-start lg:justify-center relative z-20">
            <h1 
              className="text-[5rem] sm:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-extrabold leading-[0.85] select-none"
              style={{ 
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: '-0.05em'
              }}
            >
              {service.index}
            </h1>
          </div>

          {/* Content - Right Side */}
          <div className="flex-[3] lg:flex-[4] pt-0 lg:pt-8 flex items-center relative z-20">
            <div className="w-full lg:w-4/5 xl:w-3/4 flex flex-col gap-6 lg:gap-8">
              {/* Title with Icon */}
              <div className="flex items-center gap-4 lg:gap-6">
                <div className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center ${
                  isDark ? 'bg-black/20 shadow-lg' : 'bg-white/10 shadow-2xl'
                }`}>
                  <span className="text-4xl lg:text-5xl">{service.icon}</span>
                </div>
                <h2 
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1]"
                  style={{ 
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '-0.02em'
                  }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Image/Gradient Card */}
              <div 
                className="w-full aspect-[16/10] lg:aspect-[5/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl relative group"
                style={{
                  background: `linear-gradient(135deg, ${service.gradientFrom} 0%, ${service.gradientVia} 50%, ${service.gradientTo} 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
                  <span className="text-6xl lg:text-8xl xl:text-9xl opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                    {service.icon}
                  </span>
                </div>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>

              {/* Description Section */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <div className="flex-[1] lg:flex-[2]">
                  <p className={`text-xs lg:text-sm font-bold uppercase tracking-wider ${
                    isDark ? 'text-[#1a1a1a]/60' : 'text-[#edf1e8]/60'
                  }`}>
                    (About the service)
                  </p>
                </div>
                <div className="flex-[2] lg:flex-[4]">
                  <p className="text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })}
      </div>
    </>
  );
};

export default ServicesSection;
