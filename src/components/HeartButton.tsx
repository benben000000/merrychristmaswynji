import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartButtonProps {
    onClick: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition-colors flex items-center gap-2 animate-pulse-slow"
        >
            <Heart className="w-5 h-5 fill-current" />
            Yes, I do!
        </motion.button>
    );
};
