'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Download, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { type QRStyle, type DownloadFormat, stylePresets, sizeOptions, formatOptions } from '@/lib/styles';
import { StyleSelector } from './StyleSelector';
import { ColorPicker } from './ColorPicker';
import { QRPreview, QRPreviewHandle } from './QRPreview';

export function QRGenerator() {
    const [url, setUrl] = useState('https://pcstyle.dev');
    const [style, setStyle] = useState<QRStyle>('neon');
    const [fgColor, setFgColor] = useState('#ff00ff');
    const [bgColor, setBgColor] = useState('#000000');
    const [size, setSize] = useState(256);
    const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>('png');
    const [downloadSize, setDownloadSize] = useState(512);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const qrRef = useRef<QRPreviewHandle>(null);

    // Update colors when style changes
    const handleStyleChange = (newStyle: QRStyle) => {
        setStyle(newStyle);
        const preset = stylePresets[newStyle];
        setFgColor(preset.fgColor);
        setBgColor(preset.bgColor);
    };

    const handleDownload = () => {
        setIsGenerating(true);
        setTimeout(() => {
            if (qrRef.current) {
                qrRef.current.download(downloadFormat, downloadSize);
            }
            setIsGenerating(false);
        }, 300);
    };

    const generateApiUrl = () => {
        const params = new URLSearchParams({
            url,
            style,
            fg: fgColor.replace('#', ''),
            bg: bgColor.replace('#', ''),
            size: downloadSize.toString(),
            format: downloadFormat,
        });
        return `https://qr.pcstyle.dev/api/generate?${params.toString()}`;
    };

    const copyApiUrl = async () => {
        await navigator.clipboard.writeText(generateApiUrl());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Controls */}
            <div className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.3em] text-[#ff00ff]/60 font-mono">
                        Target URL
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff00ff]/60">
                            <Link className="w-5 h-5" />
                        </div>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://pcstyle.dev"
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-11 pr-4 py-3
                       text-sm font-mono tracking-wide
                       focus:outline-none focus:border-[#ff00ff]/50 focus:ring-2 focus:ring-[#ff00ff]/20
                       placeholder-white/30 transition-all"
                        />
                        <motion.div
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            initial={{ scale: 0 }}
                            animate={{ scale: url.length > 0 ? 1 : 0 }}
                        >
                            <Sparkles className="w-4 h-4 text-[#ff00ff]" />
                        </motion.div>
                    </div>
                </div>

                {/* Style Selector */}
                <StyleSelector selected={style} onSelect={handleStyleChange} />

                {/* Color Pickers */}
                <div className="grid grid-cols-2 gap-4">
                    <ColorPicker label="Foreground" value={fgColor} onChange={setFgColor} />
                    <ColorPicker label="Background" value={bgColor} onChange={setBgColor} />
                </div>

                {/* Preview Size */}
                <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-[0.3em] text-[#ff00ff]/60 font-mono">
                        Preview Size
                    </label>
                    <div className="flex gap-2">
                        {[128, 192, 256].map((s) => (
                            <motion.button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`flex-1 py-2 px-3 rounded-lg border text-sm font-mono transition-all
                  ${size === s
                                        ? 'border-[#ff00ff] bg-[#ff00ff]/10 text-[#ff00ff]'
                                        : 'border-white/10 bg-white/5 text-white/60 hover:border-[#ff00ff]/50'
                                    }
                `}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {s}px
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Download Options */}
                <div className="p-4 bg-black/30 border border-white/10 rounded-xl space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 font-mono flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Options
                    </h3>

                    {/* Download Size */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-mono">
                            Export Size
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {sizeOptions.map((opt) => (
                                <motion.button
                                    key={opt.value}
                                    onClick={() => setDownloadSize(opt.value)}
                                    className={`py-1.5 px-3 rounded-md border text-xs font-mono transition-all
                    ${downloadSize === opt.value
                                            ? 'border-[#ff00ff] bg-[#ff00ff]/10 text-[#ff00ff]'
                                            : 'border-white/10 bg-white/5 text-white/50 hover:border-[#ff00ff]/50'
                                        }
                  `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {opt.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Format Selection */}
                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase tracking-wider text-white/40 font-mono">
                            Format
                        </label>
                        <div className="flex gap-2">
                            {formatOptions.map((opt) => (
                                <motion.button
                                    key={opt.value}
                                    onClick={() => setDownloadFormat(opt.value)}
                                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-mono uppercase tracking-wider transition-all
                    ${downloadFormat === opt.value
                                            ? 'border-[#ff00ff] bg-[#ff00ff]/10 text-[#ff00ff]'
                                            : 'border-white/10 bg-white/5 text-white/50 hover:border-[#ff00ff]/50'
                                        }
                  `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {opt.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Download Button */}
                    <motion.button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className="w-full py-3 px-6 bg-gradient-to-r from-[#ff00ff] to-[#ff00ff]/80 
                     text-black font-mono uppercase tracking-[0.2em] text-sm font-bold
                     rounded-lg transition-all hover:shadow-[0_0_30px_rgba(255,0,255,0.5)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    GENERATING...
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="download"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    DOWNLOAD {downloadFormat.toUpperCase()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* API URL */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs uppercase tracking-[0.3em] text-[#ff00ff]/60 font-mono flex items-center gap-2">
                            <Terminal className="w-4 h-4" />
                            API Endpoint
                        </label>
                        <motion.button
                            onClick={copyApiUrl}
                            className="text-xs text-white/40 hover:text-[#ff00ff] transition-colors flex items-center gap-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3 h-3" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </>
                            )}
                        </motion.button>
                    </div>
                    <div className="p-3 bg-black/50 border border-white/10 rounded-lg overflow-x-auto">
                        <code className="text-xs font-mono text-[#00ffff]/80 whitespace-nowrap">
                            {generateApiUrl()}
                        </code>
                    </div>
                </div>
            </div>

            {/* Right Column - Preview */}
            <div className="flex flex-col items-center justify-center">
                <QRPreview
                    ref={qrRef}
                    url={url}
                    style={style}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    size={size}
                />
            </div>
        </div>
    );
}
