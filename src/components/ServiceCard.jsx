import React from 'react';

/**
 * ServiceCard Component
 * 
 * A reusable, accessible service card with:
 * - Smooth hover animations
 * - Icon display
 * - Feature list
 * - Full theme support
 * - Keyboard navigation
 * - ARIA attributes
 * 
 * @param {Object} props
 * @param {Object} props.service - Service data: { id, title, description, icon, features[] }
 * @param {number} props.index - Card index for animation timing
 * @param {boolean} props.isSticky - Whether this card is sticky
 */
const ServiceCard = ({ service, index = 0, isSticky = false }) => {
  const { title, description, icon, features = [] } = service;

  return (
    <article
      className={`service-card group relative h-full
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-2xl overflow-hidden
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        dark:focus-within:ring-offset-gray-900
        ${isSticky ? 'md:shadow-2xl md:border-blue-500 dark:md:border-blue-400' : ''}
      `}
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${index}`}
    >
      {/* Gradient Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 
        dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
        {/* Icon Container */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 
            bg-gradient-to-br from-blue-500 to-purple-600 
            dark:from-blue-400 dark:to-purple-500
            rounded-2xl flex items-center justify-center
            shadow-lg group-hover:shadow-xl
            transform group-hover:scale-110 group-hover:rotate-3
            transition-all duration-500"
            aria-hidden="true"
          >
            {icon ? (
              <span className="text-3xl sm:text-4xl" role="img" aria-label={title}>
                {icon}
              </span>
            ) : (
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </div>

          {/* Sticky Badge */}
          {isSticky && (
            <span className="hidden lg:inline-flex px-3 py-1 text-xs font-semibold 
              bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 
              rounded-full border border-blue-300 dark:border-blue-700"
              aria-label="Featured service"
            >
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          id={`service-title-${index}`}
          className="text-2xl sm:text-3xl font-bold mb-4 
            text-gray-900 dark:text-white
            group-hover:text-blue-600 dark:group-hover:text-blue-400
            transition-colors duration-300"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 
          leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="mt-auto">
            <h4 className="text-sm font-semibold uppercase tracking-wide 
              text-gray-700 dark:text-gray-300 mb-3">
              Key Features
            </h4>
            <ul className="space-y-2" role="list">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm sm:text-base 
                    text-gray-600 dark:text-gray-400"
                >
                  <svg
                    className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hover Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 
          bg-gradient-to-r from-blue-500 to-purple-600 
          dark:from-blue-400 dark:to-purple-500
          transform scale-x-0 group-hover:scale-x-100 
          transition-transform duration-500 origin-left"
          aria-hidden="true"
        />
      </div>

      {/* Shimmer Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-1000 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent 
          via-white/10 to-transparent transform -translate-x-full 
          group-hover:translate-x-full transition-transform duration-1000"
        />
      </div>
    </article>
  );
};

export default ServiceCard;
