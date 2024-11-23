import React, { useRef, useState, useEffect } from 'react';
import { AudioBoxPaused, AudioBoxPlaying, AudioOff, AudioOn, NextSong, PrevSong } from '../assets/Rizz Clicker';

export default function SongList({ showGame }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef(null);

    const playlist = [
        "/enterance-song.mp3",
        "/second-song.mp3",
        "/third-song.mp3",
    ];

    const playCurrentSong = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = playlist[currentSongIndex];
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error("Playback failed:", err));
        }
    };

    const handleNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    };

    const handlePrevSong = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
        );
    };

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error("Playback failed:", err));
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Automatically unmute the audio after 5 seconds
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.src = playlist[currentSongIndex];
            audio.muted = true; // Start muted
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error("Autoplay failed:", err));

            // Unmute audio after 5 seconds
            const unmuteTimeout = setTimeout(() => {
                audio.muted = false;
                setIsMuted(false);
            }, 500); // 5000ms = 5 seconds

            return () => clearTimeout(unmuteTimeout); // Clean up timeout on unmount
        }
    }, [currentSongIndex]);

    // Play audio when `showGame` is true
    useEffect(() => {
        const audio = audioRef.current;
        if (showGame && audio) {
            audio.src = playlist[currentSongIndex];
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error("Playback failed:", err));
        }
    }, [showGame, currentSongIndex]);

    return (
        <>
            <div className="relative">
                <div className="relative">
                    <img
                        src={isPlaying && !isMuted ? AudioBoxPlaying : AudioBoxPaused}
                        alt="AudioBox"
                        className="relative z-[2] cursor-pointer"
                        onClick={togglePlayPause}
                    />
                    <div className="absolute bottom-3 z-[20] flex justify-between w-full px-1">
                        <div className="relative w-1/2 flex items-center">
                            <img
                                src={PrevSong}
                                alt="Prev"
                                title="Previous Song"
                                onClick={handlePrevSong}
                                className="cursor-pointer"
                            />
                            <img
                                src={NextSong}
                                alt="Next"
                                title="Next Song"
                                onClick={handleNextSong}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="relative w-1/2 text-right flex items-end justify-end">
                            <img
                                src={isMuted ? AudioOff : AudioOn}
                                alt={isMuted ? "Mute" : "Unmute"}
                                title={isMuted ? "Unmute" : "Mute"}
                                onClick={toggleMute}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} loop preload="auto" />
            </div>
        </>
    );
}
