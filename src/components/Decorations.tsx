import React from 'react';

export const Decorations: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Hanging Ornaments Header */}
            <div className="absolute top-0 inset-x-0 h-32 md:h-48 z-20 pointer-events-none flex justify-center overflow-hidden">
                {/* We repeat the image to cover width if needed, or just center it. 
                    Assuming simple center for now. */}
                <img
                    src="./ornaments.png"
                    alt="Decorations"
                    className="w-full max-w-6xl object-cover object-top opacity-90 drop-shadow-lg"
                />
            </div>
        </div>
    );
};
