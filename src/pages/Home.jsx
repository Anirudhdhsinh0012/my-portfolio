import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Menu from '../components/Menu';

function Home({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <HeroSection isDark={isDark} setIsDark={setIsDark} />
      
      {/* About Me Section */}
      <AboutMe isDark={isDark} />
      
      {/* Circular Menu */}
      <Menu isDark={isDark} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {/* Placeholder sections */}
      <section id="services" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">My Services</h2>
      </section>
      
      <section id="projects" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">Featured Projects</h2>
      </section>
      
      <section id="skills" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">Technical Skills</h2>
      </section>
      
      <section id="experience" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">Experience</h2>
      </section>
      
      <section id="contact" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">Let's Connect</h2>
      </section>
    </>
  );
}

export default Home;
