'use client';

import { motion } from 'framer-motion';
import { QrCode, Zap, Terminal, Github } from 'lucide-react';
import { QRGenerator } from '@/components/QRGenerator';
import { MatrixBackground } from '@/components/ui/MatrixBackground';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Matrix Background */}
      <MatrixBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff00ff] to-[#ff00ff]/60 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-black" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-[#ff00ff]"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ filter: 'blur(8px)' }}
                  />
                </div>
                <div>
                  <h1 className="text-sm font-mono tracking-[0.5em] text-white">
                    QR<span className="text-[#ff00ff]">.PCSTYLE</span>
                  </h1>
                  <p className="text-[10px] font-mono tracking-wider text-white/40">
                    PROTOCOL QR-777-ALPHA
                  </p>
                </div>
              </motion.div>

              {/* Header Links */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <a
                  href="https://pcstyle.dev"
                  className="text-xs font-mono text-white/40 hover:text-[#ff00ff] transition-colors flex items-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  pcstyle.dev
                </a>
                <a
                  href="https://github.com/pcstyle"
                  className="text-xs font-mono text-white/40 hover:text-[#ff00ff] transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff00ff]/10 border border-[#ff00ff]/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-[#ff00ff]" />
                <span className="text-xs font-mono text-[#ff00ff] tracking-wider">
                  CYBERPUNK QR GENERATOR
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold mb-4 tracking-tight">
                <span className="gradient-text">Generate</span>{' '}
                <span className="text-white">Stylized</span>
                <br />
                <span className="text-white">QR Codes</span>
              </h2>

              <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto font-mono">
                Create unique QR codes with neon, matrix, glitch, and minimal styles.
                Perfect for the digital age.
              </p>
            </motion.div>

            {/* Generator Section */}
            <motion.div
              className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                boxShadow: '0 0 60px rgba(255, 0, 255, 0.1), inset 0 0 60px rgba(255, 0, 255, 0.02)',
              }}
            >
              <QRGenerator />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { title: 'Instant Generation', desc: 'Real-time preview as you type' },
                { title: 'Multiple Formats', desc: 'PNG, SVG, JPEG exports' },
                { title: '4 Style Presets', desc: 'Neon, Matrix, Glitch, Minimal' },
                { title: 'API Access', desc: 'Integrate with your projects' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#ff00ff]/30 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <h3 className="text-sm font-mono text-[#ff00ff] mb-1 tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-white/40 font-mono">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-mono text-white/30 tracking-wider">
                © 2026 PCSTYLE • QR-777-ALPHA
              </p>
              <div className="flex items-center gap-4">
                <a href="https://s.pcstyle.dev" className="text-xs font-mono text-white/30 hover:text-[#ff00ff] transition-colors">
                  s.pcstyle.dev
                </a>
                <a href="https://paste.pcstyle.dev" className="text-xs font-mono text-white/30 hover:text-[#ff00ff] transition-colors">
                  paste.pcstyle.dev
                </a>
                <a href="https://pcstyle.dev" className="text-xs font-mono text-white/30 hover:text-[#ff00ff] transition-colors">
                  pcstyle.dev
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
