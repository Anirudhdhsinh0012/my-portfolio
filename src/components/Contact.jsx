import { Mail, MapPin, Phone, Linkedin, ArrowRight } from 'lucide-react';
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

  return (
    <section
      id="contact"
      className={`min-h-screen relative transition-colors duration-500 overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-br from-amber-950 via-orange-950 via-yellow-900 to-amber-950 text-white' 
          : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-900'
      }`}
      style={{
        backgroundImage: isDark ? 'linear-gradient(135deg, rgba(120,53,15,0.8) 0%, rgba(154,78,16,0.6) 25%, rgba(180,83,9,0.7) 50%, rgba(120,53,15,0.8) 100%)' : undefined
      }}
    >
      {/* Main Content - 2 Column Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Column - Heading & CTA */}
          <div className="flex flex-col space-y-8">
            <div>
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <DecryptedText
                  text="Ready to illuminate"
                  speed={40}
                  maxIterations={12}
                  animateOn="both"
                  sequential={true}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </h2>
              <h3 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight mt-4">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  <DecryptedText
                    text="your brand?"
                    speed={40}
                    maxIterations={12}
                    animateOn="both"
                    sequential={true}
                    revealDirection="start"
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
                    encryptedClassName="opacity-60"
                  />
                </span>
              </h3>
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 hover:scale-105 active:scale-95 w-fit"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Right Column - Contact Information */}
          <div className="flex flex-col space-y-10">
            <div>
              <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                isDark ? 'text-yellow-300' : 'text-amber-600'
              }`}>
                EMAIL
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className={`text-lg md:text-xl font-semibold transition-all duration-300 hover:text-yellow-400 block ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <DecryptedText
                  text={contactInfo.email}
                  speed={40}
                  maxIterations={12}
                  animateOn="hover"
                  sequential={false}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </a>
            </div>

            <div>
              <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                isDark ? 'text-yellow-300' : 'text-amber-600'
              }`}>
                PHONE
              </div>
              <a
                href={`tel:${contactInfo.phone}`}
                className={`text-lg md:text-xl font-semibold transition-all duration-300 hover:text-yellow-400 block ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                <DecryptedText
                  text={contactInfo.phone}
                  speed={40}
                  maxIterations={12}
                  animateOn="hover"
                  sequential={false}
                  revealDirection="start"
                  className={isDark ? 'text-white' : 'text-gray-900'}
                  encryptedClassName="opacity-60"
                />
              </a>
            </div>

            <div>
              <div className={`text-sm font-bold uppercase tracking-widest mb-3 ${
                isDark ? 'text-yellow-300' : 'text-amber-600'
              }`}>
                LOCATION
              </div>
              <div className={`text-lg md:text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {contactInfo.location}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-2 border-2 border-yellow-400 text-yellow-400 font-bold uppercase tracking-wide transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Animated Text Decoration */}
      <div className={`w-full py-8 border-t border-yellow-400 border-opacity-30 flex justify-center items-center ${
        isDark ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-20'
      }`}>
        <div className={`text-center text-sm md:text-base uppercase tracking-widest font-medium ${
          isDark ? 'text-yellow-300 opacity-70' : 'text-amber-700 opacity-70'
        }`}>
          <DecryptedText
            text="Let's create something extraordinary"
            speed={30}
            maxIterations={10}
            animateOn="both"
            sequential={true}
            revealDirection="start"
            className={isDark ? 'text-yellow-300 opacity-70' : 'text-amber-700 opacity-70'}
            encryptedClassName="opacity-40"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
