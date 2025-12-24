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

    const moveButton = () => {
        const randomX = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
        const randomY = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);

        setPosition({ x: randomX, y: randomY });
        setText(phrases[Math.floor(Math.random() * phrases.length)]);
        if (onAttemptClick) onAttemptClick();
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={moveButton}
            onTouchStart={moveButton} // For mobile
            onClick={moveButton}      // Backup if they somehow click it
            className="absolute px-8 py-3 bg-gray-400/30 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-red-500/50 transition-colors shadow-lg active:animate-shake"
        >
            {text}
        </motion.button>
    );
};
