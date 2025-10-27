import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getFeaturedProjects } from '../data/projectsData';
import './ProjectsTelescope.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsTelescope = ({ isDark }) => {
  const spotlightRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const titlesRef = useRef(null);
  const spotlightHeaderRef = useRef(null);
  const introText1Ref = useRef(null);
  const introText2Ref = useRef(null);
  const bgImgRef = useRef(null);
  const bgImgInnerRef = useRef(null);
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const imageElementsRef = useRef([]);
  const titleElementsRef = useRef([]);

  const featuredProjects = getFeaturedProjects();

  // Configuration
  const config = {
    gap: 0.08,
    speed: 0.3,
    arcRadius: 500,
  };

  useEffect(() => {
    if (!spotlightRef.current) return;

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    }

    function getImgProgressState(index, overallProgress) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    // Set initial opacity for images
    imageElementsRef.current.forEach((img) => {
      if (img) gsap.set(img, { opacity: 0 });
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;

          const moveDistance = window.innerWidth * 0.6;
          if (introText1Ref.current) {
            gsap.set(introText1Ref.current, {
              x: -animationProgress * moveDistance,
              opacity: 1,
            });
          }
          if (introText2Ref.current) {
            gsap.set(introText2Ref.current, {
              x: animationProgress * moveDistance,
              opacity: 1,
            });
          }

          if (bgImgRef.current) {
            gsap.set(bgImgRef.current, {
              transform: `scale(${animationProgress})`,
            });
          }
          if (bgImgInnerRef.current) {
            gsap.set(bgImgInnerRef.current, {
              transform: `scale(${1.5 - animationProgress * 0.5})`,
            });
          }

          imageElementsRef.current.forEach((img) => {
            if (img) gsap.set(img, { opacity: 0 });
          });
          if (spotlightHeaderRef.current) {
            spotlightHeaderRef.current.style.opacity = '0';
          }
          if (titlesContainerRef.current) {
            gsap.set(titlesContainerRef.current, {
              '--before-opacity': '0',
              '--after-opacity': '0',
            });
          }
        } else if (progress > 0.2 && progress <= 0.25) {
          if (bgImgRef.current) {
            gsap.set(bgImgRef.current, { transform: 'scale(1)' });
          }
          if (bgImgInnerRef.current) {
            gsap.set(bgImgInnerRef.current, { transform: 'scale(1)' });
          }

          if (introText1Ref.current) {
            gsap.set(introText1Ref.current, { opacity: 0 });
          }
          if (introText2Ref.current) {
            gsap.set(introText2Ref.current, { opacity: 0 });
          }

          imageElementsRef.current.forEach((img) => {
            if (img) gsap.set(img, { opacity: 0 });
          });
          if (spotlightHeaderRef.current) {
            spotlightHeaderRef.current.style.opacity = '1';
          }
          if (titlesContainerRef.current) {
            gsap.set(titlesContainerRef.current, {
              '--before-opacity': '1',
              '--after-opacity': '1',
            });
          }
        } else if (progress > 0.25 && progress <= 0.95) {
          if (bgImgRef.current) {
            gsap.set(bgImgRef.current, { transform: 'scale(1)' });
          }
          if (bgImgInnerRef.current) {
            gsap.set(bgImgInnerRef.current, { transform: 'scale(1)' });
          }

          if (introText1Ref.current) {
            gsap.set(introText1Ref.current, { opacity: 0 });
          }
          if (introText2Ref.current) {
            gsap.set(introText2Ref.current, { opacity: 0 });
          }

          if (spotlightHeaderRef.current) {
            spotlightHeaderRef.current.style.opacity = '1';
          }
          if (titlesContainerRef.current) {
            gsap.set(titlesContainerRef.current, {
              '--before-opacity': '1',
              '--after-opacity': '1',
            });
          }

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesRef.current?.scrollHeight || 0;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          if (titlesRef.current) {
            gsap.set(titlesRef.current, {
              transform: `translateY(${currentY}px)`,
            });
          }

          imageElementsRef.current.forEach((img, index) => {
            if (!img) return;
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElementsRef.current.forEach((title, index) => {
            if (!title) return;
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            if (titleElementsRef.current[currentActiveIndex]) {
              titleElementsRef.current[currentActiveIndex].style.opacity = '0.25';
            }
            if (titleElementsRef.current[closestIndex]) {
              titleElementsRef.current[closestIndex].style.opacity = '1';
            }
            if (bgImgInnerRef.current && featuredProjects[closestIndex]) {
              bgImgInnerRef.current.src = featuredProjects[closestIndex].image;
            }
            setCurrentActiveIndex(closestIndex);
          }
        } else if (progress > 0.95) {
          if (spotlightHeaderRef.current) {
            spotlightHeaderRef.current.style.opacity = '0';
          }
          if (titlesContainerRef.current) {
            gsap.set(titlesContainerRef.current, {
              '--before-opacity': '0',
              '--after-opacity': '0',
            });
          }
        }
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, [featuredProjects.length, currentActiveIndex]);

  return (
    <div className={`projects-telescope-wrapper ${isDark ? 'dark' : 'light'}`}>
      {/* Intro Section */}
      <section className="telescope-intro">
        <h1>Featured Projects Showcase</h1>
      </section>

      {/* Main Spotlight Section */}
      <section className="telescope-spotlight" ref={spotlightRef}>
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text" ref={introText1Ref}>
            <p>Explore</p>
          </div>
          <div className="spotlight-intro-text" ref={introText2Ref}>
            <p>Discover</p>
          </div>
        </div>

        <div className="spotlight-bg-img" ref={bgImgRef}>
          <img
            ref={bgImgInnerRef}
            src={featuredProjects[0]?.image}
            alt="Background"
          />
        </div>

        <div className="spotlight-titles-container" ref={titlesContainerRef}>
          <div className="spotlight-titles" ref={titlesRef}>
            {featuredProjects.map((project, index) => (
              <h1
                key={project.id}
                ref={(el) => (titleElementsRef.current[index] = el)}
                style={{ opacity: index === 0 ? '1' : '0.25' }}
              >
                {project.title}
              </h1>
            ))}
          </div>
        </div>

        <div className="spotlight-images" ref={imagesContainerRef}>
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="spotlight-img"
              ref={(el) => (imageElementsRef.current[index] = el)}
            >
              <img src={project.image} alt={project.title} />
            </div>
          ))}
        </div>

        <div className="spotlight-header" ref={spotlightHeaderRef}>
          <p>Projects</p>
        </div>
      </section>

      {/* Outro Section */}
      <section className="telescope-outro">
        <h1>Crafting digital experiences.</h1>
      </section>
    </div>
  );
};

export default ProjectsTelescope;
