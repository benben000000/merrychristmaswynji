import React from 'react';

export const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e40af] to-[#60a5fa]">
            {/* Stars */}
            <div className="absolute inset-0 opacity-50">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse-slow"
                        style={{
                            top: `${Math.random() * 50}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3}px`,
                            height: `${Math.random() * 3}px`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Moon */}
            <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-yellow-100 shadow-[0_0_50px_rgba(255,255,200,0.4)] opacity-90" />

            {/* Mountains - Back Layer */}
            <div className="absolute bottom-0 left-0 w-full h-1/2">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full opacity-60">
                    <path fill="#334155" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Mountains - Front Layer */}
            <div className="absolute bottom-0 left-0 w-full h-2/5">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full text-slate-700">
                    <path fill="currentColor" d="M0,256L80,240C160,224,320,192,480,192C640,192,800,224,960,234.7C1120,245,1280,235,1360,229.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>

            {/* Snowy Ground */}
            <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-white via-slate-100 to-transparent opacity-90" />
            <div className="absolute -bottom-10 w-full h-32 bg-white blur-xl" />
        </div>
    );
};
