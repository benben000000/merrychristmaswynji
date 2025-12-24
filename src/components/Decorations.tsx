import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Border Sashes */}
            <div className="absolute inset-4 border-[4px] border-gold-400/30 rounded-3xl" />
            <div className="absolute inset-6 border-[2px] border-red-500/20 rounded-2xl" />

            {/* Top Left: Geometric Rudolph */}
            <div className="absolute top-8 left-8 opacity-20">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-gold-400">
                    <path d="M20,30 L50,80 L80,30 L50,10 Z" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M20,30 L10,10 M80,30 L90,10" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M30,45 L70,45" strokeWidth="1" />
                    <path d="M50,80 L50,45" strokeWidth="1" />
                    {/* Antlers */}
                    <path d="M10,10 L0,0 M90,10 L100,0 M10,10 L20,0 M90,10 L80,0" strokeWidth="2" />
                </svg>
            </div>

            {/* Top Right: Hanging Ornaments */}
            <div className="absolute top-0 right-12 flex gap-4">
                <div className="w-[2px] h-20 bg-gray-500/30 relative">
                    <div className="absolute -bottom-4 -left-3 w-8 h-8 rounded-full border border-red-500/50 bg-red-500/10" />
                </div>
                <div className="w-[2px] h-32 bg-gray-500/30 relative">
                    <div className="absolute -bottom-5 -left-4 w-10 h-10 rounded-full border border-gold-400/50 bg-gold-400/10" />
                </div>
            </div>

            {/* Bottom Right: Geometric Tree */}
            <div className="absolute bottom-8 right-8 opacity-20">
                <svg width="80" height="100" viewBox="0 0 80 100" fill="none" stroke="currentColor" className="text-green-500/50">
                    <path d="M40,10 L10,90 L70,90 Z" strokeWidth="2" />
                    <path d="M40,30 L15,90 M40,30 L65,90" strokeWidth="1" />
                    <path d="M40,50 L25,90 M40,50 L55,90" strokeWidth="1" />
                </svg>
            </div>
        </div>
    );
};
