import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutPortfolio = ({ isDark }) => {
  const aboutSectionRef = useRef(null);
  const aboutCardsRef = useRef([]);

  useEffect(() => {
    if (window.innerWidth < 1000) return;

    const ctx = gsap.context(() => {
      const aboutSection = aboutSectionRef.current;
      const aboutCards = aboutCardsRef.current.filter(Boolean);

      // Initial state - cards hidden
      gsap.set(aboutCards, { y: '125%' });
      aboutCards.forEach((card) => {
        const initial = card.querySelector('.about-card-initial h1');
        gsap.set(initial, { scale: 0 });
      });

      // Card content initial positions - use left property for slide-in
      aboutCards.forEach((card, index) => {
        const cardContent = card.querySelector('.about-card-content');
        const cardInitialLeft = 300 - index * 100; // 300%, 200%, 100%
        gsap.set(cardContent, {
          left: `${cardInitialLeft}%`,
          top: 0,
          right: 'auto',
          bottom: 0,
          scale: 0.75,
          rotation: 20,
        });
      });

      // ENTRANCE ANIMATION
      const cardPlaceholderEntrance = ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          aboutCards.forEach((card, index) => {
            const entranceDelay = 0.15;
            const entranceDuration = 0.7;
            const entranceStart = index * entranceDelay;
            const entranceEnd = entranceStart + entranceDuration;

            if (progress >= entranceStart && progress <= entranceEnd) {
              const cardEntranceProgress = (progress - entranceStart) / entranceDuration;
              const entranceY = 125 - cardEntranceProgress * 125;
              gsap.set(card, { y: `${entranceY}%` });

              const initial = card.querySelector('.about-card-initial h1');
              const initialLetterScaleDelay = 0.4;
              const initialLetterScaleProgress = Math.max(
                0,
                (cardEntranceProgress - initialLetterScaleDelay) / (1 - initialLetterScaleDelay)
              );
              gsap.set(initial, { scale: initialLetterScaleProgress });
            } else if (progress > entranceEnd) {
              gsap.set(card, { y: '0%' });
              const initial = card.querySelector('.about-card-initial h1');
              gsap.set(initial, { scale: 1 });
            }
          });
        },
      });

      // SLIDE-IN ANIMATION
      const cardSlideInAnimation = ScrollTrigger.create({
        trigger: aboutSection,
        start: 'top top',
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          aboutCards.forEach((card, index) => {
            const cardContent = card.querySelector('.about-card-content');
            const slideInStagger = 0.075;
            const rotationDuration = 0.4;
            const rotationStart = index * slideInStagger;
            const rotationEnd = rotationStart + rotationDuration;

            // Rotation and position animation
            if (progress >= rotationStart && progress <= rotationEnd) {
              const cardProgress = (progress - rotationStart) / rotationDuration;
              const cardInitialLeft = 300 - index * 100;
              const cardTargetLeft = 0;
              const cardSlideInLeft = cardInitialLeft + cardProgress * (cardTargetLeft - cardInitialLeft);
              const cardSlideInRotation = 20 - cardProgress * 20;

              gsap.set(cardContent, {
                left: `${cardSlideInLeft}%`,
                rotation: cardSlideInRotation,
              });
            } else if (progress > rotationEnd) {
              gsap.set(cardContent, {
                left: 0,
                right: 0,
                rotation: 0,
              });
            }

            // Scale animation
            const cardScaleStagger = 0.12;
            const cardScaleStart = 0.4 + index * cardScaleStagger;
            const cardScaleEnd = 1;

            if (progress >= cardScaleStart && progress <= cardScaleEnd) {
              const scaleProgress = (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
              const scaleValue = 0.75 + scaleProgress * 0.25;
              gsap.set(cardContent, { scale: scaleValue });
            } else if (progress > cardScaleEnd) {
              gsap.set(cardContent, { scale: 1 });
            }
          });
        },
      });

      return () => {
        cardPlaceholderEntrance.kill();
        cardSlideInAnimation.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  const aboutData = [
    {
      initial: 'E',
      title: 'Education',
      subtitle: '( Academic Journey )',
      color: isDark ? '#ffffff' : '#000000',
      bgColor: isDark ? '#1a1a1a' : '#f2f5ea',
      content: {
        main: 'Master of Science',
        detail: 'Digital Technologies',
        school: 'OSTFALIA UNIVERSITY',
        location: 'Germany',
        period: '2025 – Current',
        focus: 'ML, AI, Deep Learning, Autonomous Systems',
      },
      secondaryContent: {
        main: 'Bachelor of Computer',
        detail: 'Applications',
        school: 'UKA TARSADIYA UNIVERSITY',
        location: 'India',
        period: '2021 – 2024',
        cgpa: '7.79 CGPA',
        focus: 'Software Engineering, Data Management, Cloud Computing',
      },
    },
    {
      initial: 'S',
      title: 'Specialization',
      subtitle: '( Technical Focus )',
      color: isDark ? '#ffffff' : '#000000',
      bgColor: isDark ? '#1a1a1a' : '#f2f5ea',
      specializations: [
        'Full-Stack Web Development',
        'AI & Machine Learning Applications',
        'Cross-Platform Mobile Development',
        'Data Engineering & Optimization',
      ],
    },
    {
      initial: 'J',
      title: 'Journey',
      subtitle: '( Global Experience )',
      color: isDark ? '#ffffff' : '#000000',
      bgColor: isDark ? '#1a1a1a' : '#f2f5ea',
      locations: [
        { flag: '🇩🇪', country: 'Germany', description: 'Pursuing Masters in Digital Technologies' },
        { flag: '🇮🇳', country: 'India', description: 'Completed BCA with Honors\nMultiple AI-Driven Innovation Projects' },
      ],
      languages: [
        { name: 'Gujarati', level: 'Mother Tongue' },
        { name: 'Hindi', level: 'Fluent' },
        { name: 'English', level: 'Fluent' },
        { name: 'German', level: 'Professional' },
      ],
    },
  ];

  return (
    <div className={`about-portfolio-wrapper ${isDark ? 'dark' : 'light'}`}>
      {/* HERO SECTION */}
      <section className={`hero-section ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Behind The Code
          </h1>
        </div>
      </section>

      {/* ABOUT CARDS SECTION */}
      <section
        ref={aboutSectionRef}
        className={`about-section ${isDark ? 'bg-black' : 'bg-white'}`}
      >
        <div className="about-cards-container">
          {aboutData.map((item, index) => (
            <div
              key={index}
              ref={(el) => (aboutCardsRef.current[index] = el)}
              className="about-card"
              style={{ zIndex: aboutData.length - index }}
            >
              {/* Large Initial Letter */}
              <div className="about-card-initial">
                <h1 style={{ color: item.color }}>{item.initial}</h1>
              </div>

              {/* Card Content */}
              <div
                className="about-card-content"
                style={{ backgroundColor: item.bgColor }}
              >
                {/* Education Card */}
                {item.title === 'Education' && (
                  <div className="card-inner">
                    <div className="card-header">
                      <p className="card-subtitle">{item.subtitle}</p>
                      <h1 className="card-title" style={{ color: item.color }}>
                        {item.title}
                      </h1>
                    </div>

                    <div className="education-content">
                      {/* Master's */}
                      <div className="education-block">
                        <h2 className="edu-degree">
                          {item.content.main} <span className="edu-detail">{item.content.detail}</span>
                        </h2>
                        <p className="edu-school">{item.content.school}</p>
                        <p className="edu-meta">
                          📍 {item.content.location} | {item.content.period}
                        </p>
                        <p className="edu-focus">FOCUS: {item.content.focus}</p>
                      </div>

                      {/* Bachelor's */}
                      {item.secondaryContent && (
                        <div className="education-block">
                          <h2 className="edu-degree">
                            {item.secondaryContent.main}{' '}
                            <span className="edu-detail">{item.secondaryContent.detail}</span>
                          </h2>
                          <p className="edu-school">{item.secondaryContent.school}</p>
                          <p className="edu-meta">
                            📍 {item.secondaryContent.location} | {item.secondaryContent.period}
                          </p>
                          <p className="edu-cgpa">{item.secondaryContent.cgpa}</p>
                          <p className="edu-focus">FOCUS: {item.secondaryContent.focus}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Specialization Card */}
                {item.title === 'Specialization' && (
                  <div className="card-inner">
                    <div className="card-header">
                      <p className="card-subtitle">{item.subtitle}</p>
                      <h1 className="card-title" style={{ color: item.color }}>
                        {item.title}
                      </h1>
                    </div>

                    <div className="specialization-content">
                      <ul className="spec-list">
                        {item.specializations.map((spec, idx) => (
                          <li key={idx} className="spec-item">
                            <span className="spec-bullet">▸</span>
                            <span className="spec-text">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Journey Card */}
                {item.title === 'Journey' && (
                  <div className="card-inner">
                    <div className="card-header">
                      <p className="card-subtitle">{item.subtitle}</p>
                      <h1 className="card-title" style={{ color: item.color }}>
                        {item.title}
                      </h1>
                    </div>

                    <div className="journey-content">
                      {/* Locations */}
                      <div className="journey-section">
                        <h3 className="journey-heading">Global Experience</h3>
                        {item.locations.map((loc, idx) => (
                          <div key={idx} className="location-block">
                            <span className="location-flag">{loc.flag}</span>
                            <div className="location-info">
                              <h4 className="location-country">{loc.country}</h4>
                              <p className="location-desc">{loc.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="journey-section">
                        <h3 className="journey-heading">Language Skills</h3>
                        <div className="languages-grid">
                          {item.languages.map((lang, idx) => (
                            <div key={idx} className="language-item">
                              <p className="lang-name">{lang.name}</p>
                              <p className="lang-level">{lang.level}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTRO SECTION */}
      <section className={`outro-section ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="outro-content">
          <h1 className="outro-title" style={{ color: isDark ? '#ffffff' : '#000000' }}>
            Where Vision Meets Execution
          </h1>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');

        .about-portfolio-wrapper {
          font-family: 'Barlow Condensed', sans-serif;
          width: 100%;
          overflow-x: hidden;
        }

        /* HERO SECTION */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 1rem;
        }

        .hero-content {
          width: 100%;
          text-align: center;
        }

        .hero-title {
          text-transform: uppercase;
          font-size: clamp(4rem, 12vw, 12rem);
          font-weight: 800;
          line-height: 0.8;
          width: 75%;
          margin: 0 auto;
        }

        /* ABOUT SECTION */
        .about-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          padding: 2rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-cards-container {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: calc(100vh - 4rem);
          display: flex;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .about-card {
          flex: 1;
          position: relative;
          width: 100%;
          height: 85%;
          max-height: 650px;
          border: 2px dashed ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(23, 23, 23, 0.35)'};
          border-radius: 1.5rem;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .about-card-initial {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .about-card-initial h1 {
          text-transform: uppercase;
          font-size: clamp(6rem, 15vw, 12rem);
          font-weight: 800;
          line-height: 1;
          will-change: transform;
          text-align: center;
          margin: 0;
          padding: 0;
        }

        .about-card-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 4px;
          padding: 1.5rem;
          border-radius: 1.3rem;
          overflow: visible;
          will-change: transform;
          z-index: 2;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          text-align: center;
          padding: 0.5rem;
          overflow: visible;
        }

        .card-header {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .card-subtitle {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : '#171717'};
        }

        .card-title {
          text-transform: uppercase;
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 800;
          line-height: 0.8;
        }

        /* EDUCATION CONTENT */
        .education-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          width: 100%;
        }

        .education-block {
          text-align: center;
          width: 100%;
          padding: 0.25rem;
        }

        .edu-degree {
          text-transform: uppercase;
          font-size: clamp(1.5rem, 2.5vw, 2.5rem);
          font-weight: 700;
          line-height: 1;
          color: ${isDark ? '#e0e0e0' : '#fc694c'};
          margin-bottom: 0.4rem;
        }

        .edu-detail {
          display: block;
          color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : '#171717'};
        }

        .edu-school {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.7rem, 1vw, 1rem);
          font-weight: 600;
          color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : '#171717'};
          margin-top: 0.4rem;
        }

        .edu-meta {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.65rem, 0.85vw, 0.85rem);
          font-weight: 500;
          color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(23, 23, 23, 0.7)'};
          margin-top: 0.3rem;
        }

        .edu-cgpa {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.8rem, 1vw, 1rem);
          font-weight: 700;
          color: ${isDark ? '#e0e0e0' : '#fc694c'};
          margin-top: 0.3rem;
        }

        .edu-focus {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.65rem, 0.8vw, 0.8rem);
          font-weight: 500;
          color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(23, 23, 23, 0.8)'};
          margin-top: 0.5rem;
          line-height: 1.3;
        }

        /* SPECIALIZATION CONTENT */
        .specialization-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .spec-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          align-items: center;
        }

        .spec-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 0.7rem;
          width: 100%;
          max-width: 280px;
        }

        .spec-bullet {
          font-size: clamp(1.3rem, 1.8vw, 1.8rem);
          color: ${isDark ? '#e0e0e0' : '#fc694c'};
          line-height: 1;
        }

        .spec-text {
          text-transform: uppercase;
          font-size: clamp(1rem, 1.6vw, 1.6rem);
          font-weight: 600;
          line-height: 1.2;
          color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : '#171717'};
        }

        /* JOURNEY CONTENT */
        .journey-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          width: 100%;
        }

        .journey-section {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .journey-heading {
          text-transform: uppercase;
          font-size: clamp(1rem, 1.3vw, 1.3rem);
          font-weight: 700;
          color: ${isDark ? '#e0e0e0' : '#fc694c'};
          margin-bottom: 0.75rem;
          text-align: center;
        }

        .location-block {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 0.7rem;
          margin-bottom: 0.75rem;
          width: 100%;
          max-width: 260px;
        }

        .location-flag {
          font-size: clamp(1.5rem, 2.2vw, 2.2rem);
          line-height: 1;
          flex-shrink: 0;
        }

        .location-info {
          flex: 1;
          text-align: left;
        }

        .location-country {
          text-transform: uppercase;
          font-size: clamp(1.2rem, 1.6vw, 1.6rem);
          font-weight: 700;
          color: ${isDark ? 'rgba(255, 255, 255, 0.95)' : '#171717'};
          margin-bottom: 0.3rem;
        }

        .location-desc {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.65rem, 0.8vw, 0.8rem);
          font-weight: 500;
          color: ${isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(23, 23, 23, 0.7)'};
          line-height: 1.4;
          white-space: pre-line;
        }

        .languages-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
          width: 100%;
          max-width: 260px;
          margin: 0 auto;
        }

        .language-item {
          text-align: center;
          padding: 0.4rem;
        }

        .lang-name {
          text-transform: uppercase;
          font-size: clamp(0.9rem, 1.1vw, 1.1rem);
          font-weight: 600;
          color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : '#171717'};
          margin-bottom: 0.2rem;
        }

        .lang-level {
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          font-size: clamp(0.65rem, 0.8vw, 0.8rem);
          font-weight: 500;
          color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(23, 23, 23, 0.6)'};
        }

        /* OUTRO SECTION */
        .outro-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 1rem;
        }

        .outro-content {
          width: 100%;
          text-align: center;
        }

        .outro-title {
          text-transform: uppercase;
          font-size: clamp(4rem, 12vw, 12rem);
          font-weight: 800;
          line-height: 0.8;
          width: 75%;
          margin: 0 auto;
        }

        /* SCROLLBAR STYLING */
        .about-card-content::-webkit-scrollbar {
          width: 6px;
        }

        .about-card-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .about-card-content::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(252, 105, 76, 0.5)'};
          border-radius: 10px;
        }

        .about-card-content::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(252, 105, 76, 0.7)'};
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 1000px) {
          .hero-title,
          .outro-title {
            width: 100%;
            font-size: clamp(3rem, 10vw, 4rem);
          }

          .about-section {
            height: auto;
            min-height: 100vh;
            padding: 1rem;
          }

          .about-cards-container {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 1.5rem;
            height: auto;
            max-width: 100%;
            padding: 1rem 0;
          }

          .about-card {
            width: 100%;
            max-width: 350px;
            height: 500px;
            transform: translateY(0%) !important;
            margin: 0 auto;
          }

          .about-card-initial h1 {
            transform: scale(1) !important;
            font-size: clamp(4rem, 12vw, 8rem);
          }

          .about-card-content {
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            margin: 4px;
            transform: none !important;
            scale: 1 !important;
            rotate: 0deg !important;
            padding: 1rem;
          }

          .card-title {
            font-size: clamp(2rem, 6vw, 3.5rem);
          }

          .card-inner {
            gap: 1rem;
            padding: 0.5rem;
          }

          .education-content {
            gap: 1rem;
          }

          .education-block {
            margin-bottom: 0.5rem;
            padding: 0.25rem;
          }

          .spec-list {
            gap: 0.8rem;
          }

          .spec-item {
            max-width: 250px;
          }

          .location-block {
            max-width: 250px;
            margin-bottom: 0.8rem;
          }

          .languages-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 250px;
            gap: 0.6rem;
          }

          .journey-content {
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .about-section {
            padding: 0.5rem;
          }

          .about-cards-container {
            gap: 1rem;
            padding: 0.5rem 0;
          }

          .about-card {
            max-width: 95vw;
            height: 450px;
          }

          .about-card-content {
            padding: 0.8rem;
          }

          .card-inner {
            padding: 0.25rem;
          }

          .hero-title,
          .outro-title {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .about-card-initial h1 {
            font-size: clamp(3rem, 10vw, 6rem);
          }

          .card-title {
            font-size: clamp(1.8rem, 5vw, 2.5rem);
          }

          .spec-item,
          .location-block {
            max-width: 220px;
          }

          .languages-grid {
            max-width: 220px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPortfolio;
