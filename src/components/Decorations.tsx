import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Elegant Corner Borders (Gold) */}
            <div className="absolute top-6 left-6 w-32 h-32 border-t-[6px] border-l-[6px] border-amber-400 rounded-tl-3xl opacity-80" />
            <div className="absolute top-6 right-6 w-32 h-32 border-t-[6px] border-r-[6px] border-amber-400 rounded-tr-3xl opacity-80" />
            <div className="absolute bottom-6 left-6 w-32 h-32 border-b-[6px] border-l-[6px] border-amber-400 rounded-bl-3xl opacity-80" />
            <div className="absolute bottom-6 right-6 w-32 h-32 border-b-[6px] border-r-[6px] border-amber-400 rounded-br-3xl opacity-80" />

            {/* Inner Red Accents */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-[2px] border-l-[2px] border-red-500/60 rounded-tl-xl" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t-[2px] border-r-[2px] border-red-500/60 rounded-tr-xl" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-[2px] border-l-[2px] border-red-500/60 rounded-bl-xl" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-[2px] border-r-[2px] border-red-500/60 rounded-br-xl" />
        </div>
    );
};
