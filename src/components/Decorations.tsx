import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Hanging Ornaments Header (SVG Vector for neatness) */}
            <div className="absolute top-0 inset-x-0 h-64 z-20 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <radialGradient id="gradRed" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ff7b7b" />
                            <stop offset="100%" stopColor="#cc0000" />
                        </radialGradient>
                        <radialGradient id="gradGold" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ffe680" />
                            <stop offset="100%" stopColor="#b38f00" />
                        </radialGradient>
                    </defs>

                    {/* Render neat array of ornaments */}
                    {[10, 25, 40, 50, 60, 75, 90].map((x, i) => {
                        const length = 80 + (i % 3) * 40 + (i % 2) * 20;
                        const color = i % 2 === 0 ? "url(#gradRed)" : "url(#gradGold)";

                        return (
                            <g key={i} className="animate-swing origin-top" style={{ animationDelay: `${i * 0.5}s` }}>
                                {/* String */}
                                <line x1={`${x}%`} y1="0" x2={`${x}%`} y2={length} stroke="#e5e7eb" strokeWidth="2" />
                                {/* Ornament */}
                                <circle cx={`${x}%`} cy={length} r="24" fill={color} filter="drop-shadow(3px 3px 2px rgba(0,0,0,0.3))" />
                                <circle cx={`${x}%`} cy={length} r="24" fill="url(#shine)" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                                {/* Shine Reflection */}
                                <ellipse cx={`${x}%`} cy={length - 12} rx="10" ry="6" fill="rgba(255,255,255,0.3)" />
                                {/* Cap */}
                                <rect x={`calc(${x}% - 6px)`} y={length - 27} width="12" height="8" fill="#fbbf24" rx="2" />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};
