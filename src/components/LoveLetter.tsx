import React from 'react';
import { motion } from 'framer-motion';

export const LoveLetter: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card p-8 max-w-2xl w-full mx-4 text-center z-50 overflow-y-auto max-h-[80vh]"
        >
            <h1 className="font-christmas text-5xl text-red-500 mb-6 text-glow">Hi Wynji,</h1>
            <div className="font-body text-base md:text-lg text-gray-200 space-y-4 leading-relaxed tracking-wide text-left">
                <p>
                    merry christmas to you, my gentle light in all this chaos. we met on <span className="text-red-400 font-bold">october 8</span>, and look at us now, still holding on, still choosing each other, still finding ways to be happy together through everything.
                </p>
                <p>
                    thank you for being so soft and caring with me, for the way you listen, worry, and show love in all the little things you do. i want this version of us not just for this christmas, but for next year, and the next, and for every christmas and every ordinary day after that, for as long as life will let us.
                </p>
                <p>
                    i wish i could be beside you right now, holding your hand, watching the lights with you, laughing about nothing until it feels like the world is quiet again. until that day comes, i am sending you all my warmth, all my hugs, all my love through this small christmas message.
                </p>
                <p>
                    no matter how busy or stressed things get, you are never alone. i am right here, cheering for you, praying for you, loving you in every ordinary and magical moment, now and in all the years to come.
                </p>
                <div className="mt-8 text-center space-y-2">
                    <p className="font-christmas text-4xl text-gold-400">merry christmas, my dear wynji,</p>
                    <p className="font-bold text-red-500 text-xl">i love you, always, this year, next year, and forever. ❤️</p>
                </div>
            </div>
        </motion.div>
    );
};
