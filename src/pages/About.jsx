import { useState } from 'react';
import AboutMe from '../components/AboutMe';


function About({ isDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Circular Menu */}
      <Menu isDark={isDark} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <AboutMe isDark={isDark} />
    </div>
  );
}

export default About;
