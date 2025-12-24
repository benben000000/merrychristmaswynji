import React, { useEffect, useState } from 'react';

export const Snow: React.FC<{ piling: boolean }> = ({ piling }) => {
    const [flakes] = useState(() => Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5
    })));

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {/* Falling Flakes - High Contrast */}
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full shadow-[0_0_5px_white]"
                    style={{
                        left: `${flake.left}%`,
                        top: '-10px',
                        width: '10px',
                        height: '10px',
                        animation: `fall ${flake.duration}s linear infinite`,
                        animationDelay: `${flake.delay}s`
                    }}
                />
            ))}

            {/* Piling Snow at Bottom */}
            <div
                className="absolute bottom-0 left-0 w-full bg-slate-100 blur-xl transition-all duration-[10000ms] ease-out opacity-80"
                style={{
                    height: piling ? '150px' : '0px',
                    opacity: piling ? 0.9 : 0
                }}
            />

            <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0px); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
      `}</style>
        </div>
    );
};
