import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
    onAttemptClick?: () => void;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ onAttemptClick }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [text, setText] = useState("No");

    const phrases = [
        "No", "Are you sure?", "Think again!", "Don't do this!",
        "I'm fast!", "Catch me!", "Too slow!", "Nice try!", "Nope!", "Really?"
    ];

    const [buttonStyle, setButtonStyle] = useState<any>({ position: 'absolute' });

    // State to track next side to jump to (Ping Pong effect)
    const [nextSide, setNextSide] = useState<'left' | 'right'>('right');

    const moveButton = (e: any) => {
        // Toggle side
        const targetSide = nextSide;
        setNextSide(prev => prev === 'left' ? 'right' : 'left');

        const width = window.innerWidth;
        const height = window.innerHeight;

        let randomX;

        if (targetSide === 'left') {
            // Left Safe Zone: 10% to 40%
            const minX = width * 0.1;
            const maxX = width * 0.4;
            randomX = Math.random() * (maxX - minX) + minX;
        } else {
            // Right Safe Zone: 50% to 80% (Leaves 20% buffer on right)
            const minX = width * 0.5;
            const maxX = width * 0.8;
            randomX = Math.random() * (maxX - minX) + minX;
        }

        // Vertical Safe Zone: 15% to 85% (Avoid extreme top/bottom)
        const minY = height * 0.15;
        const maxY = height * 0.85;
        const randomY = Math.random() * (maxY - minY) + minY;

        setButtonStyle({
            position: 'fixed',
            left: 0,
            top: 0
        });

        setPosition({ x: randomX, y: randomY });
        setText(phrases[Math.floor(Math.random() * phrases.length)]);
        if (onAttemptClick) onAttemptClick();
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            onHoverStart={moveButton}
            onTouchStart={moveButton}
            style={buttonStyle}
            // Add max-width constraint to text as well
            className="px-8 py-3 bg-white text-red-600 font-extrabold rounded-full border-4 border-red-600 hover:bg-gray-100 transition-colors shadow-2xl z-50 whitespace-nowrap"
        >
            {text}
        </motion.button>
    );
};
