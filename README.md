<<<<<<< HEAD
# React Portfolio - Anirudhdha Vegad

A stunning, interactive portfolio website featuring a circular menu, professional hero section with 3D robot, and smooth scrolling sections. Built with React, GSAP animations, React Router, and Tailwind CSS. This project features smooth animations, joystick navigation, and a modern black & white theme.

## 🚀 Features

### Hero Section with 3D Robot
- **3D Spline Robot**: Interactive 3D robot model on the right side
- **Professional Introduction**: Name display with "DEVELOPER" text overlay
- **Dynamic Navigation**: Top navbar with smooth scroll and routing
- **Call-to-Action Buttons**: Prominent CTAs with hover effects
- **Social Links**: GitHub and LinkedIn integration
- **Theme Toggle**: Switch between dark and light modes
- **Responsive Design**: Fully adaptive from mobile to desktop
- **Wave Animation**: Interactive background wave effect

### About Me Section
- **Personal Information**: Detailed about section after hero
- **Card Layout**: Clean presentation of information
- **Smooth Scrolling**: Seamless navigation between sections

### Interactive Circular Menu
- **6-Segment Radial Menu**: Smooth animations with mathematical precision
- **Joystick Navigation**: Drag-to-select functionality with visual feedback
- **GSAP Animations**: Professional flicker effects and smooth transitions
- **Sound Effects**: Audio feedback for menu interactions
- **Smart Routing**: Navigates to About page or scrolls to sections
- **Fully Responsive**: Adapts to mobile and desktop viewports

### React Router Integration
- **Page Navigation**: Separate About page with routing
- **Smooth Transitions**: Seamless navigation between pages
- **Smart Scroll**: Automatically returns to home when accessing sections

## 🛠️ Technologies

- **React 18.3.1** - UI library
- **React Router DOM** - Client-side routing
- **Vite 5.4.1** - Build tool and dev server
- **GSAP 3.12.5** - Animation library
- **Lenis** - Smooth scrolling
- **Tailwind CSS 3.4.11** - CSS framework
- **Lucide React** - Modern icon system
- **Ionicons 7.1.0** - Additional icon library
- **Spline Viewer** - 3D model integration
- **Three.js & React Three Fiber** - 3D graphics

## 📦 Installation

1. Navigate to the project directory:
```bash
cd REACT_PORTFOLIO
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the local URL shown in terminal

## 🎮 Usage

### Navigation
1. **Top Navbar**: Click navigation links to scroll to sections
2. **Circular Menu**: Click hamburger button (bottom right) to open
3. **About Page**: Click "About Me" in menu to visit dedicated About page
4. **Theme Toggle**: Click sun/moon icon to switch themes

### Menu Interaction
1. **Open Menu**: Click the hamburger button
2. **Navigate**: 
   - Click menu segments directly
   - Drag the central joystick to select items
3. **Close Menu**: Automatically closes after selection

## 📁 Project Structure

```
REACT_PORTFOLIO/
├── public/
│   ├── menu.jpg           # Background image for menu
│   ├── menu-open.mp3      # Menu open sound
│   ├── menu-close.mp3     # Menu close sound
│   └── menu-select.mp3    # Menu selection sound
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx    # Hero section with 3D robot
│   │   ├── AboutMe.jsx        # About Me component
│   │   ├── AboutMeCards.jsx   # About Me cards
│   │   ├── Menu.jsx           # Circular menu component
│   │   ├── Waves.jsx          # Wave animation
│   │   └── Orb.jsx            # Orb effect
│   ├── pages/
│   │   ├── Home.jsx           # Home page with all sections
│   │   └── About.jsx          # Dedicated About page
│   ├── App.jsx                # Root component with router
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles + animations
├── Documentation Files        # Detailed guides and docs
└── Configuration Files        # Vite, Tailwind, etc.
```

## 🎨 Customization

### Menu Items
Edit the `menuItems` array in `src/components/Menu.jsx`:

```javascript
const menuItems = [
  { label: "About", icon: "person-sharp", href: "/about", type: "route" },
  { label: "Skills", icon: "code-sharp", href: "#skills", type: "scroll" },
  // Add more items...
];
```

### Colors & Theme
Toggle between dark and light themes or modify styles in `src/index.css`.

### 3D Robot
Change the Spline URL in `HeroSection.jsx` to use a different 3D model.

## 📱 Responsive Behavior

- **Desktop**: Full experience with large 3D robot and 700px menu
- **Tablet**: Optimized layout with adjusted sizes
- **Mobile**: Compact view with touch-friendly navigation

## 🔧 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🌟 Key Features

### Smooth Scrolling
Lenis library provides butter-smooth scrolling throughout the site.

### Theme Support
Complete dark/light theme system with smooth transitions.

### 3D Integration
Spline 3D viewer seamlessly integrated for interactive robot model.

### Smart Navigation
React Router handles page routing while maintaining smooth scroll behavior.

## 📄 License

This project is created as a portfolio demonstration.

## 👨‍💻 Developer

**Anirudhdha Vegad**
- GitHub: [@Anirudhdhsinh0012](https://github.com/Anirudhdhsinh0012)
- LinkedIn: [Anirudhdha Vegad](https://www.linkedin.com/in/anirudhdha-vegad/)

---

**Built with ❤️ using React + Tailwind CSS**
=======
# my-portfolio
This is my personal portfolio built with React and Vite. It features a 3D hero section, smooth interactive UI components (orb, waves, menu), and a responsive About Me section to present my skills and projects. The project uses Tailwind for styling and is optimized for fast builds and modern browsers.
>>>>>>> e9cc527 (Initial commit)
