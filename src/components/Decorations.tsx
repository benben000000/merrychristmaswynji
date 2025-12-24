import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Hanging Ornaments Header */}
            <div className="absolute top-0 left-0 w-full h-48 z-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
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

                    {/* Render neat array of ornaments across full width */}
                    {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((x, i) => {
                        const length = 40 + (i % 3) * 15 + (i % 2) * 10;
                        const color = i % 2 === 0 ? "url(#gradRed)" : "url(#gradGold)";

                        return (
                            <g key={i} className="animate-swing origin-top" style={{ animationDelay: `${i * 0.5}s` }}>
                                {/* String */}
                                <line x1={x} y1="0" x2={x} y2={length} stroke="#e5e7eb" strokeWidth="0.2" />
                                {/* Ornament */}
                                <circle cx={x} cy={length} r="4" fill={color} filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.3))" />
                                <circle cx={x} cy={length} r="4" fill="url(#shine)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.1" />
                                {/* Cap */}
                                <rect x={x - 1} y={length - 4.5} width="2" height="1.5" fill="#fbbf24" rx="0.5" />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};
