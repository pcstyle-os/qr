'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface MatrixColumn {
    id: number;
    left: number;
    duration: number;
    delay: number;
    characters: string;
}

export function MatrixBackground() {
    const [columns, setColumns] = useState<MatrixColumn[]>([]);

    const matrixChars = useMemo(() =>
        'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF',
        []
    );

    useEffect(() => {
        const columnCount = Math.floor(window.innerWidth / 30);
        const newColumns: MatrixColumn[] = [];

        for (let i = 0; i < columnCount; i++) {
            const chars = Array.from({ length: 20 }, () =>
                matrixChars[Math.floor(Math.random() * matrixChars.length)]
            ).join(' ');

            newColumns.push({
                id: i,
                left: (i / columnCount) * 100,
                duration: 8 + Math.random() * 12,
                delay: Math.random() * -20,
                characters: chars,
            });
        }

        setColumns(newColumns);
    }, [matrixChars]);

    return (
        <div className="fixed inset-0 overflow-hidden -z-10 opacity-20">
            {columns.map((column) => (
                <motion.div
                    key={column.id}
                    className="matrix-column"
                    style={{
                        left: `${column.left}%`,
                    }}
                    initial={{ y: '-100%', opacity: 0 }}
                    animate={{
                        y: '100vh',
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: column.duration,
                        delay: column.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {column.characters}
                </motion.div>
            ))}
        </div>
    );
}
