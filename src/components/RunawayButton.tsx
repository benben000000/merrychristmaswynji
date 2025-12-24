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
        // Switch to fixed positioning on first interaction to allow full screen roaming
        // but strictly bounded.

        // Safety margins
        const padding = 50;
        const buttonWidth = 220; // Approx width of the "No" button
        const buttonHeight = 60;

        const maxWidth = window.innerWidth - buttonWidth - padding;
        const maxHeight = window.innerHeight - buttonHeight - padding;

        const randomX = Math.max(padding, Math.random() * maxWidth);
        const randomY = Math.max(padding, Math.random() * maxHeight);

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
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onHoverStart={moveButton}
            onTouchStart={moveButton}
            style={buttonStyle}
            className="px-8 py-3 bg-white text-red-600 font-extrabold rounded-full border-4 border-red-600 hover:bg-gray-100 transition-colors shadow-2xl z-40"
        >
            {text}
        </motion.button>
    );
};
