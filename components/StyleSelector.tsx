'use client';

import { motion } from 'framer-motion';
import { type QRStyle, stylePresets } from '@/lib/styles';
import { Zap, Grid3X3, AlertTriangle, Minus } from 'lucide-react';

interface StyleSelectorProps {
    selected: QRStyle;
    onSelect: (style: QRStyle) => void;
}

const styleIcons: Record<QRStyle, typeof Zap> = {
    neon: Zap,
    matrix: Grid3X3,
    glitch: AlertTriangle,
    minimal: Minus,
};

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.3em] text-[#ff00ff]/60 font-mono">
                Style Preset
            </label>

            <div className="grid grid-cols-2 gap-2">
                {Object.values(stylePresets).map((preset) => {
                    const Icon = styleIcons[preset.id];
                    const isSelected = selected === preset.id;

                    return (
                        <motion.button
                            key={preset.id}
                            onClick={() => onSelect(preset.id)}
                            className={`
                relative flex flex-col items-start gap-1 p-3 rounded-lg
                border transition-all duration-200 text-left
                ${isSelected
                                    ? 'border-[#ff00ff] bg-[#ff00ff]/10'
                                    : 'border-white/10 bg-white/5 hover:border-[#ff00ff]/50 hover:bg-[#ff00ff]/5'
                                }
              `}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSelected && (
                                <motion.div
                                    className="absolute inset-0 rounded-lg"
                                    layoutId="styleHighlight"
                                    style={{
                                        boxShadow: '0 0 20px rgba(255, 0, 255, 0.3), inset 0 0 20px rgba(255, 0, 255, 0.1)',
                                    }}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                    p-1.5 rounded-md
                    ${isSelected ? 'bg-[#ff00ff]/20' : 'bg-white/10'}
                  `}
                                    style={{
                                        color: preset.fgColor,
                                        textShadow: preset.hasGlow ? `0 0 10px ${preset.fgColor}` : 'none',
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className={`
                  text-sm font-mono tracking-wider
                  ${isSelected ? 'text-[#ff00ff]' : 'text-white/80'}
                `}>
                                    {preset.name}
                                </span>
                            </div>

                            <span className="text-[10px] text-white/40 font-mono">
                                {preset.description}
                            </span>

                            {/* Color preview dots */}
                            <div className="flex items-center gap-1 mt-1">
                                <div
                                    className="w-3 h-3 rounded-full border border-white/20"
                                    style={{ backgroundColor: preset.fgColor }}
                                />
                                <div
                                    className="w-3 h-3 rounded-full border border-white/20"
                                    style={{ backgroundColor: preset.bgColor }}
                                />
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
