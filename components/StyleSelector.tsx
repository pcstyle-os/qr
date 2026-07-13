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
            <label className="block text-xs text-muted">
                style preset
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
                                    ? 'border-accent-dim bg-accent-dim/10'
                                    : 'border-hairline hover:border-faint'
                                }
              `}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`
                    p-1.5 rounded-md
                    ${isSelected ? 'bg-accent-dim/20' : 'bg-hairline'}
                  `}
                                    style={{
                                        color: preset.fgColor,
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span className={`
                  text-sm
                  ${isSelected ? 'text-accent' : 'text-foreground'}
                `}>
                                    {preset.name}
                                </span>
                            </div>

                            <span className="text-[10px] text-faint">
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
