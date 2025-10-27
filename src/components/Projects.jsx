import ChromaGrid from './ChromaGrid';
import { getAllProjects } from '../data/projectsData';

const Projects = ({ isDark }) => {
  const allProjects = getAllProjects();

  // Transform project data to ChromaGrid format
  const gridItems = allProjects.map(project => ({
    image: project.image,
    title: project.title,
    subtitle: project.subtitle,
    handle: project.handle,
    location: project.location,
    borderColor: project.borderColor,
    gradient: isDark ? project.gradient : `linear-gradient(145deg, ${project.borderColor}, #ffffff)`,
    url: project.url,
    description: project.description,
    techStack: project.techStack
  }));

  return (
    <section 
      id="projects" 
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Featured Projects
          </h2>
          <p className={`text-lg sm:text-xl ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore my diverse portfolio of web applications, mobile apps, and management systems
          </p>
        </div>

        {/* ChromaGrid Component - 3 Columns */}
        <ChromaGrid 
          items={gridItems}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          isDark={isDark}
        />
      </div>
    </section>
  );
};

export default Projects;
