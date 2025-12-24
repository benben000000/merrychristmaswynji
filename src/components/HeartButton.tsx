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
            className="px-16 py-6 bg-red-600 text-white text-3xl font-bold rounded-full shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:bg-red-500 transition-all flex items-center gap-4 animate-pulse"
        >
            <Heart className="w-10 h-10 fill-current" />
            YES, I DO!
        </motion.button>
    );
};
