import React, { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

/**
 * ServicesStickyCards Component
 * 
 * A responsive services section with sticky card behavior using CSS position:sticky.
 * Features:
 * - Pure CSS sticky behavior (no GSAP required)
 * - Responsive grid layout (1 col mobile, 2 cols tablet, 3 cols desktop)
 * - Smooth scroll-triggered animations
 * - Full dark/light theme support
 * - Accessible and keyboard-friendly
 * 
 * @param {Object} props
 * @param {Array} props.services - Array of service objects: { id, title, description, icon, features[] }
 * @param {string} props.className - Additional CSS classes
 */
const ServicesStickyCards = ({ services = [], className = '' }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger animation delay based on card index
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observe all cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [services]);

  return (
    <section
      ref={sectionRef}
      id="services-sticky"
      className={`services-sticky-section relative py-20 px-4 sm:px-6 lg:px-8 
        bg-white dark:bg-gray-900 transition-colors duration-300 ${className}`}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 
            text-gray-900 dark:text-white transition-colors duration-300">
            Professional Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 
            max-w-3xl mx-auto transition-colors duration-300">
            Comprehensive solutions tailored to bring your digital vision to life
          </p>
        </div>
      </div>

      {/* Services Grid with Sticky Card */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`service-card-wrapper opacity-0 translate-y-8 transition-all duration-700 
                ${index === 0 ? 'md:row-span-2 lg:sticky lg:top-24 lg:h-fit' : ''}`}
            >
              <ServiceCard
                service={service}
                index={index}
                isSticky={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="max-w-7xl mx-auto mt-16 pt-16 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <p className="text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Trusted by Clients Worldwide
        </p>
      </div>

      {/* Custom Styles for Animation */}
      <style jsx>{`
        .service-card-wrapper.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Smooth sticky behavior */
        @media (min-width: 1024px) {
          .service-card-wrapper.lg\\:sticky {
            position: -webkit-sticky;
            position: sticky;
            align-self: flex-start;
          }
        }

        /* Ensure smooth transitions */
        .service-card-wrapper {
          will-change: opacity, transform;
        }
      `}</style>
    </section>
  );
};

export default ServicesStickyCards;
