# 🚀 How to Run Your Portfolio

## Prerequisites
Make sure you have Node.js installed on your system (v16 or higher)

## Step 1: Install Dependencies

Open your terminal/command prompt in the project root and run:

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React (for icons)
- Vite (build tool)

## Step 2: Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

## Step 3: Open in Browser

Click the link or open your browser and go to:
```
http://localhost:5173
```

## What You'll See

Your portfolio with:
✅ **Hero Section** - Animated 3D header with smooth scroll
✅ **About Me** - Portfolio overview section
✅ **Services** - Your service offerings
✅ **Featured Projects** - Telescope-style project carousel
✅ **Technical Skills** - Skills breakdown
✅ **Contact Section** ("Let's Connect")** - NEW with:
   - Warm gold/amber gradient background
   - Animated heading: "Ready to illuminate your brand?"
   - Contact information (email, phone, location)
   - "GET IN TOUCH" button
   - Animated decorative text at bottom
✅ **Footer** - Footer information

## Common Issues & Solutions

### Issue: Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Issue: "Cannot find module"
```bash
npm install
```

### Issue: Styles not showing (Tailwind not working)
```bash
npm run build
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Scripts Available

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Check code for errors
```

## Troubleshooting

If you encounter errors:

1. **Clear cache and reinstall:**
   ```bash
   rm -r node_modules
   npm install
   npm run dev
   ```

2. **Check Node version:**
   ```bash
   node --version
   ```
   Should be v16 or higher

3. **Check browser console (F12):**
   - Open DevTools (F12)
   - Go to Console tab
   - Share any error messages

## Need Help?

Contact information in the portfolio:
📧 Email: anirudhdhavegad01@gmail.com
📱 Phone: +91 9638118914
📍 Location: SURAT, INDIA
🔗 LinkedIn: https://www.linkedin.com/in/anirudhdha-vegad/
