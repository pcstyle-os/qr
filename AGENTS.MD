# QR.PCSTYLE - Developer Agent Guide

## Project Overview
A cyberpunk QR code generator with stylized visual themes (Neon, Matrix, Glitch, Minimal).

## Technical Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| QR Generation | @lglab/react-qr-code (client), qrcode (server API) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Runtime | Bun |
| Deployment | Vercel |

## Visual Style
- **Theme**: Cyberpunk / Neon / Matrix
- **Primary Color**: Magenta (#ff00ff)
- **Secondary**: Cyan (#00ffff)
- **Background**: Pure Black (#000000)
- **Effects**: CRT scanlines, glow effects, matrix rain background

## Project Structure
```
qr/
├── app/
│   ├── api/generate/route.ts   # QR generation API
│   ├── page.tsx                 # Main page (client component)
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles with CSS vars
├── components/
│   ├── QRGenerator.tsx          # Main generator UI
│   ├── QRPreview.tsx            # Live QR preview with effects
│   ├── StyleSelector.tsx        # Style preset picker
│   ├── ColorPicker.tsx          # Color customization
│   └── ui/
│       ├── CRTOverlay.tsx       # CRT effect overlay
│       └── MatrixBackground.tsx # Matrix rain animation
└── lib/
    └── styles.ts                # Style presets definitions
```

## API Endpoints

### GET /api/generate
Generate a QR code with customization options.

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| url | string | required | URL to encode |
| size | number | 512 | Output size in pixels (64-4096) |
| style | string | neon | Style preset |
| fg | string | ff00ff | Foreground color (hex without #) |
| bg | string | 000000 | Background color (hex without #) |
| format | string | png | Output format (png/svg/jpeg) |

Example:
```
/api/generate?url=https://pcstyle.dev&style=neon&size=1024&fg=ff00ff
```

## Style Presets
1. **Neon**: Glowing magenta modules with bloom effect
2. **Matrix**: Green digital rain aesthetic
3. **Glitch**: Chromatic aberration with scanlines
4. **Minimal**: Clean black & white, high contrast

## Development Commands
```bash
bun dev      # Start development server
bun build    # Production build
bun start    # Start production server
bun lint     # Run linting
```

## Deployment
Deployed on Vercel at `qr.pcstyle.dev`

---
*Protocol: QR-777-ALPHA*
