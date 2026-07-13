# Project Identity: qr (qr.pcstyle.dev)

This project follows the **pcstyle** high-performance stack and aesthetic.

## 🛠 Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Library**: qrcode (JS QR generator)
- **Styling**: Tailwind CSS v4
- **Runtime**: Bun
- **Visuals**: Canvas API for custom cyberpunk presets
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 🎨 Design System: pcstyle.dev
Matches the home site (pcstyle.dev): quiet, narrow single-column mono layout.
- **Colors**: background #0a0a0b, text #e8e6e3, muted #8a8781, faint #55524d, hairline #26262a, accent #e04fb0, accent-dim #8c1862
- **Typography**: JetBrains Mono everywhere, lowercase copy, no letter-spacing tricks
- **Motifs**: `~/pcstyle` wordmark, `→` eyebrow prompts, `##` section labels with hairline rules, pink-bordered tag pills, numbered steps (01/02/03), magenta→pink gradient CTA
- **No**: CRT overlays, matrix backgrounds, custom cursors, neon glow, uppercase tracking

## 📁 File Structure
```
qr/
├── app/
│   ├── globals.css          # Cyberpunk styles
│   ├── layout.tsx           # UI Wrappers (Matrix, CRT, Cursor)
│   └── page.tsx             # Main Landing UI
├── components/
│   ├── ui/
│   │   ├── CRTOverlay.tsx
│   │   ├── MatrixBackground.tsx
│   │   └── NeuralCursor.tsx
│   └── QRGenerator.tsx      # Main Logic & Canvas Renderer
└── AGENTS.MD                # System Intel
```

## 🚀 Commands
```bash
bun install     # Initialize Subsystems
bun dev         # Start Active Sync
bun build       # Final Compile
```

## 📊 Features
- Multi-style QR Rendering (Neon, Matrix, Glitch, Minimal)
- Real-time Link Encoding
- High-Speed Canvas Export (PNG)
- Clipboard Image Sync
- Color Customization
- Level-H Error Correction
