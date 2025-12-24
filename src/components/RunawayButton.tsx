import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
    onAttemptClick?: () => void;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ onAttemptClick }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [text, setText] = useState("No");

    const phrases = [
        "No", "Are you sure?", "Think again!", "Don't do this!",
        "I'm fast!", "Catch me!", "Too slow!", "Nice try!", "Nope!", "Really?"
    ];

    const [buttonStyle, setButtonStyle] = useState<any>({});

    const moveButton = () => {
        const btn = btnRef.current;
        if (!btn) return;

        const parent = btn.offsetParent as HTMLElement; // The glass card (relative container)

        if (parent) {
            // Get parent dimensions
            const parentWidth = parent.clientWidth;
            const parentHeight = parent.clientHeight;

            // Get button dimensions
            const btnWidth = btn.offsetWidth;
            const btnHeight = btn.offsetHeight;

            // Calculate strict bounds WITHIN the parent
            const maxX = parentWidth - btnWidth - 40; // Buffer
            const maxY = parentHeight - btnHeight - 40;

            // Random Target Position
            const randomX = Math.max(20, Math.random() * maxX);
            const randomY = Math.max(20, Math.random() * maxY);

            // Calculate Delta from current STATIC layout position
            const deltaX = randomX - btn.offsetLeft;
            const deltaY = randomY - btn.offsetTop;

            // Random Rotation for "Slant"
            const randomRotate = (Math.random() - 0.5) * 30; // -15 to +15 deg

            setPosition({ x: deltaX, y: deltaY });
            setRotation(randomRotate);
            setText(phrases[Math.floor(Math.random() * phrases.length)]);
            if (onAttemptClick) onAttemptClick();
        }
    };

    return (
        <motion.button
            ref={btnRef}
            animate={{ x: position.x, y: position.y, rotate: rotation }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            onHoverStart={moveButton}
            onTouchStart={moveButton}
            style={buttonStyle}
            className="px-8 py-3 bg-white text-red-600 font-extrabold rounded-full border-4 border-red-600 hover:bg-gray-100 transition-colors shadow-2xl z-[9999] whitespace-nowrap"
        >
            {text}
        </motion.button>
    );
};
