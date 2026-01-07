export type QRStyle = 'neon' | 'matrix' | 'glitch' | 'minimal';

export interface StylePreset {
    id: QRStyle;
    name: string;
    description: string;
    fgColor: string;
    bgColor: string;
    moduleStyle: 'square' | 'rounded' | 'dots';
    finderStyle: 'square' | 'rounded' | 'rounded-lg';
    hasGlow: boolean;
    hasScanlines: boolean;
}

export const stylePresets: Record<QRStyle, StylePreset> = {
    neon: {
        id: 'neon',
        name: 'NEON',
        description: 'Glowing modules with bloom effect',
        fgColor: '#ff00ff',
        bgColor: '#000000',
        moduleStyle: 'rounded',
        finderStyle: 'rounded-lg',
        hasGlow: true,
        hasScanlines: false,
    },
    matrix: {
        id: 'matrix',
        name: 'MATRIX',
        description: 'Digital rain aesthetic',
        fgColor: '#00ff00',
        bgColor: '#000000',
        moduleStyle: 'square',
        finderStyle: 'square',
        hasGlow: true,
        hasScanlines: false,
    },
    glitch: {
        id: 'glitch',
        name: 'GLITCH',
        description: 'Chromatic aberration effect',
        fgColor: '#ff00ff',
        bgColor: '#000000',
        moduleStyle: 'square',
        finderStyle: 'square',
        hasGlow: false,
        hasScanlines: true,
    },
    minimal: {
        id: 'minimal',
        name: 'MINIMAL',
        description: 'Clean, high contrast',
        fgColor: '#ffffff',
        bgColor: '#000000',
        moduleStyle: 'square',
        finderStyle: 'square',
        hasGlow: false,
        hasScanlines: false,
    },
};

export const sizeOptions = [
    { value: 256, label: '256px' },
    { value: 512, label: '512px' },
    { value: 1024, label: '1024px' },
    { value: 2048, label: '2048px' },
];

export const formatOptions = [
    { value: 'png', label: 'PNG' },
    { value: 'svg', label: 'SVG' },
    { value: 'jpeg', label: 'JPEG' },
] as const;

export type DownloadFormat = typeof formatOptions[number]['value'];
