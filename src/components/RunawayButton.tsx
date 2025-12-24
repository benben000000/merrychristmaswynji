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

            // Detach from flow and use exact coordinates
            // This is safer than Delta because offsets can change
            setButtonStyle({
                position: 'absolute',
                left: 0,
                top: 0
            });

            // With absolute positioning at (0,0), translate(x,y) moves to exactly x,y
            setPosition({ x: randomX, y: randomY });

            // Random Rotation for "Slant"
            const randomRotate = (Math.random() - 0.5) * 60; // -30 to +30 deg (increased slant)

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
