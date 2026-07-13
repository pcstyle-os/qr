"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "framer-motion";
import {
    QrCode,
    Download,
    Copy,
    Check,
    Smile
} from "lucide-react";
import { ColorPicker } from "./ColorPicker";

type QRStyle = "neon" | "matrix" | "minimal" | "glitch";

const styleConfig = {
    neon: {
        fg: "#ff00ff",
        bg: "#000000",
        label: "neon glow",
    },
    matrix: {
        fg: "#00ff00",
        bg: "#000000",
        label: "matrix rain",
    },
    glitch: {
        fg: "#00ffff",
        bg: "#000000",
        label: "glitch core",
    },
    minimal: {
        fg: "#ffffff",
        bg: "#000000",
        label: "minimal pure",
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
        <div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 items-start">

                {/* Controls Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div className="space-y-6 rounded-lg border border-hairline p-6 md:p-8">
                        <div className="space-y-2">
                            <label className="text-xs text-muted">
                                destination url
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full rounded-md border border-hairline bg-background p-4 pr-12 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent-dim"
                                    placeholder="https://..."
                                />
                                <QrCode className="absolute right-4 top-4 h-5 w-5 text-faint" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-muted">
                                emoji overlay
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={emoji}
                                    onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
                                    className="w-full rounded-md border border-hairline bg-background p-4 pr-12 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent-dim"
                                    placeholder="add emoji..."
                                />
                                <Smile className="absolute right-4 top-4 h-5 w-5 text-faint" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs text-muted">
                                render preset
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {(Object.keys(styleConfig) as QRStyle[]).map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => {
                                            setQrStyle(style);
                                            setColor(styleConfig[style].fg);
                                        }}
                                        className={`rounded-md border p-3 text-xs transition-colors ${qrStyle === style
                                            ? "border-accent-dim bg-accent-dim/10 text-accent"
                                            : "border-hairline text-muted hover:border-faint hover:text-foreground"
                                            }`}
                                    >
                                        {styleConfig[style].label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <ColorPicker
                                label="color"
                                value={color}
                                onChange={setColor}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={downloadQR}
                            className="flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-accent-dim to-accent p-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            <Download className="w-5 h-5" />
                            download png
                        </button>
                        <button
                            onClick={copyImage}
                            className={`flex items-center justify-center gap-2 rounded-md border p-4 text-sm font-semibold transition-colors ${copied ? "border-accent text-accent" : "border-hairline text-muted hover:border-faint hover:text-foreground"
                                }`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? "copied" : "copy image"}
                        </button>
                    </div>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:sticky lg:top-8"
                >
                    <div className="rounded-lg border border-hairline p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs text-muted">preview</span>
                            <span className="rounded border border-accent-dim/60 px-2.5 py-0.5 text-xs text-accent">1024px</span>
                        </div>

                        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md border border-hairline bg-black p-6">
                            <canvas
                                ref={canvasRef}
                                className="max-h-full max-w-full"
                                style={{ imageRendering: "pixelated" }}
                            />

                        </div>

                        <div className="mt-6 flex justify-between border-t border-hairline pt-5 text-xs text-faint">
                            <span>ready to scan</span><span>style: {qrStyle}</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
