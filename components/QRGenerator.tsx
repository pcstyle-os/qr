"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import {
    QrCode,
    Download,
    Copy,
    Check,
    Layers,
    Palette,
    Monitor,
    Zap,
    Shield,
    RefreshCw,
    ExternalLink,
    Smile
} from "lucide-react";
import { ColorPicker } from "./ColorPicker";

type QRStyle = "neon" | "matrix" | "minimal" | "glitch";

const styleConfig = {
    neon: {
        fg: "#ff00ff",
        bg: "#000000",
        label: "NEON_GLOW",
    },
    matrix: {
        fg: "#00ff00",
        bg: "#000000",
        label: "MATRIX_RAIN",
    },
    glitch: {
        fg: "#00ffff",
        bg: "#000000",
        label: "GLITCH_CORE",
    },
    minimal: {
        fg: "#ffffff",
        bg: "#000000",
        label: "MINIMAL_PURE",
    },
};

export default function QRGenerator() {
    const [url, setUrl] = useState("https://pcstyle.dev");
    const [qrStyle, setQrStyle] = useState<QRStyle>("neon");
    const [color, setColor] = useState("#ff00ff");
    const [emoji, setEmoji] = useState("");
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateQR = async () => {
        if (!canvasRef.current) return;

        try {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const size = 1024;
            canvas.width = size;
            canvas.height = size;

            // Draw background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, size, size);

            // Generate QR modules
            const qrData = QRCode.create(url, { errorCorrectionLevel: 'H' });
            const modules = qrData.modules;
            const moduleCount = modules.size;
            const moduleSize = size / moduleCount;

            // Apply style-specific logic
            if (qrStyle === "glitch") {
                // Red layer
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = "#ff0000";
                for (let row = 0; row < moduleCount; row++) {
                    for (let col = 0; col < moduleCount; col++) {
                        if (modules.get(row, col)) {
                            ctx.fillRect(col * moduleSize + 3, row * moduleSize, moduleSize - 2, moduleSize - 2);
                        }
                    }
                }
                // Cyan layer
                ctx.fillStyle = "#00ffff";
                for (let row = 0; row < moduleCount; row++) {
                    for (let col = 0; col < moduleCount; col++) {
                        if (modules.get(row, col)) {
                            ctx.fillRect(col * moduleSize - 3, row * moduleSize, moduleSize - 2, moduleSize - 2);
                        }
                    }
                }
                ctx.globalAlpha = 1;
            }

            ctx.fillStyle = color;

            if (qrStyle === "neon") {
                ctx.shadowBlur = 20;
                ctx.shadowColor = color;
            } else {
                ctx.shadowBlur = 0;
            }

            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (modules.get(row, col)) {
                        if (qrStyle === "matrix") {
                            ctx.globalAlpha = 0.4 + Math.random() * 0.6;
                        } else {
                            ctx.globalAlpha = 1;
                        }

                        ctx.fillRect(
                            col * moduleSize + 1,
                            row * moduleSize + 1,
                            moduleSize - 2,
                            moduleSize - 2
                        );
                    }
                }
            }

            // Draw Emoji in Center
            if (emoji) {
                const emojiSize = size * 0.2;
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;

                // Clear center area for emoji
                ctx.fillStyle = "#000000";
                const centerX = size / 2;
                const centerY = size / 2;

                // Drawing a rounded background for the emoji
                const bgSize = emojiSize * 1.2;
                ctx.beginPath();
                ctx.roundRect(centerX - bgSize / 2, centerY - bgSize / 2, bgSize, bgSize, 20);
                ctx.fill();

                // Draw border for emoji background
                ctx.strokeStyle = color;
                ctx.lineWidth = 4;
                ctx.stroke();

                ctx.font = `${emojiSize}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(emoji, centerX, centerY);
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            generateQR();
        }, 100);
        return () => clearTimeout(timer);
    }, [url, qrStyle, color, emoji]);

    const downloadQR = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = `pcstyle-qr-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    const copyImage = async () => {
        if (!canvasRef.current) return;
        try {
            canvasRef.current.toBlob(async (blob) => {
                if (blob) {
                    try {
                        const item = new ClipboardItem({ "image/png": blob });
                        await navigator.clipboard.write([item]);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                    } catch (e) {
                        // Fallback for browsers that don't support ClipboardItem
                        const reader = new FileReader();
                        reader.onload = async () => {
                            const dataUrl = reader.result as string;
                            await navigator.clipboard.writeText(dataUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        };
                        reader.readAsDataURL(blob);
                    }
                }
            });
        } catch (err) {
            console.error("Failed to copy image:", err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Controls Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="space-y-6 bg-black/40 p-8 border border-[#ff00ff]/20 rounded-xl backdrop-blur-md">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">
                                SYSTEM_INPUT_URL
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full p-4 bg-black/60 border border-[#ff00ff]/30 rounded-lg text-white font-mono text-sm placeholder-gray-700 outline-none focus:border-[#ff00ff] focus:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all"
                                    placeholder="https://..."
                                />
                                <QrCode className="absolute right-4 top-4 w-5 h-5 text-[#ff00ff]/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">
                                EMOJI_OVERLAY
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={emoji}
                                    onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
                                    className="w-full p-4 bg-black/60 border border-[#ff00ff]/30 rounded-lg text-white font-mono text-sm placeholder-gray-700 outline-none focus:border-[#ff00ff] focus:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all"
                                    placeholder="Add emoji... (e.g. 🚀)"
                                />
                                <Smile className="absolute right-4 top-4 w-5 h-5 text-[#ff00ff]/50" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold">
                                RENDER_PRESETS
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(Object.keys(styleConfig) as QRStyle[]).map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => {
                                            setQrStyle(style);
                                            setColor(styleConfig[style].fg);
                                        }}
                                        className={`p-3 border rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${qrStyle === style
                                            ? "border-[#ff00ff] bg-[#ff00ff]/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                            : "border-gray-800 text-gray-600 hover:border-gray-600 hover:text-gray-400"
                                            }`}
                                    >
                                        {styleConfig[style].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <ColorPicker
                                label="COLOR_PROTOCOL"
                                value={color}
                                onChange={setColor}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={downloadQR}
                            className="flex items-center justify-center gap-3 p-4 bg-[#ff00ff] text-black font-black uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_20px_#ff00ff] transition-all active:scale-95"
                        >
                            <Download className="w-5 h-5" />
                            EXPORT_PNG
                        </button>
                        <button
                            onClick={copyImage}
                            className={`flex items-center justify-center gap-3 p-4 border font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${copied ? "border-green-500 text-green-500" : "border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff]/10"
                                }`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? "COPIED" : "COPY_IMAGE"}
                        </button>
                    </div>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative group lg:sticky lg:top-24"
                >
                    <div className="absolute -inset-1 bg-[#ff00ff]/20 rounded-2xl blur-3xl group-hover:bg-[#ff00ff]/30 transition-all duration-500" />
                    <div className="relative bg-black/80 border border-[#ff00ff]/20 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] text-[#ff00ff] font-bold tracking-[0.4em] uppercase">SYSTEM_PREVIEW</span>
                            <div className="flex gap-2 text-gray-800">
                                <span className="text-[9px]">0xDEADBEEF</span>
                            </div>
                        </div>

                        <div className="aspect-square bg-black border border-[#ff00ff]/10 relative p-6 flex items-center justify-center group-hover:border-[#ff00ff]/40 transition-colors overflow-hidden">
                            <canvas
                                ref={canvasRef}
                                className="max-w-full max-h-full transition-transform duration-500 hover:scale-[1.02]"
                                style={{ imageRendering: "pixelated" }}
                            />

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff00ff]/40" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff00ff]/40" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ff00ff]/40" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff00ff]/40" />
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#ff00ff]/10 space-y-4">
                            <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                <span>STATUS:</span>
                                <span className="text-green-500 flex items-center gap-1">
                                    <Zap className="w-3 h-3 fill-current" />
                                    ENCRYPT_READY
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                                <div className="space-y-1">
                                    <p>SIGNAL: 1024-BIT</p>
                                    <p>LATENCY: 0.05MS</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p>STYLE: {qrStyle}</p>
                                    <p>PROTOCOL: QR-777</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
