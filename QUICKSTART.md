# Quick Start Guide

Get up and running with the React Circular Menu in under 2 minutes!

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173/
```

## 🎯 First Steps

1. **See the Menu**: Click the white hamburger button at the bottom center
2. **Explore**: Hover over the 6 menu segments (Vision, Portfolio, People, etc.)
3. **Try Joystick**: Drag the center white circle to navigate
4. **Close**: Click the X button in the top-left

## 🔨 Common Tasks

### Change Menu Items
File: `src/components/Menu.jsx`
```javascript
const menuItems = [
  { label: "Your Item", icon: "icon-name", href: "/path" },
];
```

### Change Background
Replace: `public/menu.jpg` with your image

### Adjust Colors
Edit: `src/index.css` - search for color values

### Modify Animations
File: `src/components/Menu.jsx` - look for `gsap.to()` calls

## 🐛 Troubleshooting

**Menu not appearing?**
- Check browser console for errors
- Ensure all files in `public/` folder exist
- Try refreshing the page

**Audio not playing?**
- Browser may block autoplay - click menu again
- Check if .mp3 files exist in `public/`

**Joystick not dragging?**
- Ensure you're dragging from the center white circle
- Try clicking to open menu first

## 📚 Next Steps

- Read full [README.md](README.md) for detailed documentation
- Explore `src/components/Menu.jsx` to understand the code
- Check `src/index.css` for animation keyframes
- Customize menu items and colors to match your brand

## 🚀 Production Build

```bash
npm run build
npm run preview  # Test production build locally
```

Deploy the `dist/` folder to your hosting provider!

---

Need help? Check the main README or review the code comments.
