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
            <label className="block text-xs text-muted">
                {label}
            </label>

            <div className="flex items-center gap-3">
                {/* Color preview button */}
                <motion.button
                    onClick={() => setShowPicker(!showPicker)}
                    className="relative h-10 w-10 overflow-hidden rounded-md border border-hairline"
                    style={{ backgroundColor: value }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                </motion.button>

                {/* Hex input */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={handleHexInput}
                        className="w-full rounded-md border border-hairline bg-background px-3 py-2 text-sm outline-none placeholder:text-faint focus:border-accent-dim"
                        placeholder="#e04fb0"
                        maxLength={7}
                    />
                </div>

                {/* Native color picker */}
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-md border border-hairline bg-transparent"
                />
            </div>

            {/* Preset colors */}
            {showPicker && (
                <motion.div
                    className="flex flex-wrap gap-2 rounded-md border border-hairline bg-background p-3"
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
                            className={`h-8 w-8 rounded-md border-2 transition-colors
                ${value === color ? 'border-accent' : 'border-transparent hover:border-faint'}
              `}
                            style={{
                                backgroundColor: color,
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
