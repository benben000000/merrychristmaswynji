import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
    onAttemptClick?: () => void;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ onAttemptClick }) => {
    // const controls = useAnimation();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [text, setText] = useState("No");

    const phrases = [
        "No", "Are you sure?", "Think again!", "Don't do this!",
        "I'm fast!", "Catch me!", "Too slow!", "Nice try!", "Nope!", "Really?"
    ];

    const [buttonStyle, setButtonStyle] = useState<any>({ position: 'absolute' });

    const moveButton = (e: any) => {
        // Switch to fixed positioning on first interaction

        // Aggressive Safety margins
        const padding = 50;
        const assumedButtonWidth = 300; // Overestimate width to be safe
        const assumedButtonHeight = 80;

        // Calculate strict available area
        const maxWidth = window.innerWidth - assumedButtonWidth - padding;
        const maxHeight = window.innerHeight - assumedButtonHeight - padding;

        // Ensure we don't return negative values if screen is tiny
        const safeMaxWidth = Math.max(padding, maxWidth);
        const safeMaxHeight = Math.max(padding, maxHeight);

        // Generate random coordinate within precise bounds
        const randomX = Math.floor(Math.random() * (safeMaxWidth - padding) + padding);
        const randomY = Math.floor(Math.random() * (safeMaxHeight - padding) + padding);

        setButtonStyle({
            position: 'fixed', // Use fixed to ignore parent relative positioning
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
            className="px-8 py-3 bg-white text-red-600 font-extrabold rounded-full border-4 border-red-600 hover:bg-gray-100 transition-colors shadow-2xl z-50 whitespace-nowrap"
        >
            {text}
        </motion.button>
    );
};
