import { Moon, Sun, Github, Linkedin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Waves from './Waves';
import { useEffect } from 'react';

const HeroSection = ({ isDark, setIsDark }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load Spline Viewer script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.77/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Scroll to section on home page
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { label: "About Me", href: "#about" },
    { label: "My Services", href: "#services" },
    { label: "Featured Projects", href: "#projects" },
    { label: "Technical Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Let's Connect", href: "#contact" },
  ];

  return (
    <section className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} relative overflow-hidden transition-colors duration-500`}>
      {/* Waves Background */}
      <Waves
        lineColor={isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'}
        backgroundColor="transparent"
        waveSpeedX={0.0125}
        waveSpeedY={0.005}
        waveAmpX={32}
        waveAmpY={16}
        xGap={12}
        yGap={32}
        friction={0.925}
        tension={0.005}
        maxCursorMove={80}
      />

      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                ANIRUDHDHA
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:opacity-70 cursor-pointer ${
                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full ${
                isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
              } transition-all duration-300`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-medium text-center py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-gray-300' 
                    : 'bg-black/5 hover:bg-black/10 text-gray-700'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative min-h-screen flex items-center justify-start px-4 sm:px-6 lg:px-8">
        {/* 3D Spline Robot - Right Side */}
        <div className="robot-3d-container">
          <spline-viewer 
            url="https://prod.spline.design/Ggjoqod28HivYapv/scene.splinecode"
            className="robot-3d"
          ></spline-viewer>
          {/* Developer Text Below Robot */}
          <div className="robot-text-overlay">
            <h2 className={`text-6xl sm:text-7xl md:text-8xl font-bold tracking-wider ${
              isDark ? 'text-gray-900' : 'text-black'
            }`}>
              DEVELOPER
            </h2>
          </div>
        </div>

        {/* Main Content - Left Side */}
        <div className="relative z-10 w-full max-w-2xl hero-content-left">
          {/* Name - Two Tone Style */}
          <div className="mb-6 animate-slide-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <div className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vegad
              </div>
              <div className="text-blue-600">
                Anirudhdha
              </div>
            </h1>
          </div>

          {/* Title */}
          <div className="mb-5 animate-fade-in-delay">
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-normal ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Full-Stack Developer
            </h2>
          </div>

          {/* Description */}
          <div className="mb-10 animate-fade-in-slow">
            <p className={`text-base sm:text-lg font-normal max-w-xl ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              Building intelligent web applications with modern technologies
            </p>
          </div>

          {/* Buttons & Social Icons */}
          <div className="flex flex-wrap items-center gap-4 animate-fade-in-slower">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              View My Work
            </a>
            
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className={`px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 border-2 hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'border-white/30 hover:border-white/50 text-white hover:bg-white/5' 
                  : 'border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50'
              }`}
            >
              Learn More
            </a>
            
            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://github.com/Anirudhdhsinh0012"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/20' 
                    : 'bg-white hover:bg-gray-50 border border-gray-300 shadow-sm'
                }`}
                aria-label="GitHub Profile"
              >
                <Github className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </a>

              <a
                href="https://www.linkedin.com/in/anirudhdha-vegad/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/20' 
                    : 'bg-white hover:bg-gray-50 border border-gray-300 shadow-sm'
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark 
          ? 'bg-gradient-to-b from-transparent via-transparent to-black/50' 
          : 'bg-gradient-to-b from-transparent via-transparent to-gray-100/50'
      }`}></div>
      
    </section>
  );
};

export default HeroSection;
