'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const presetColors = [
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#00ff00', // Green
    '#ff6600', // Orange
    '#ffff00', // Yellow
    '#ff0066', // Pink
    '#6600ff', // Purple
    '#750834', // Deep Red/Purple
    '#ffffff', // White
];

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
    const [showPicker, setShowPicker] = useState(false);

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let hex = e.target.value;
        if (!hex.startsWith('#')) {
            hex = '#' + hex;
        }
        if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
            onChange(hex);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-[#ff00ff]/60 font-mono">
                {label}
            </label>

            <div className="flex items-center gap-3">
                {/* Color preview button */}
                <motion.button
                    onClick={() => setShowPicker(!showPicker)}
                    className="relative w-10 h-10 rounded-lg border border-white/20 overflow-hidden"
                    style={{ backgroundColor: value }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            boxShadow: `inset 0 0 10px ${value}`,
                        }}
                    />
                </motion.button>

                {/* Hex input */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={handleHexInput}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 
                     text-sm font-mono uppercase tracking-wider
                     focus:outline-none focus:border-[#ff00ff]/50 focus:ring-1 focus:ring-[#ff00ff]/20
                     placeholder-white/30"
                        placeholder="#FF00FF"
                        maxLength={7}
                    />
                </div>

                {/* Native color picker */}
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                />
            </div>

            {/* Preset colors */}
            {showPicker && (
                <motion.div
                    className="flex flex-wrap gap-2 p-3 bg-black/80 border border-white/10 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    {presetColors.map((color) => (
                        <motion.button
                            key={color}
                            onClick={() => {
                                onChange(color);
                                setShowPicker(false);
                            }}
                            className={`w-8 h-8 rounded-md border-2 transition-all
                ${value === color ? 'border-white scale-110' : 'border-transparent hover:border-white/50'}
              `}
                            style={{
                                backgroundColor: color,
                                boxShadow: `0 0 10px ${color}40`,
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
