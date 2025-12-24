import React, { useEffect, useRef } from 'react';

// User can replace public/audio/bgm.mp3 with their own file
const MUSIC_URL = "./audio/bgm.mp3";

export const MusicPlayer: React.FC<{ start: boolean }> = ({ start }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (start && audioRef.current) {
            audioRef.current.volume = 0.2; // Subtle volume
            audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
        }
    }, [start]);

    return (
        <audio ref={audioRef} loop>
            <source src={MUSIC_URL} type="audio/mp3" />
        </audio>
    );
};
