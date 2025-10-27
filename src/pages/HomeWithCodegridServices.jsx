import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import ServicesStickyCodegrid from '../components/ServicesStickyCodegrid';

/**
 * Example Home Page with Codegrid Sticky Services
 * 
 * This demonstrates how to integrate the converted sticky cards design
 * from codegrid-sticky-cards-nextjs into your React portfolio.
 * 
 * Features:
 * - Lenis smooth scrolling
 * - Dark/Light theme support
 * - GSAP ScrollTrigger animations
 */
function HomeWithCodegridServices() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      {/* Smooth Scrolling */}
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Hero Section */}
        <section className={`hero-section ${isDark ? 'dark' : 'light'}`}>
          <div className="hero-content">
            <h1>Welcome to My Portfolio</h1>
            <p>Discover what I can do for you</p>
          </div>
        </section>

        {/* Services Section with Sticky Cards */}
        <ServicesStickyCodegrid isDark={isDark} />

        {/* Contact Section */}
        <section className={`contact-section ${isDark ? 'dark' : 'light'}`}>
          <h1>Get In Touch</h1>
          <p>Let's work together on your next project</p>
        </section>

      </ReactLenis>

      <style jsx>{`
        .app {
          position: relative;
          width: 100%;
          min-height: 100vh;
        }

        .theme-toggle {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 1000;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: ${isDark ? '#edf1e8' : '#1a1a1a'};
          color: ${isDark ? '#1a1a1a' : '#edf1e8'};
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .hero-section,
        .contact-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .hero-section.dark,
        .contact-section.dark {
          background-color: #1a1a1a;
          color: #edf1e8;
        }

        .hero-section.light,
        .contact-section.light {
          background-color: #edf1e8;
          color: #1a1a1a;
        }

        .hero-content h1,
        .contact-section h1 {
          font-size: clamp(2.5rem, 8vw, 7rem);
          font-weight: 800;
          letter-spacing: -0.35rem;
          line-height: 1.1;
          margin-bottom: 1rem;
          font-family: 'Manrope', 'Barlow Condensed', sans-serif;
        }

        .hero-content p,
        .contact-section p {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          font-weight: 500;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .theme-toggle {
            top: 1rem;
            right: 1rem;
            width: 3rem;
            height: 3rem;
            font-size: 1.25rem;
          }

          .hero-content h1,
          .contact-section h1 {
            letter-spacing: -0.1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default HomeWithCodegridServices;
