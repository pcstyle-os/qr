'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import { ReactQRCode, type ReactQRCodeRef } from '@lglab/react-qr-code';
import { type QRStyle, stylePresets } from '@/lib/styles';

interface QRPreviewProps {
    url: string;
    style: QRStyle;
    fgColor: string;
    bgColor: string;
    size: number;
}

export interface QRPreviewHandle {
    download: (format: 'png' | 'svg' | 'jpeg', downloadSize: number) => void;
}

export const QRPreview = forwardRef<QRPreviewHandle, QRPreviewProps>(
    function QRPreview({ url, style, fgColor, bgColor, size }, ref) {
        const qrRef = useRef<ReactQRCodeRef>(null);
        const preset = stylePresets[style];

        useImperativeHandle(ref, () => ({
            download: (format: 'png' | 'svg' | 'jpeg', downloadSize: number) => {
                if (qrRef.current) {
                    qrRef.current.download({
                        name: `qr-pcstyle-${Date.now()}`,
                        format,
                        size: downloadSize,
                    });
                }
            },
        }));

        const getModuleStyle = (): 'square' | 'rounded' => {
            switch (preset.moduleStyle) {
                case 'rounded':
                case 'dots':
                    return 'rounded';
                default:
                    return 'square';
            }
        };

        const getFinderStyle = (): 'square' | 'rounded' | 'rounded-lg' => {
            switch (preset.finderStyle) {
                case 'rounded-lg':
                    return 'rounded-lg';
                case 'rounded':
                    return 'rounded';
                default:
                    return 'square';
            }
        };

        return (
            <div className="relative">
                {/* Glow effect container */}
                <motion.div
                    className="relative rounded-lg border border-hairline p-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Scanlines overlay for glitch style */}
                    {preset.hasScanlines && (
                        <div
                            className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-30"
                            style={{
                                background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                            }}
                        />
                    )}

                    {/* Chromatic aberration layers for glitch style */}
                    {style === 'glitch' && (
                        <>
                            <div
                                className="absolute inset-6 opacity-30 pointer-events-none"
                                style={{ transform: 'translate(-2px, 0)', filter: 'hue-rotate(-60deg)' }}
                            >
                                <ReactQRCode
                                    value={url || 'https://pcstyle.dev'}
                                    size={size}
                                    level="H"
                                    dataModulesSettings={{
                                        style: getModuleStyle(),
                                        color: '#00ffff',
                                    }}
                                    finderPatternOuterSettings={{
                                        style: getFinderStyle(),
                                        color: '#00ffff',
                                    }}
                                    finderPatternInnerSettings={{
                                        style: getFinderStyle(),
                                        color: '#00ffff',
                                    }}
                                />
                            </div>
                            <div
                                className="absolute inset-6 opacity-30 pointer-events-none"
                                style={{ transform: 'translate(2px, 0)', filter: 'hue-rotate(60deg)' }}
                            >
                                <ReactQRCode
                                    value={url || 'https://pcstyle.dev'}
                                    size={size}
                                    level="H"
                                    dataModulesSettings={{
                                        style: getModuleStyle(),
                                        color: '#ff0066',
                                    }}
                                    finderPatternOuterSettings={{
                                        style: getFinderStyle(),
                                        color: '#ff0066',
                                    }}
                                    finderPatternInnerSettings={{
                                        style: getFinderStyle(),
                                        color: '#ff0066',
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* Main QR Code */}
                    <div className="relative z-[5]">
                        <ReactQRCode
                            ref={qrRef}
                            value={url || 'https://pcstyle.dev'}
                            size={size}
                            level="H"
                            background={bgColor}
                            dataModulesSettings={{
                                style: getModuleStyle(),
                                color: fgColor,
                            }}
                            finderPatternOuterSettings={{
                                style: getFinderStyle(),
                                color: fgColor,
                            }}
                            finderPatternInnerSettings={{
                                style: getFinderStyle(),
                                color: fgColor,
                            }}
                        />
                    </div>

                </motion.div>

                {/* Size indicator */}
                <div className="text-center mt-3">
                    <span className="text-xs text-faint">
                        {size}×{size}px · {style}
                    </span>
                </div>
            </div>
        );
    }
);
