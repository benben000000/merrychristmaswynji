import React from 'react';
import { motion } from 'framer-motion';

export const DancingSurprise: React.FC<{ x: number, y: number }> = ({ x, y }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
            transition={{
                rotate: { repeat: Infinity, duration: 1 },
                scale: { duration: 0.3 }
            }}
            className="absolute pointer-events-none z-40 text-4xl"
            style={{ left: x, top: y }}
        >
            🎅
        </motion.div>
    );
};
