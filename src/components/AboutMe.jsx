import { useEffect, useRef } from 'react';
import { Download, GraduationCap, MapPin, Languages } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutMe = ({ isDark }) => {
  const stackCardRefs = useRef([]);

  // Smooth step easing function
  const smoothStep = (p) => p * p * (3 - 2 * p);

  useEffect(() => {
    // Only run animations on desktop
    if (window.innerWidth <= 1000) return;

    const ctx = gsap.context(() => {
      // STACK AND FLIP ANIMATION - Like dealing cards
      ScrollTrigger.create({
        trigger: '.flip-cards-section',
        start: 'top bottom',
        end: `+=${window.innerHeight * 4}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          stackCardRefs.current.forEach((card, index) => {
            if (!card) return;
            
            let y = 0, scale = 1, opacity = 1, x = 0, rotate = 0, rotationY = 0, zIndex = index;
            
            // PHASE 1: Initial side-by-side position (0 - 0.2)
            if (progress < 0.2) {
              const phaseProgress = smoothStep(progress / 0.2);
              opacity = phaseProgress;
              scale = gsap.utils.interpolate(0.8, 1, phaseProgress);
            }
            
            // PHASE 2: Stack cards together (0.2 - 0.4)
            else if (progress < 0.4) {
              const phaseProgress = smoothStep((progress - 0.2) / 0.2);
              // Cards rotate and move to center to stack
              const startX = index === 0 ? -50 : index === 2 ? 50 : 0;
              x = gsap.utils.interpolate(startX, 0, phaseProgress);
              
              const startRotate = index === 0 ? -8 : index === 2 ? 8 : 0;
              rotate = gsap.utils.interpolate(startRotate, -3 + (index * 3), phaseProgress);
              
              // Stack with slight offset
              y = index * 10 * (1 - phaseProgress);
              zIndex = 2 - index; // Reverse z-index for stacking
              opacity = 1;
              scale = 1;
            }
            
            // PHASE 3: Cards stacked - prepare for flip (0.4 - 0.5)
            else if (progress < 0.5) {
              x = 0;
              rotate = -3 + (index * 3);
              y = 0;
              zIndex = 2 - index;
              opacity = 1;
              scale = 1;
            }
            
            // PHASE 4-6: Sequential flips (0.5 - 1.0)
            else {
              x = 0;
              y = 0;
              opacity = 1;
              scale = 1;
              
              // Each card gets its flip timing
              const flipStartProgress = 0.5 + (index * 0.15); // Card 0: 0.5, Card 1: 0.65, Card 2: 0.8
              const flipEndProgress = flipStartProgress + 0.15;
              
              if (progress >= flipStartProgress) {
                const flipProgress = gsap.utils.clamp(
                  0,
                  1,
                  (progress - flipStartProgress) / (flipEndProgress - flipStartProgress)
                );
                
                // During flip, card comes forward
                zIndex = 10 + index;
                rotate = gsap.utils.interpolate(-3 + (index * 3), 0, smoothStep(flipProgress));
                rotationY = gsap.utils.interpolate(0, 180, smoothStep(flipProgress));
                
                // Slight scale up during flip
                if (flipProgress < 0.5) {
                  scale = gsap.utils.interpolate(1, 1.05, smoothStep(flipProgress * 2));
                } else {
                  scale = gsap.utils.interpolate(1.05, 1, smoothStep((flipProgress - 0.5) * 2));
                }
              } else {
                // Not flipped yet - maintain stacked position
                rotate = -3 + (index * 3);
                zIndex = 2 - index;
              }
            }
            
            gsap.set(card, { opacity, y, x, rotate, scale, zIndex });
            
            const flipInner = card.querySelector('.flip-card-inner');
            if (flipInner) {
              gsap.set(flipInner, { rotationY });
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`about-me-wrapper ${isDark ? 'dark' : 'light'}`}>
      {/* INTRODUCTION SECTION */}
  <section className={`pt-16 pb-14 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              About Me
            </h2>
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I'm a <span className="font-semibold text-blue-600">Software Developer</span> specializing in Web, Mobile, and AI solutions — developing interactive websites, smooth mobile applications, and intelligent features to create scalable, secure, and user-focused products.
            </p>
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center">
            <a 
              href="/ANIRUDHDHA_CV.pdf" 
              download="Anirudhdha_Vegad_CV.pdf"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </section>

      {/* ANIMATED FLIP CARDS SECTION */}
      <section 
        className={`flip-cards-section relative ${isDark ? 'bg-black' : 'bg-white'}`}
        style={{ height: '500vh' }}
      >
  <div className="sticky top-0 min-h-[90vh] flex items-center justify-center overflow-hidden px-4 pb-10">
          <div className="flex flex-wrap justify-center items-center gap-6 max-w-7xl w-full">
            {/* CARD 1: Education */}
            <div
              ref={(el) => (stackCardRefs.current[0] = el)}
              className="stack-card"
              style={{ 
                opacity: 0,
              }}
            >
            <div 
              className="flip-card-inner w-[320px] md:w-[400px] h-[450px] group"
              style={{ 
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'none'
              }}
            >
              {/* FRONT */}
              <div 
                className={`card-face card-front absolute inset-0 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10' 
                    : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-black/10'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className={`absolute w-2 h-2 rounded-full animate-float-particle ${isDark ? 'bg-blue-400/30' : 'bg-blue-500/20'}`} style={{ top: '20%', left: '15%', animationDelay: '0s' }}></div>
                  <div className={`absolute w-1.5 h-1.5 rounded-full animate-float-particle ${isDark ? 'bg-purple-400/30' : 'bg-purple-500/20'}`} style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
                  <div className={`absolute w-2.5 h-2.5 rounded-full animate-float-particle ${isDark ? 'bg-blue-400/30' : 'bg-blue-500/20'}`} style={{ top: '80%', left: '20%', animationDelay: '2s' }}></div>
                </div>

                <div className={`w-20 h-20 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                  isDark ? 'bg-blue-500/20' : 'bg-blue-500/10'
                }`}>
                  <GraduationCap className="w-10 h-10 text-blue-500 animate-pulse-slow" />
                </div>
                <h3 className={`text-3xl font-bold relative z-10 transition-all duration-300 group-hover:scale-105 ${isDark ? 'text-white' : 'text-black'}`}>
                  Education
                </h3>
                <div className={`text-6xl font-bold relative z-10 transition-all duration-300 ${isDark ? 'text-white/10 group-hover:text-blue-500/30' : 'text-black/10 group-hover:text-blue-500/20'}`}>
                  01
                </div>
              </div>

              {/* BACK */}
              <div 
                className={`card-face card-back absolute inset-0 rounded-3xl shadow-2xl p-8 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white' 
                    : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-black'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 animate-gradient-shift"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 animate-slide-in-left">
                    <GraduationCap className="w-8 h-8 text-blue-500" />
                    <h3 className="text-2xl font-bold">Education</h3>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold animate-slide-in-left" style={{ animationDelay: '0.1s' }}>Bachelor of Computer Applications</h4>
                    <p className={`text-lg animate-slide-in-left ${isDark ? 'text-blue-100' : 'text-gray-700'}`} style={{ animationDelay: '0.2s' }}>
                      Uka Tarsadiya University
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
                      <span className={`flex items-center gap-2 ${isDark ? 'text-blue-200' : 'text-gray-600'}`}>
                        <MapPin className="w-4 h-4" />
                        India
                      </span>
                      <span className={isDark ? 'text-blue-200' : 'text-gray-600'}>
                        | 11/2021 – 05/2024
                      </span>
                    </div>
                    <div className={`mt-4 pt-4 border-t animate-slide-in-left ${isDark ? 'border-white/20' : 'border-black/20'}`} style={{ animationDelay: '0.4s' }}>
                      <p className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>CGPA: 7.79</p>
                      <p className={`text-sm ${isDark ? 'text-blue-100' : 'text-gray-600'}`}>
                        Focus Areas: Software Engineering, Data Management, Cloud Computing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Specialization */}
          <div
            ref={(el) => (stackCardRefs.current[1] = el)}
            className="stack-card"
            style={{ 
              opacity: 0,
            }}
          >
            <div 
              className="flip-card-inner w-[320px] md:w-[400px] h-[450px] group"
              style={{ 
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'none'
              }}
            >
              {/* FRONT */}
              <div 
                className={`card-face card-front absolute inset-0 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10' 
                    : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-black/10'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className={`absolute w-2 h-2 rounded-full animate-float-particle ${isDark ? 'bg-purple-400/30' : 'bg-purple-500/20'}`} style={{ top: '25%', left: '20%', animationDelay: '0.5s' }}></div>
                  <div className={`absolute w-1.5 h-1.5 rounded-full animate-float-particle ${isDark ? 'bg-pink-400/30' : 'bg-pink-500/20'}`} style={{ top: '65%', left: '75%', animationDelay: '1.5s' }}></div>
                  <div className={`absolute w-2.5 h-2.5 rounded-full animate-float-particle ${isDark ? 'bg-purple-400/30' : 'bg-purple-500/20'}`} style={{ top: '75%', left: '25%', animationDelay: '2.5s' }}></div>
                </div>

                <div className="text-6xl relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-pulse-slow">⚡</div>
                <h3 className={`text-3xl font-bold relative z-10 transition-all duration-300 group-hover:scale-105 ${isDark ? 'text-white' : 'text-black'}`}>
                  Specialization
                </h3>
                <div className={`text-6xl font-bold relative z-10 transition-all duration-300 ${isDark ? 'text-white/10 group-hover:text-purple-500/30' : 'text-black/10 group-hover:text-purple-500/20'}`}>
                  02
                </div>
              </div>

              {/* BACK */}
              <div 
                className={`card-face card-back absolute inset-0 rounded-3xl shadow-2xl p-8 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white' 
                    : 'bg-gradient-to-br from-purple-50 via-white to-purple-50 text-black'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 animate-gradient-shift"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 animate-slide-in-left">Specialization</h3>
                  <ul className="space-y-4">
                    <li className={`flex items-start gap-3 animate-slide-in-left ${isDark ? 'text-purple-100' : 'text-gray-700'}`} style={{ animationDelay: '0.1s' }}>
                      <span className="text-blue-500 text-xl mt-1">▸</span>
                      <span className="text-lg">Full-Stack Web Development</span>
                    </li>
                    <li className={`flex items-start gap-3 animate-slide-in-left ${isDark ? 'text-purple-100' : 'text-gray-700'}`} style={{ animationDelay: '0.2s' }}>
                      <span className="text-purple-500 text-xl mt-1">▸</span>
                      <span className="text-lg">AI & Machine Learning Applications</span>
                    </li>
                    <li className={`flex items-start gap-3 animate-slide-in-left ${isDark ? 'text-purple-100' : 'text-gray-700'}`} style={{ animationDelay: '0.3s' }}>
                      <span className="text-green-500 text-xl mt-1">▸</span>
                      <span className="text-lg">Cross-Platform Mobile Development</span>
                    </li>
                    <li className={`flex items-start gap-3 animate-slide-in-left ${isDark ? 'text-purple-100' : 'text-gray-700'}`} style={{ animationDelay: '0.4s' }}>
                      <span className="text-orange-500 text-xl mt-1">▸</span>
                      <span className="text-lg">Data Engineering & Optimization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Journey & Languages */}
          <div
            ref={(el) => (stackCardRefs.current[2] = el)}
            className="stack-card"
            style={{ 
              opacity: 0,
            }}
          >
            <div 
              className="flip-card-inner w-[320px] md:w-[400px] h-[450px] group"
              style={{ 
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'none'
              }}
            >
              {/* FRONT */}
              <div 
                className={`card-face card-front absolute inset-0 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border border-white/10' 
                    : 'bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-black/10'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className={`absolute w-2 h-2 rounded-full animate-float-particle ${isDark ? 'bg-green-400/30' : 'bg-green-500/20'}`} style={{ top: '30%', left: '25%', animationDelay: '0.3s' }}></div>
                  <div className={`absolute w-1.5 h-1.5 rounded-full animate-float-particle ${isDark ? 'bg-emerald-400/30' : 'bg-emerald-500/20'}`} style={{ top: '70%', left: '70%', animationDelay: '1.3s' }}></div>
                  <div className={`absolute w-2.5 h-2.5 rounded-full animate-float-particle ${isDark ? 'bg-green-400/30' : 'bg-green-500/20'}`} style={{ top: '85%', left: '30%', animationDelay: '2.3s' }}></div>
                </div>

                <div className={`w-20 h-20 rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                  isDark ? 'bg-green-500/20' : 'bg-green-500/10'
                }`}>
                  <MapPin className="w-10 h-10 text-green-500 animate-pulse-slow" />
                </div>
                <h3 className={`text-3xl font-bold relative z-10 transition-all duration-300 group-hover:scale-105 ${isDark ? 'text-white' : 'text-black'}`}>
                  Journey
                </h3>
                <div className={`text-6xl font-bold relative z-10 transition-all duration-300 ${isDark ? 'text-white/10 group-hover:text-green-500/30' : 'text-black/10 group-hover:text-green-500/20'}`}>
                  03
                </div>
              </div>

              {/* BACK */}
              <div 
                className={`card-face card-back absolute inset-0 rounded-3xl shadow-2xl p-8 overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white' 
                    : 'bg-gradient-to-br from-green-50 via-white to-green-50 text-black'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10 animate-gradient-shift"></div>
                
                <div className="relative z-10">
                  {/* Journey */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4 animate-slide-in-left">
                      <MapPin className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-bold">Journey</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                        <span className="text-2xl">🇮🇳</span>
                        <div>
                          <h4 className="font-semibold text-lg">India</h4>
                          <p className={`text-sm ${isDark ? 'text-green-100' : 'text-gray-600'}`}>
                            Completed BCA with honors
                          </p>
                          <p className={`text-sm ${isDark ? 'text-green-100' : 'text-gray-600'}`}>
                            Engaged in multiple AI-driven innovation projects
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Language Skills */}
                  <div className={`pt-4 border-t animate-slide-in-left ${isDark ? 'border-white/20' : 'border-black/20'}`} style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <Languages className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-bold">Language Skills</h3>
                    </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className={isDark ? 'text-green-100 font-medium' : 'text-gray-700 font-medium'}>Gujarati</span>
                      <div className={`text-xs ${isDark ? 'text-green-200' : 'text-gray-500'}`}>Mother Tongue</div>
                    </div>
                    <div>
                      <span className={isDark ? 'text-green-100 font-medium' : 'text-gray-700 font-medium'}>Hindi</span>
                      <div className={`text-xs ${isDark ? 'text-green-200' : 'text-gray-500'}`}>Fluent</div>
                    </div>
                    <div>
                      <span className={isDark ? 'text-green-100 font-medium' : 'text-gray-700 font-medium'}>English</span>
                      <div className={`text-xs ${isDark ? 'text-green-200' : 'text-gray-500'}`}>Fluent</div>
                    </div>
                    <div>
                      <span className={isDark ? 'text-green-100 font-medium' : 'text-gray-700 font-medium'}>German</span>
                      <div className={`text-xs ${isDark ? 'text-green-200' : 'text-gray-500'}`}>Professional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
