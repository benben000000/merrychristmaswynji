import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartButtonProps {
    onClick: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="px-12 py-5 bg-red-600 text-white text-2xl font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:bg-red-500 transition-all flex items-center gap-3 animate-pulse"
        >
            <Heart className="w-8 h-8 fill-current" />
            YES, I DO!
        </motion.button>
    );
};
