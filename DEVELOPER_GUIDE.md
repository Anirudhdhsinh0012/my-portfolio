# Developer Guide

## 🎯 Understanding the Architecture

### Component Hierarchy
```
Menu.jsx (Main Component)
├── useState/useRef hooks for state management
├── GSAP animation logic
├── Event handlers (click, drag, mouseenter)
└── JSX Structure:
    ├── Menu Toggle Button
    └── Menu Overlay
        ├── Background Layer
        ├── Navigation Header
        ├── Footer
        └── Circular Menu Container
            ├── Menu Segments (dynamically generated)
            └── Joystick Controller
```

## 🔍 Code Deep Dive

### 1. Segment Generation (`createSegment`)

**Purpose**: Dynamically create circular menu segments using SVG path clipping

**Key Concepts**:
```javascript
// Calculate angles for each segment
const anglePerSegment = 360 / total;  // e.g., 60° for 6 items
const baseStartAngle = anglePerSegment * index;
const centerAngle = baseStartAngle + anglePerSegment / 2;

// Convert polar to cartesian coordinates
const x = center + radius * Math.cos((angle - 90) * Math.PI / 180);
const y = center + radius * Math.sin((angle - 90) * Math.PI / 180);

// Create SVG path for clip-path
segment.style.clipPath = `path('${pathData}')`;
```

**Math Breakdown**:
- `-90` offset: Starts from top (12 o'clock) instead of right (3 o'clock)
- `0.19` gap: Creates small spacing between segments
- Inner/Outer radius: Creates donut shape

### 2. Animation System (`toggleMenu`)

**Opening Animation Flow**:
```javascript
1. Fade in overlay (300ms)
   → opacity: 0 to 1
   
2. Scale up joystick (400ms, delay 200ms)
   → scale: 0 to 1, back.out easing
   
3. Flicker nav/footer (225ms, delay 300ms)
   → opacity: 0-1-0-1-0-1-1 (3 cycles)
   
4. Stagger segments (random order)
   → Each 75ms apart, flicker effect
```

**GSAP Easing Functions**:
- `power2.out`: Starts fast, ends slow (overlay fade)
- `back.out(1.7)`: Overshoots then settles (joystick pop)
- `power2.inOut`: Smooth acceleration/deceleration (flickers)

### 3. Joystick Drag System (`initCenterDrag`)

**Animation Loop** (requestAnimationFrame):
```javascript
const animate = () => {
  // Smooth interpolation (15% easing)
  currentX += (targetX - currentX) * 0.15;
  currentY += (targetY - currentY) * 0.15;
  
  // Apply transform
  gsap.set(joystick, { x: currentX, y: currentY });
  
  // Calculate angle for segment selection
  const angle = Math.atan2(currentY, currentX) * (180 / Math.PI);
  
  // Loop continues
  requestAnimationFrame(animate);
};
```

**Drag Physics**:
```javascript
// Calculate distance from center
const distance = Math.sqrt(deltaX² + deltaY²);

// Apply max drag limit (25% of joystick size)
const maxDrag = 100 * 0.25;  // 25px

if (distance > maxDrag) {
  const ratio = maxDrag / distance;
  targetX = deltaX * ratio;
  targetY = deltaY * ratio;
}
```

### 4. Segment Selection Logic

**Angle-Based Detection**:
```javascript
// Convert drag position to angle (0-360°)
const angle = Math.atan2(currentY, currentX) * (180 / Math.PI);

// Normalize to 0-360 range
const normalizedAngle = (angle + 90 + 360) % 360;

// Calculate which segment (0-5 for 6 items)
const segmentIndex = Math.floor(normalizedAngle / (360 / menuItems.length));
```

**Visual Feedback**:
```javascript
// Activate segment
segment.style.animation = "flickerHover 350ms ease-in-out forwards";
segment.querySelector(".segment-content").style.animation = 
  "contentFlickerHover 350ms ease-in-out forwards";
segment.style.zIndex = "10";  // Bring to front
```

## 🎨 Styling Architecture

### CSS Organization

**index.css Structure**:
1. **Fonts Import** (Google Fonts)
2. **Tailwind Directives** (@tailwind base, components, utilities)
3. **Global Resets** (*, body, p, a)
4. **Component Classes** (.menu-toggle-btn, .menu-overlay, etc.)
5. **Animation Keyframes** (@keyframes flickerHover, contentFlickerHover)

### Critical CSS Classes

```css
.menu-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);  /* 5% white */
  backdrop-filter: blur(20px);             /* Glassmorphism */
  cursor: pointer;
}
```

**Glassmorphism Effect**:
- Semi-transparent background (rgba with low alpha)
- Backdrop filter blur (20px default, 0px on hover)
- Creates depth and modern aesthetic

### Animation Keyframes Explained

**flickerHover** (Background Animation):
```css
0%   → rgba(255, 255, 255, 0.05) blur(20px)  /* Start */
12%  → rgba(255, 255, 255, 0.7)  blur(8px)   /* Flash 1 */
24%  → rgba(255, 255, 255, 0.15) blur(18px)  /* Dim 1 */
36%  → rgba(255, 255, 255, 0.85) blur(5px)   /* Flash 2 */
...
100% → rgba(255, 255, 255, 1)    blur(0px)   /* End: Solid */
```

