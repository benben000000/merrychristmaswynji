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

    const [buttonStyle, setButtonStyle] = useState<any>({});

    // State to track next side to jump to (Ping Pong effect)
    const [nextSide, setNextSide] = useState<'left' | 'right'>('right');

    const moveButton = (e: any) => {
        const btn = e.target;
        const parent = btn.offsetParent; // The glass card (relative container)

        if (parent) {
            // Get parent dimensions
            const parentWidth = parent.clientWidth;
            const parentHeight = parent.clientHeight;

            // Get button dimensions (approx or from element)
            const btnWidth = btn.offsetWidth || 150;
            const btnHeight = btn.offsetHeight || 50;

            // Calculate strict bounds WITHIN the parent
            const maxX = parentWidth - btnWidth - 40; // 40px buffer
            const maxY = parentHeight - btnHeight - 40;

            const randomX = Math.random() * maxX;
            // Ensure Y doesn't go too high (overlap title) or low
            const randomY = Math.random() * maxY;

            // Stay absolute relative to parent
            setButtonStyle({
                position: 'absolute'
            });

            setPosition({ x: randomX, y: randomY });
            setText(phrases[Math.floor(Math.random() * phrases.length)]);
            if (onAttemptClick) onAttemptClick();
        }
    };

    return (
        <motion.button
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            onHoverStart={moveButton}
            onTouchStart={moveButton}
            style={buttonStyle}
            className="px-8 py-3 bg-white text-red-600 font-extrabold rounded-full border-4 border-red-600 hover:bg-gray-100 transition-colors shadow-2xl z-[9999] whitespace-nowrap"
        >
            {text}
        </motion.button>
    );
};
