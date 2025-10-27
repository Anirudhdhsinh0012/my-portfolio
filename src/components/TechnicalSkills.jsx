import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Server, 
  Smartphone, 
  Brain, 
  Wrench, 
  Palette 
} from 'lucide-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TechnicalSkills = ({ isDark }) => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const categoriesRef = useRef([]);
  const [typedText, setTypedText] = useState('');
  const fullText = "Crafting Technology with Precision";

  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Bootstrap", level: 88 },
        { name: "HTML", level: 98 },
        { name: "CSS", level: 95 },
        { name: "JavaScript", level: 93 }
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Server,
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "PHP", level: 85 },
        { name: "JSP", level: 80 },
        { name: "MySQL", level: 90 },
        { name: "MongoDB", level: 87 }
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      skills: [
        { name: "Java", level: 88 },
        { name: "Android Studio", level: 90 },
        { name: "React Native", level: 85 }
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      skills: [
        { name: "Python", level: 92 },
        { name: "Scikit-learn", level: 85 },
        { name: "PyTorch", level: 80 },
        { name: "OpenCV", level: 87 },
        { name: "MediaPipe", level: 83 }
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Wrench,
      title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 93 },
        { name: "VS Code", level: 95 },
        { name: "Firebase", level: 88 },
        { name: "Appwrite", level: 85 },
        { name: "Razorpay API", level: 90 },
        { name: "REST APIs", level: 92 }
      ],
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: Palette,
      title: "Design & Branding",
      skills: [
        { name: "Figma", level: 90 },
        { name: "UI/UX", level: 88 },
        { name: "Responsive Design", level: 95 },
        { name: "Wireframing", level: 85 }
      ],
      gradient: "from-indigo-500 to-violet-500"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate skill categories with stagger
      categoriesRef.current.forEach((category, index) => {
        if (!category) return;

        gsap.fromTo(
          category,
          {
            opacity: 0,
            y: 80,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        );

        // Animate progress bars
        const progressBars = category.querySelectorAll('.skill-progress-bar');
        progressBars.forEach((bar, skillIndex) => {
          const targetWidth = bar.getAttribute('data-level');
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${targetWidth}%`,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none reverse"
              },
              delay: skillIndex * 0.1
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Typing Effect */}
        <div ref={headlineRef} className="text-center mb-20">
          <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Technical Skills
          </h2>
          <p className={`text-xl sm:text-2xl font-light tracking-wide min-h-[32px] ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span className="inline-block">{typedText}</span>
            <span className="inline-block w-0.5 h-6 bg-white animate-pulse ml-1" style={{ animation: 'blink 1s infinite' }} />
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                ref={(el) => (categoriesRef.current[categoryIndex] = el)}
                className={`group relative rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
                  isDark
                    ? 'bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 hover:border-white/20'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-black/10 hover:border-black/20 shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Subtle Glowing Background on Hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r ${category.gradient}`} />

                {/* Icon with Gradient */}
                <div className="mb-6 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.gradient} transform group-hover:scale-105 transition-all duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills List with Progress Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium transition-colors duration-200 ${
                          isDark ? 'text-gray-300 group-hover/skill:text-gray-100' : 'text-gray-700 group-hover/skill:text-gray-900'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-xs font-semibold transition-colors duration-200 ${
                          isDark ? 'text-gray-500 group-hover/skill:text-gray-400' : 'text-gray-500 group-hover/skill:text-gray-600'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      {/* Progress Bar Container */}
                      <div className={`relative h-2 rounded-full overflow-hidden transition-all duration-200 ${
                        isDark ? 'bg-zinc-800' : 'bg-gray-300'
                      }`}>
                        {/* Progress Bar Fill */}
                        <div
                          className={`skill-progress-bar absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${category.gradient} transition-all duration-200 group-hover/skill:brightness-110`}
                          data-level={skill.level}
                          style={{ width: '0%' }}
                        >
                          {/* Subtle Glowing Effect */}
                          <div className="absolute inset-0 bg-white/20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Corner Elements */}
                <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
                  <div className={`absolute top-4 right-4 w-full h-full border-t-2 border-r-2 rounded-tr-2xl ${
                    isDark ? 'border-white' : 'border-black'
                  }`} />
                </div>
                <div className={`absolute bottom-0 left-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity duration-500`}>
                  <div className={`absolute bottom-4 left-4 w-full h-full border-b-2 border-l-2 rounded-bl-2xl ${
                    isDark ? 'border-white' : 'border-black'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-20 text-center">
          <p className={`text-lg font-light tracking-widest ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>
            CONTINUOUSLY EVOLVING • ALWAYS INNOVATING
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Custom Scrollbar for skill cards */
        .group::-webkit-scrollbar {
          width: 4px;
        }

        .group::-webkit-scrollbar-track {
          background: ${isDark ? '#18181b' : '#f3f4f6'};
          border-radius: 10px;
        }

        .group::-webkit-scrollbar-thumb {
          background: ${isDark ? '#52525b' : '#9ca3af'};
          border-radius: 10px;
        }

        .group::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#71717a' : '#6b7280'};
        }
      `}</style>
    </section>
  );
};

export default TechnicalSkills;
