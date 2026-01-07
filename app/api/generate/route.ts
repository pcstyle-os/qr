import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export const runtime = 'nodejs';

interface QROptions {
    url: string;
    size: number;
    style: string;
    fg: string;
    bg: string;
    format: string;
}

function parseHexColor(hex: string): string {
    // Remove # if present and add it back
    const clean = hex.replace('#', '');
    if (/^[0-9A-Fa-f]{6}$/.test(clean)) {
        return `#${clean}`;
    }
    return '#ff00ff'; // Default to magenta
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const options: QROptions = {
        url: searchParams.get('url') || 'https://pcstyle.dev',
        size: parseInt(searchParams.get('size') || '512', 10),
        style: searchParams.get('style') || 'neon',
        fg: parseHexColor(searchParams.get('fg') || 'ff00ff'),
        bg: parseHexColor(searchParams.get('bg') || '000000'),
        format: searchParams.get('format') || 'png',
    };

    // Validate size
    if (options.size < 64 || options.size > 4096) {
        return NextResponse.json(
            { error: 'Size must be between 64 and 4096' },
            { status: 400 }
        );
    }

    // Validate URL
    try {
        new URL(options.url);
    } catch {
        return NextResponse.json(
            { error: 'Invalid URL provided' },
            { status: 400 }
        );
    }

    try {
        if (options.format === 'svg') {
            // Generate SVG
            const svg = await QRCode.toString(options.url, {
                type: 'svg',
                width: options.size,
                margin: 2,
                color: {
                    dark: options.fg,
                    light: options.bg,
                },
                errorCorrectionLevel: 'H',
            });

            return new NextResponse(svg, {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Content-Disposition': `inline; filename="qr-pcstyle-${Date.now()}.svg"`,
                    'Cache-Control': 'public, max-age=31536000',
                },
            });
        } else {
            // Generate PNG or JPEG as Buffer
            const buffer = await QRCode.toBuffer(options.url, {
                type: 'png',
                width: options.size,
                margin: 2,
                color: {
                    dark: options.fg,
                    light: options.bg,
                },
                errorCorrectionLevel: 'H',
            });

            const contentType = options.format === 'jpeg' ? 'image/jpeg' : 'image/png';
            const extension = options.format === 'jpeg' ? 'jpg' : 'png';

            return new NextResponse(new Uint8Array(buffer), {
                headers: {
                    'Content-Type': contentType,
                    'Content-Disposition': `inline; filename="qr-pcstyle-${Date.now()}.${extension}"`,
                    'Cache-Control': 'public, max-age=31536000',
                },
            });
        }
    } catch (error) {
        console.error('QR generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate QR code' },
            { status: 500 }
        );
    }
}