**contentFlickerHover** (Text/Icon Animation):
- Alternates between white and dark (#333)
- Opacity flickers in sync with background
- Final state: black (#000), fully opaque

## 🧩 Responsive Configuration

### `getResponsiveConfig()` Function

```javascript
const getResponsiveConfig = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth < 1000;  // Breakpoint

  // Maximum 90% of smallest viewport dimension
  const maxSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.9);
  
  // Mobile cap at 480px, desktop at 700px
  const menuSize = isMobile ? Math.min(maxSize, 480) : 700;

  return {
    menuSize,
    center: menuSize / 2,
    innerRadius: menuSize * 0.08,   // 8%
    outerRadius: menuSize * 0.42,   // 42%
    contentRadius: menuSize * 0.28, // 28%
  };
};
```

**Proportional Scaling**:
- All dimensions are percentages of `menuSize`
- Maintains perfect circles at any size
- Content stays centered at 28% radius

## 🔊 Audio Integration

### Implementation Pattern

```javascript
try {
  new Audio("/menu-open.mp3").play();
} catch (e) {
  // Graceful degradation - no error shown to user
  // Browsers may block autoplay, this prevents crashes
}
```

**Best Practices**:
- Always wrap in try-catch
- Use relative paths from public folder
- Small file sizes for quick loading
- Optional enhancement (app works without audio)

## 📊 State Management Strategy

### Why useRef instead of useState?

**Performance Reasons**:
```javascript
// ❌ useState would cause re-render on every frame
const [currentX, setCurrentX] = useState(0);

// ✅ useRef updates without re-render (60fps smooth)
const currentXRef = useRef(0);
```

**State Types**:
- **useRef**: Animation values, DOM references, flags
- **useState**: Not used (no reactive UI updates needed)
- **useEffect**: One-time initialization only

### Refs Inventory

| Ref | Type | Purpose |
|-----|------|---------|
| `menuRef` | DOM | Menu container element |
| `joystickRef` | DOM | Joystick element |
| `menuOverlayRef` | DOM | Overlay container |
| `isOpenRef` | Boolean | Menu open state |
| `isMenuAnimatingRef` | Boolean | Animation lock |
| `isDraggingRef` | Boolean | Drag state |
| `currentXRef/YRef` | Number | Current joystick position |
| `targetXRef/YRef` | Number | Target joystick position |
| `activeSegmentRef` | DOM | Currently hovered segment |
| `animationFrameRef` | Number | RAF loop ID |

## 🎮 Event Handling

### Mouse Events

```javascript
// Drag start
joystick.addEventListener("mousedown", (e) => {
  isDraggingRef.current = true;
  
  // Add document listeners for drag/end
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDrag);
});

// Cleanup
const endDrag = () => {
  // Remove listeners to prevent memory leaks
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", endDrag);
};
```

**Why Document Listeners?**
- Captures events outside element bounds
- Prevents drag "losing" cursor
- Standard pattern for drag interactions

### Segment Hover Events

```javascript
segment.addEventListener("mouseenter", () => {
  if (isOpenRef.current) {
    try {
      new Audio("/menu-select.mp3").play();
    } catch (e) {}
  }
});
```

**Conditional Audio**:
- Only plays when menu is open
- Prevents sound spam on page load
- Enhances user feedback

## 🧪 Testing Checklist

### Manual Testing Steps

1. **Menu Toggle**
   - [ ] Click hamburger button
   - [ ] Menu opens with animation
   - [ ] Joystick appears smoothly
   - [ ] Audio plays (if enabled)

2. **Segment Interaction**
   - [ ] Hover over each segment
   - [ ] Selection sound plays
   - [ ] Flicker animation occurs
   - [ ] Segment becomes solid white

3. **Joystick Drag**
   - [ ] Click and drag joystick
   - [ ] Movement is smooth (60fps)
   - [ ] Segments highlight based on angle
   - [ ] Joystick returns to center on release

4. **Close Menu**
   - [ ] Click X button
   - [ ] Closing animation plays
   - [ ] Menu fully hides
   - [ ] Can reopen successfully

5. **Responsive Behavior**
   - [ ] Resize window below 1000px
   - [ ] Menu scales appropriately
   - [ ] All interactions still work
   - [ ] Text remains readable

## 🐛 Common Issues & Solutions

### Issue: Menu segments not appearing

**Diagnosis**:
```javascript
console.log(responsiveConfigRef.current);
// Check if menuSize is valid (not 0 or NaN)
```

**Solution**:
- Ensure window is fully loaded before initialization
- Check for CSS conflicts overriding dimensions

### Issue: Joystick not draggable

**Diagnosis**:
- Check if `initCenterDrag()` is called
- Verify joystickRef.current is not null

**Solution**:
```javascript
// Add safety check
if (!joystickRef.current) {
  console.error("Joystick ref not initialized");
  return;
}
```

### Issue: Animations stuttering

**Causes**:
- Too many simultaneous animations
- Browser performance throttling
- Inefficient re-renders

**Solutions**:
- Use `will-change: transform` CSS property
- Ensure refs (not state) for animation values
- Check browser console for warnings

## 🚀 Performance Optimization

### Current Optimizations

1. **RequestAnimationFrame Loop**
   ```javascript
   // Runs at 60fps, synced with browser refresh
   const animate = () => {
     // Update logic
     animationFrameRef.current = requestAnimationFrame(animate);
   };
   ```

2. **Transform-Only Animations**
   ```javascript
   // Hardware-accelerated (GPU)
   gsap.set(joystick, { x: currentX, y: currentY });
   
   // ❌ Avoid: left/top (triggers layout)
   ```

3. **Ref-Based State**
   - No re-renders during animation
   - Instant updates without React reconciliation

### Future Optimizations

- [ ] Memoize segment generation
- [ ] Lazy load audio files
- [ ] Virtual scrolling for many segments
- [ ] Web Worker for angle calculations

## 📚 Additional Resources

### GSAP Documentation
- [GSAP Docs](https://greensock.com/docs/)
- [Easing Visualizer](https://greensock.com/ease-visualizer/)

### SVG Path Resources
- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- [SVG Path Commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

### React Performance
- [useRef vs useState](https://react.dev/reference/react/useRef)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

**Happy Coding!** 🎉
