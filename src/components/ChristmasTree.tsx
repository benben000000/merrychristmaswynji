import React from 'react';
import { motion } from 'framer-motion';

export const ChristmasTree: React.FC<{ onOrnamentClick: (x: number, y: number) => void }> = ({ onOrnamentClick }) => {
    const ornaments = [
        { x: 50, y: 30, color: '#ef4444' }, // Red
        { x: 35, y: 50, color: '#eab308' }, // Gold
        { x: 65, y: 50, color: '#3b82f6' }, // Blue
        { x: 40, y: 70, color: '#a855f7' }, // Purple
        { x: 60, y: 70, color: '#ec4899' }, // Pink
        { x: 25, y: 85, color: '#ef4444' }, // Red
        { x: 50, y: 85, color: '#eab308' }, // Gold
        { x: 75, y: 85, color: '#3b82f6' }, // Blue
    ];

    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-80 opacity-90 z-0 pointer-events-none">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                {/* Tree Body */}
                <path d="M50 10 L20 60 L35 60 L10 100 L90 100 L65 60 L80 60 Z" fill="#0f766e" />

                {/* Trunk */}
                <rect x="45" y="100" width="10" height="20" fill="#78350f" />

                {/* Star */}
                <motion.path
                    d="M50 0 L53 8 L62 8 L55 14 L58 22 L50 17 L42 22 L45 14 L38 8 L47 8 Z"
                    fill="#fbbf24"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />

                {/* Ornaments (Clickable) */}
                {ornaments.map((o, i) => (
                    <motion.circle
                        key={i}
                        cx={o.x}
                        cy={o.y}
                        r="3"
                        fill={o.color}
                        className="cursor-pointer pointer-events-auto hover:brightness-125"
                        whileHover={{ scale: 1.5 }}
                        onClick={(e) => {
                            // Get absolute position for surprise
                            const rect = (e.target as Element).getBoundingClientRect();
                            onOrnamentClick(rect.left, rect.top);
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};
