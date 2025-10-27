"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * ServicesStickyCodegrid Component
 * 
 * Converted from codegrid-sticky-cards-nextjs design.
 * Features GSAP ScrollTrigger pinning with scale/rotate effects.
 * 
 * @param {Object} props
 * @param {boolean} props.isDark - Theme mode (dark/light)
 */
const ServicesStickyCodegrid = ({ isDark = false }) => {
  const container = useRef(null);

  const servicesData = [
    {
      index: "01",
      title: "Web Development",
      icon: "💻",
      description:
        "Building responsive, high-performance websites with modern frameworks. Every pixel is crafted for speed, accessibility, and seamless user experience across all devices.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      index: "02",
      title: "Mobile Development",
      icon: "📱",
      description:
        "Native and cross-platform mobile apps that users love. Clean architecture, smooth animations, and intuitive interfaces that work flawlessly on iOS and Android.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      index: "03",
      title: "AI Solutions",
      icon: "🤖",
      description:
        "Intelligent systems powered by machine learning and deep learning. From computer vision to NLP, creating AI that solves real-world problems with precision.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      index: "04",
      title: "UI/UX Design",
      icon: "🎨",
      description:
        "User-centered design that combines aesthetics with functionality. Creating beautiful, intuitive interfaces that enhance user experience and drive engagement.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".services-sticky-card");

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
          });
        }

        // Scale and rotate animation for all except last
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotation = (index % 2 === 0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card, {
                scale: scale,
                rotation: rotation,
                "--after-opacity": afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <>
      {/* Intro Section */}
      <section className={`services-intro-section ${isDark ? 'dark' : 'light'}`}>
        <h1>My Services</h1>
      </section>

      {/* Sticky Cards Container */}
      <div className={`services-sticky-cards ${isDark ? 'dark' : 'light'}`} ref={container}>
        {servicesData.map((service, index) => (
          <div className="services-sticky-card" key={index}>
            {/* Left Side - Index Number */}
            <div className="services-sticky-card-index">
              <h1>{service.index}</h1>
            </div>

            {/* Right Side - Content */}
            <div className="services-sticky-card-content">
              <div className="services-sticky-card-content-wrapper">
                {/* Title with Icon */}
                <div className="services-sticky-card-header-row">
                  <span className="services-sticky-card-icon">{service.icon}</span>
                  <h1 className="services-sticky-card-header">{service.title}</h1>
                </div>

                {/* Image/Visual */}
                <div className="services-sticky-card-img">
                  <div 
                    className="services-sticky-card-img-gradient"
                    style={{ background: service.gradient }}
                  >
                    <span className="services-sticky-card-img-icon">{service.icon}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="services-sticky-card-copy">
                  <div className="services-sticky-card-copy-title">
                    <p>(About the service)</p>
                  </div>
                  <div className="services-sticky-card-copy-description">
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro Section */}
      <section className={`services-outro-section ${isDark ? 'dark' : 'light'}`}>
        <h1>Let's Build Together</h1>
      </section>

      <style jsx>{`
        /* Intro/Outro Sections */
        .services-intro-section,
        .services-outro-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .services-intro-section.dark,
        .services-outro-section.dark {
          background-color: #1a1a1a;
          color: #edf1e8;
        }

        .services-intro-section.light,
        .services-outro-section.light {
          background-color: #edf1e8;
          color: #1a1a1a;
        }

        .services-intro-section h1,
        .services-outro-section h1 {
          font-size: 7rem;
          font-weight: 800;
          letter-spacing: -0.35rem;
          line-height: 1.1;
          font-family: 'Manrope', 'Barlow Condensed', sans-serif;
        }

        /* Sticky Cards Container */
        .services-sticky-cards {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .services-sticky-cards.dark {
          background-color: #1a1a1a;
        }

        .services-sticky-cards.light {
          background-color: #edf1e8;
        }

        .services-sticky-card {
          position: relative;
          width: 100%;
          height: 100vh;
          padding: 1.5rem;
          display: flex;
          gap: 3rem;
          will-change: transform;
        }

        .services-sticky-cards.dark .services-sticky-card {
          background-color: #edf1e8;
          color: #1a1a1a;
        }

        .services-sticky-cards.light .services-sticky-card {
          background-color: #1a1a1a;
          color: #edf1e8;
        }

        .services-sticky-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: var(--after-opacity, 0);
          transition: opacity 0.1s ease;
          pointer-events: none;
          z-index: 2;
        }

        /* Left Side - Index */
        .services-sticky-card-index {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .services-sticky-card-index h1 {
          font-size: 10rem;
          font-weight: 800;
          letter-spacing: -0.5rem;
          line-height: 1;
          font-family: 'Manrope', 'Barlow Condensed', sans-serif;
        }

        /* Right Side - Content */
        .services-sticky-card-content {
          flex: 4;
          padding-top: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .services-sticky-card-content-wrapper {
          width: 75%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .services-sticky-card-header-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .services-sticky-card-icon {
          font-size: 3.5rem;
          line-height: 1;
        }

        .services-sticky-card-header {
          font-size: 4.5rem;
          font-weight: 800;
          letter-spacing: -0.225rem;
          line-height: 1.1;
          font-family: 'Manrope', 'Barlow Condensed', sans-serif;
        }

        .services-sticky-card-img {
          aspect-ratio: 5/3;
          overflow: hidden;
          border-radius: 1rem;
        }

        .services-sticky-card-img-gradient {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .services-sticky-card-img-icon {
          font-size: 8rem;
          opacity: 0.3;
          filter: blur(2px);
        }

        .services-sticky-card-copy {
          display: flex;
          gap: 1.5rem;
        }

        .services-sticky-card-copy-title {
          flex: 2;
        }

        .services-sticky-card-copy-description {
          flex: 4;
        }

        .services-sticky-card-copy-title p {
          text-transform: uppercase;
          font-weight: 650;
          font-size: 0.875rem;
          opacity: 0.7;
        }

        .services-sticky-card-copy-description p {
          font-size: 1.125rem;
          font-weight: 500;
          line-height: 1.6;
        }

        /* Mobile Responsive */
        @media (max-width: 1000px) {
          .services-intro-section h1,
          .services-outro-section h1 {
            font-size: 2.5rem;
            letter-spacing: -0.125rem;
          }

          .services-sticky-card {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          .services-sticky-card-index {
            flex: unset;
            justify-content: flex-start;
            padding-top: 0.5rem;
          }

          .services-sticky-card-index h1 {
            font-size: 3.5rem;
            letter-spacing: -0.175rem;
          }

          .services-sticky-card-content {
            padding-top: 0;
          }

          .services-sticky-card-content-wrapper {
            width: 100%;
            gap: 1rem;
          }

          .services-sticky-card-header-row {
            gap: 1rem;
          }

          .services-sticky-card-icon {
            font-size: 2rem;
          }

          .services-sticky-card-header {
            font-size: 2rem;
            letter-spacing: -0.1rem;
          }

          .services-sticky-card-img-icon {
            font-size: 4rem;
          }

          .services-sticky-card-copy {
            flex-direction: column;
            gap: 0.5rem;
          }

          .services-sticky-card-copy-title p {
            font-size: 0.75rem;
          }

          .services-sticky-card-copy-description p {
            font-size: 1rem;
            line-height: 1.5;
          }
        }

        @media (max-width: 640px) {
          .services-intro-section h1,
          .services-outro-section h1 {
            font-size: 2rem;
            letter-spacing: 0;
          }

          .services-sticky-card-index h1 {
            font-size: 2.5rem;
            letter-spacing: 0;
          }

          .services-sticky-card-header {
            font-size: 1.5rem;
            letter-spacing: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ServicesStickyCodegrid;
