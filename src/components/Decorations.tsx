import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Hanging Ornaments Header */}
            {/* Container has fixed height, SVG uses 100% width/height without viewBox to avoid scaling distortion */}
            <div className="absolute top-0 left-0 w-full h-64 z-20 pointer-events-none">
                <svg className="w-full h-full">
                    <defs>
                        <radialGradient id="gradRed" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ff7b7b" />
                            <stop offset="100%" stopColor="#cc0000" />
                        </radialGradient>
                        <radialGradient id="gradGold" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ffe680" />
                            <stop offset="100%" stopColor="#b38f00" />
                        </radialGradient>
                        <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>

                    {/* Render neat array of ornaments across full width using % for X and PX for Y/Radius */}
                    {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x, i) => {
                        // Length in pixels
                        const length = 60 + (i % 3) * 40 + (i % 2) * 20;
                        const color = i % 2 === 0 ? "url(#gradRed)" : "url(#gradGold)";

                        return (
                            <g key={i} className="animate-swing origin-top" style={{ animationDelay: `${i * 0.5}s` }}>
                                {/* String */}
                                <line x1={`${x}%`} y1="0" x2={`${x}%`} y2={length} stroke="#e5e7eb" strokeWidth="1" />
                                {/* Ornament (Radius in pixels) */}
                                <circle cx={`${x}%`} cy={length} r="18" fill={color} filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.3))" />
                                <circle cx={`${x}%`} cy={length} r="18" fill="url(#shine)" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                                {/* Cap */}
                                <rect x={`calc(${x}% - 4px)`} y={length - 22} width="8" height="6" fill="#fbbf24" rx="1" />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};
