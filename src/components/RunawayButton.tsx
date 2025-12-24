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

    const moveButton = (e: any) => {
        // Switch to fixed positioning on first interaction

        // Use conservative percentage-based safe zones
        const width = window.innerWidth;
        const height = window.innerHeight;

        // X: Strict lockdown: 50px padding, MAX width is Screen - 300px.
        const safeWidth = Math.max(10, width - 350); // 300 button + 50 padding
        const randomX = Math.max(50, Math.random() * safeWidth);

        // Y: Strict lockdown: 50px padding, MAX height is Screen - 150px.
        const safeHeight = Math.max(10, height - 200); // 100 button + 100 padding
        const randomY = Math.max(50, Math.random() * safeHeight);

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
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
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
