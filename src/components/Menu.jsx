import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Menu = ({ isDark, isMenuOpen, setIsMenuOpen }) => {
  const [showPreview, setShowPreview] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const joystickRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const previewTimeoutRef = useRef(null);
  
  const isOpenRef = useRef(false);
  const isMenuAnimatingRef = useRef(false);
  const responsiveConfigRef = useRef({});
  const isDraggingRef = useRef(false);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const activeSegmentRef = useRef(null);
  const animationFrameRef = useRef(null);

  const menuItems = [
    { label: "About", icon: "person-sharp", href: "/about", type: "route" },
    { label: "Skills", icon: "code-sharp", href: "#skills", type: "scroll" },
    { label: "Projects", icon: "layers-sharp", href: "#projects", type: "scroll" },
    { label: "Experience", icon: "briefcase-sharp", href: "#experience", type: "scroll" },
    { label: "Services", icon: "rocket-sharp", href: "#services", type: "scroll" },
    { label: "Contact", icon: "mail-sharp", href: "#contact", type: "scroll" },
  ];

  const getResponsiveConfig = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < 1000;

    const maxSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.9);
    const menuSize = isMobile ? Math.min(maxSize, 480) : 700;

    return {
      menuSize,
      center: menuSize / 2,
      innerRadius: menuSize * 0.08,
      outerRadius: menuSize * 0.42,
      contentRadius: menuSize * 0.28,
    };
  };

  const createSegment = (item, index, total) => {
    const segment = document.createElement("a");
    segment.className = "menu-segment";
    segment.href = item.href;

    const { menuSize, center, innerRadius, outerRadius, contentRadius } =
      responsiveConfigRef.current;

    const anglePerSegment = 360 / total;
    const baseStartAngle = anglePerSegment * index;
    const centerAngle = baseStartAngle + anglePerSegment / 2;
    const startAngle = baseStartAngle + 0.19;
    const endAngle = baseStartAngle + anglePerSegment - 0.19;

    const innerStartX =
      center + innerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const innerStartY =
      center + innerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const outerStartX =
      center + outerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180);
    const outerStartY =
      center + outerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180);
    const innerEndX =
      center + innerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const innerEndY =
      center + innerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);
    const outerEndX =
      center + outerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180);
    const outerEndY =
      center + outerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${innerStartX} ${innerStartY}`,
      `L ${outerStartX} ${outerStartY}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
      `L ${innerEndX} ${innerEndY}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
      "Z",
    ].join(" ");

    segment.style.clipPath = `path('${pathData}')`;
    segment.style.width = `${menuSize}px`;
    segment.style.height = `${menuSize}px`;

    const contentX =
      center + contentRadius * Math.cos(((centerAngle - 90) * Math.PI) / 180);
    const contentY =
      center + contentRadius * Math.sin(((centerAngle - 90) * Math.PI) / 180);

    segment.innerHTML = `
      <div class="segment-content" 
        style="left: ${contentX}px; top: ${contentY}px; transform: translate(-50%, -50%);">
        <ion-icon name="${item.icon}"></ion-icon>
        <div class="label">${item.label}</div>
      </div>
    `;

    segment.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
      setTimeout(() => {
        if (item.type === 'route') {
          // Navigate to a different page
          navigate(item.href);
        } else {
          // Scroll to section on current page
          if (location.pathname !== '/') {
            // If not on home page, navigate to home first
            navigate('/');
            setTimeout(() => {
              document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          } else {
            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 600);
    });

    return segment;
  };

  const toggleMenu = () => {
    if (isMenuAnimatingRef.current) return;

    const menuOverlay = menuOverlayRef.current;
    const menuSegments = menuRef.current?.querySelectorAll(".menu-segment");
    const joystick = joystickRef.current;

    if (!menuSegments || menuSegments.length === 0) return;

    isMenuAnimatingRef.current = true;
    setShowPreview(false);

    if (!isOpenRef.current) {
      isOpenRef.current = true;
      setIsMenuOpen(true);
      
      try {
        new Audio("/menu-open.mp3").play().catch(() => {});
      } catch (e) {}

      gsap.to(menuOverlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onStart: () => (menuOverlay.style.pointerEvents = "all"),
      });

      gsap.to(joystick, {
        scale: 1,
        duration: 0.4,
        delay: 0.2,
        ease: "back.out(1.7)",
      });

      [...Array(menuSegments.length).keys()]
        .sort(() => Math.random() - 0.5)
        .forEach((originalIndex, shuffledPosition) => {
          const segment = menuSegments[originalIndex];
          gsap.set(segment, { opacity: 0 });
          gsap.to(segment, {
            opacity: 1,
            duration: 0.075,
            delay: shuffledPosition * 0.075,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(segment, { opacity: 1 });
              if (originalIndex === menuSegments.length - 1) {
                isMenuAnimatingRef.current = false;
              }
            },
          });
        });
    } else {
      isOpenRef.current = false;
      setIsMenuOpen(false);
      
      try {
        new Audio("/menu-close.mp3").play().catch(() => {});
      } catch (e) {}

      gsap.to(joystick, {
        scale: 0,
        duration: 0.3,
        delay: 0.2,
        ease: "back.in(1.7)",
      });

      [...Array(menuSegments.length).keys()]
        .sort(() => Math.random() - 0.5)
        .forEach((originalIndex, shuffledPosition) => {
          const segment = menuSegments[originalIndex];
          gsap.to(segment, {
            opacity: 0,
            duration: 0.05,
            delay: shuffledPosition * 0.05,
            repeat: 2,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => gsap.set(segment, { opacity: 0 }),
          });
        });

      gsap.to(menuOverlay, {
        opacity: 0,
        duration: 0.3,
        delay: 0.6,
        ease: "power2.out",
        onComplete: () => {
          menuOverlay.style.pointerEvents = "none";
          isMenuAnimatingRef.current = false;
        },
      });
    }
  };

  const initCenterDrag = () => {
    const joystick = joystickRef.current;
    if (!joystick) return;

    const animate = () => {
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.15;
      currentYRef.current += (targetYRef.current - currentYRef.current) * 0.15;

      gsap.set(joystick, {
        x: currentXRef.current,
        y: currentYRef.current,
      });

      if (
        isDraggingRef.current &&
        Math.sqrt(
          currentXRef.current * currentXRef.current +
            currentYRef.current * currentYRef.current
        ) > 20
      ) {
        const angle =
          Math.atan2(currentYRef.current, currentXRef.current) *
          (180 / Math.PI);
        const segmentIndex =
          Math.floor(((angle + 90 + 360) % 360) / (360 / menuItems.length)) %
          menuItems.length;
        const segment =
          menuRef.current.querySelectorAll(".menu-segment")[segmentIndex];

        if (segment !== activeSegmentRef.current) {
          if (activeSegmentRef.current) {
            activeSegmentRef.current.style.animation = "";
            activeSegmentRef.current.querySelector(
              ".segment-content"
            ).style.animation = "";
            activeSegmentRef.current.style.zIndex = "";
          }
          activeSegmentRef.current = segment;
          segment.style.animation = "flickerHover 350ms ease-in-out forwards";
          segment.querySelector(".segment-content").style.animation =
            "contentFlickerHover 350ms ease-in-out forwards";
          segment.style.zIndex = "10";
          if (isOpenRef.current) {
            try {
              new Audio("/menu-select.mp3").play().catch(() => {});
            } catch (e) {}
          }
        }
      } else {
        if (activeSegmentRef.current) {
          activeSegmentRef.current.style.animation = "";
          activeSegmentRef.current.querySelector(
            ".segment-content"
          ).style.animation = "";
          activeSegmentRef.current.style.zIndex = "";
          activeSegmentRef.current = null;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      const rect = joystick.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const drag = (e) => {
        if (!isDraggingRef.current) return;
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDrag = 100 * 0.25;

        if (distance <= 20) {
          targetXRef.current = targetYRef.current = 0;
        } else if (distance > maxDrag) {
          const ratio = maxDrag / distance;
          targetXRef.current = deltaX * ratio;
          targetYRef.current = deltaY * ratio;
        } else {
          targetXRef.current = deltaX;
          targetYRef.current = deltaY;
        }
        e.preventDefault();
      };

      const endDrag = () => {
        isDraggingRef.current = false;
        targetXRef.current = targetYRef.current = 0;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("touchend", endDrag);
      };

      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", drag);
      document.addEventListener("touchend", endDrag);
      e.preventDefault();
    };

    joystick.addEventListener("mousedown", handleMouseDown);
    joystick.addEventListener("touchstart", handleMouseDown);
    animate();
  };

  // Brief preview animation on mount
  useEffect(() => {
    if (!menuRef.current || !joystickRef.current) return;
    
    responsiveConfigRef.current = getResponsiveConfig();

    const menu = menuRef.current;
    const joystick = joystickRef.current;
    const menuOverlay = menuOverlayRef.current;

    menu.style.width = `${responsiveConfigRef.current.menuSize}px`;
    menu.style.height = `${responsiveConfigRef.current.menuSize}px`;

    gsap.set(joystick, { scale: 0 });
    gsap.set(menuOverlay, { opacity: 0, pointerEvents: 'none' });

    // Clear previous segments
    menu.innerHTML = '';

    menuItems.forEach((item, index) => {
      const segment = createSegment(item, index, menuItems.length);
      segment.addEventListener("mouseenter", () => {
        if (isOpenRef.current) {
          try {
            new Audio("/menu-select.mp3").play().catch(() => {});
          } catch (e) {}
        }
      });
      menu.appendChild(segment);
    });

    // Add joystick HTML
    joystick.innerHTML = `
      <ion-icon name="grid-sharp" class="center-icon center-main"></ion-icon>
      <ion-icon name="chevron-up-sharp" class="center-icon center-up"></ion-icon>
      <ion-icon name="chevron-down-sharp" class="center-icon center-down"></ion-icon>
      <ion-icon name="chevron-back-sharp" class="center-icon center-left"></ion-icon>
      <ion-icon name="chevron-forward-sharp" class="center-icon center-right"></ion-icon>
    `;

    initCenterDrag();

    // PREVIEW ANIMATION - Show briefly then hide
    previewTimeoutRef.current = setTimeout(() => {
      // Show preview for 2.5 seconds
      gsap.to(menuOverlay, {
        opacity: 0.3,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(joystick, {
        scale: 0.4,
        duration: 0.4,
        ease: "back.out(1.7)",
      });

      const segments = menu.querySelectorAll(".menu-segment");
      gsap.to(segments, {
        opacity: 0.6,
        duration: 0.5,
        stagger: 0.05,
      });

      // Hide after 2.5 seconds
      setTimeout(() => {
        gsap.to(menuOverlay, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(joystick, {
          scale: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        });

        gsap.to(segments, {
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
        });

        setShowPreview(false);
      }, 2500);
    }, 500);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Ionicons Script */}
      <script
        type="module"
        src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/ionicons/ionicons.esm.js"
      ></script>

      {/* Menu Toggle Button */}
      <div 
        className={`menu-toggle-btn ${isDark ? 'menu-toggle-dark' : 'menu-toggle-light'}`} 
        onClick={toggleMenu}
      >
        <div className="hamburger-bar"></div>
        <div className="hamburger-bar"></div>
      </div>

      {/* Menu Overlay */}
      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-bg"></div>

        {/* Close Button */}
        <div className="menu-overlay-nav">
          <div className="close-btn" onClick={toggleMenu}>
            <div className="close-btn-bar"></div>
            <div className="close-btn-bar"></div>
          </div>
        </div>

        {/* Circular Menu */}
        <div className="circular-menu" ref={menuRef}>
          <div className="joystick" ref={joystickRef}></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
