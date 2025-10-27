import { Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import DecryptedText from './DecryptedText';

const Contact = ({ isDark }) => {
  const contactInfo = {
    email: 'anirudhdhavegad01@gmail.com',
    location: 'SURAT, INDIA',
    phone: '+91 9638118914',
    linkedin: 'LinkedIn',
    linkedinUrl: 'https://www.linkedin.com/in/anirudhdha-vegad/',
    name: 'ANIRUDHDHA VEGAD',
    profileImage: '/profile-image.jpg', // Update with your actual image path
  };

  // Use the same navigation links from the header
  const navigationLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT ME', href: '#about' },
    { label: 'MY SERVICES', href: '#services' },
    { label: 'FEATURED PROJECTS', href: '#projects' },
    { label: 'TECHNICAL SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#experience' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // If href is #home, scroll to top
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen relative transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Email Me Button */}
      <div className="w-full py-12 flex justify-center items-center border-b border-gray-800">
        <a
          href={`mailto:${contactInfo.email}`}
          className={`text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-opacity ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          <DecryptedText
            text="CLICK HERE TO EMAIL ME"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className={isDark ? 'text-white' : 'text-black'}
            encryptedClassName="opacity-50"
          />
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column - Navigation Links */}
          <div className="flex flex-col space-y-6 text-right lg:text-right">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-lg font-medium uppercase tracking-wide transition-opacity cursor-pointer ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <DecryptedText
                  text={link.label}
                  speed={40}
                  maxIterations={12}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </a>
            ))}
          </div>

          {/* Center Column - Profile Image */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-700">
              <img
                src={contactInfo.profileImage}
                alt={contactInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="flex flex-col space-y-6 text-left">
            <a
              href={`mailto:${contactInfo.email}`}
              className={`flex items-center space-x-3 group transition-opacity ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="text-lg font-medium">
                <DecryptedText
                  text={contactInfo.email}
                  speed={30}
                  maxIterations={10}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </span>
            </a>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">
                <DecryptedText
                  text={contactInfo.location}
                  speed={30}
                  maxIterations={10}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </span>
            </div>

            <a
              href={`tel:${contactInfo.phone}`}
              className={`flex items-center space-x-3 group transition-opacity ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-medium">
                <DecryptedText
                  text={contactInfo.phone}
                  speed={30}
                  maxIterations={10}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </span>
            </a>

            <a
              href={contactInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 group transition-opacity text-pink-500"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-lg font-medium">
                <DecryptedText
                  text={contactInfo.linkedin}
                  speed={30}
                  maxIterations={10}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className="text-pink-500"
                  encryptedClassName="opacity-60"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
