import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutPortfolio from '../components/AboutPortfolio';
import Services from '../components/Services';
import ProjectsTelescope from '../components/ProjectsTelescope';
import TechnicalSkills from '../components/TechnicalSkills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home({ isDark, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HeroSection isDark={isDark} setIsDark={setIsDark} />
      <AboutPortfolio isDark={isDark} />
      <Services isDark={isDark} />
      <ProjectsTelescope isDark={isDark} />
      <TechnicalSkills isDark={isDark} />
      
      <section id="experience" className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <h2 className="text-4xl font-bold">Experience</h2>
      </section>
      
      <Contact isDark={isDark} />
      <Footer isDark={isDark} />
    </>
  );
}

export default Home;
