import React from 'react';
import { motion } from 'framer-motion';

export const LoveLetter: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card p-8 max-w-md w-full mx-4 text-center z-50"
        >
            <h1 className="font-christmas text-5xl text-red-500 mb-6 text-glow">My Dearest Wynji</h1>

            <div className="font-body text-gray-200 space-y-4 leading-relaxed tracking-wide">
                <p>We met on <span className="text-red-400 font-bold">October 8</span>,</p>
                <p>and look at us now.</p>
                <p>My love for you grows</p>
                <p>more and more day by day.</p>
                <br />
                <p className="font-christmas text-3xl text-gold-400">Merry Christmas! ❤️</p>
            </div>
        </motion.div>
    );
};
