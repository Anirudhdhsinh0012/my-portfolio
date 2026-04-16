# Balatro-TS-TW Installation & Integration Guide

## Installation

To install the Balatro-TS-TW component from React Bits, run the following command in your terminal:

```bash
npx shadcn@latest add @react-bits/Balatro-TS-TW
```

This will:
1. Download the Balatro-TS-TW component files
2. Add them to your `src/components/ui/` directory
3. Register the component in your project

## What's Included

The Balatro component provides a premium UI element with:
- Warm gold/amber color palette
- Smooth animations and transitions
- Responsive design
- Dark/light theme support
- TypeScript support

## Integration with Contact Section

The Contact section has been updated to match the Balatro design with:

### Design Features:
✅ **Dark warm gradient background** - Matching the Balatro aesthetic
✅ **Left-aligned heading** - "Ready to illuminate your brand?"
✅ **Yellow accent on key text** - "your brand?" highlighted in gold gradient
✅ **Contact information on right** - EMAIL, PHONE, LOCATION fields
✅ **Animated text elements** - Using DecryptedText for character reveal animations
✅ **Bottom decorative text** - "Let's create something extraordinary"
✅ **Interactive hover effects** - Contact fields animate on hover
✅ **Call-to-action button** - Yellow "GET IN TOUCH" button with arrow

### Color Scheme:
- **Primary Background**: Deep amber/orange gradient (amber-950 → orange-950 → yellow-900)
- **Accent Color**: Vibrant yellow-400 to amber-500 gradient
- **Text**: White on dark backgrounds, gray on light backgrounds
- **Labels**: Yellow-300 (dark mode), amber-600 (light mode)

## File Modified

- `src/components/Contact.jsx` - Updated with Balatro-inspired design

## Running the Application

```bash
npm run dev
```

The Contact section will display with the warm, elegant Balatro design theme.

## Customization

To customize colors, update the className values in Contact.jsx:
- Change `from-yellow-400 to-amber-500` for different accent gradients
- Modify `from-amber-950 via-orange-950 via-yellow-900 to-amber-950` for background colors
- Adjust animation speeds in DecryptedText components (speed prop)
