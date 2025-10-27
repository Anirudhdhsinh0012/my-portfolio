const Footer = ({ isDark }) => {
  const currentYear = new Date().getFullYear();
  const footerText = {
    studio: 'ANIRUDHDHA VEGAD',
    copyright: `© ${currentYear} ALL RIGHTS RESERVED`,
  };

  return (
    <footer
      className={`w-full py-8 border-t transition-colors duration-500 ${
        isDark
          ? 'bg-black text-white border-gray-800'
          : 'bg-white text-gray-900 border-gray-200'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <p
            className={`text-sm md:text-base font-medium tracking-wider ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {footerText.studio}
          </p>
          <p
            className={`text-xs md:text-sm font-mono ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}
          >
            {footerText.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
