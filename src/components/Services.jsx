import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Globe, 
  ShoppingCart, 
  Smartphone, 
  Brain, 
  Settings, 
  Palette 
} from 'lucide-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Services = ({ isDark }) => {
  const containerRef = useRef(null);
  
  // Service cards data
  const services = [
    {
      index: '01',
      icon: Globe,
      title: "Web Development",
      description: "I create responsive, performance-optimized websites using modern technologies like PHP, JSP, and MySQL, delivering elegant designs with robust functionality. From business portfolios to advanced platforms like Contest Management Systems and Order Management Solutions, I ensure every website is fast, secure, and visually engaging.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
    },
    {
      index: '02',
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description: "With projects like Overlooking Clothing and Ice Cream Order Management, I develop complete e-commerce ecosystems that include product catalogs, shopping carts, secure payments (Razorpay), and automated invoice generation for seamless business operations.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop"
    },
    {
      index: '03',
      icon: Smartphone,
      title: "Mobile Development",
      description: "I design and build Android applications focused on functionality and user experience. From smart tracking in Daily Expense Tracker to engaging apps like Plantify, Food On Track, and Quiz, my mobile solutions are efficient, intuitive, and data-driven.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    },
    {
      index: '04',
      icon: Brain,
      title: "AI Integration",
      description: "Integrating AI features and intelligent systems for automation and insights — from smart notifications and analytics in apps to personalized user experiences and automated workflows in web projects.",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
    },
    {
      index: '05',
      icon: Settings,
      title: "Custom Systems",
      description: "I build tailor-made platforms for specific business needs — like PickUp Laundry with Captcha, payment integration, and PDF invoice generation — ensuring reliable performance, security, and scalability.",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      index: '06',
      icon: Palette,
      title: "UI/UX Design",
      description: "Crafting visually appealing, user-centric interfaces for both web and mobile, ensuring each design is intuitive, modern, and aligned with brand identity.",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sticky-card');

      cards.forEach((card, index) => {
        // Don't pin the last card
        if (index === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.1;
            const rotation = (index % 2 === 0 ? -1 : 1) * progress * 5;
            
            gsap.to(card, {
              scale: scale,
              rotation: rotation,
              duration: 0,
            });

            // Update dark overlay
            card.style.setProperty('--after-opacity', progress);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro Section */}
      <section 
        className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-5xl">💼</span>
            <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              My Services
            </h2>
          </div>
          <p className={`text-xl sm:text-2xl leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            I offer end-to-end web and mobile development solutions tailored to modern business needs. 
            My services combine creativity, technology, and functionality to deliver scalable, user-friendly, 
            and result-driven digital experiences.
          </p>
        </div>
      </section>

      {/* Sticky Cards Section */}
      <section 
        id="services"
        ref={containerRef}
        className={`transition-colors duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`}
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className="sticky-card"
              style={{
                '--after-opacity': 0,
              }}
            >
              <div className="sticky-card-content">
                {/* Header Row */}
                <div className="sticky-card-header">
                  <div 
                    className="sticky-card-icon"
                    style={{ background: service.gradient }}
                  >
                    <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="sticky-card-title">{service.title}</h3>
                  <span className="sticky-card-index">{service.index}</span>
                </div>

                {/* Image Area */}
                <div className="sticky-card-image-wrapper">
                  <div 
                    className="sticky-card-image"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </div>

                {/* Description */}
                <div className="sticky-card-description">
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Outro Section */}
      <section 
        className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
          isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Work Together?
          </h2>
          <p className={`text-xl sm:text-2xl leading-relaxed mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Let's bring your ideas to life with cutting-edge technology and creative solutions.
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)'
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .sticky-card {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          margin-bottom: 2rem;
        }

        .sticky-card:last-child {
          margin-bottom: 0;
        }

        .sticky-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: ${isDark ? '#000' : '#fff'};
          opacity: var(--after-opacity);
          pointer-events: none;
          z-index: 1;
        }

        .sticky-card-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 80vh;
          background: ${isDark ? '#1a1a1a' : '#f5f5f5'};
          border-radius: 1.5rem;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: ${isDark 
            ? '0 20px 60px rgba(0, 0, 0, 0.8)' 
            : '0 20px 60px rgba(0, 0, 0, 0.15)'};
        }

        .sticky-card-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .sticky-card-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sticky-card-title {
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 700;
          color: ${isDark ? '#edf1e8' : '#1a1a1a'};
          flex: 1;
          font-family: 'Manrope', sans-serif;
        }

        .sticky-card-index {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          color: ${isDark ? 'rgba(237, 241, 232, 0.15)' : 'rgba(26, 26, 26, 0.15)'};
          font-family: 'Manrope', sans-serif;
        }

        .sticky-card-image-wrapper {
          flex: 1;
          min-height: 0;
        }

        .sticky-card-image {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          overflow: hidden;
        }

        .sticky-card-description {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .sticky-card-description p {
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          line-height: 1.7;
          color: ${isDark ? 'rgba(237, 241, 232, 0.7)' : 'rgba(26, 26, 26, 0.7)'};
          font-family: 'Manrope', sans-serif;
        }

        @media (max-width: 1000px) {
          .sticky-card-content {
            padding: 2rem;
            gap: 1.5rem;
          }

          .sticky-card-header {
            gap: 1rem;
          }

          .sticky-card-icon {
            width: 3rem;
            height: 3rem;
          }

          .sticky-card-description {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .sticky-card {
            padding: 0.5rem;
          }

          .sticky-card-content {
            padding: 1.5rem;
            gap: 1rem;
            height: 85vh;
          }

          .sticky-card-header {
            flex-wrap: wrap;
          }

          .sticky-card-icon {
            width: 2.5rem;
            height: 2.5rem;
          }

          .sticky-card-title {
            width: 100%;
            order: 3;
          }
        }
      `}</style>
    </>
  );
};

export default Services;
