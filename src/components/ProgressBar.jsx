import React from "react";
import { MewingBar, MewingBarFill, MewingStreak } from "../assets/Rizz Clicker";

const ProgressBar = ({ progress, mewingActive }) => {
    return (
        <>
            <div className="w-full h-[500px] relative px-2">
                <div className={`absolute w-full h-full top-1/2 -translate-y-1/2 z-[5] transition-all duration-150 ${mewingActive ? "scale-100" : "scale-150"}`}>
                    {mewingActive ?
                        (<>
                            <img src={MewingStreak} alt="Streak Reached" className="absolute w-full z-[4] h-10 top-1/2 -rotate-45" />
                        </>) : null}
                </div>
                <img src={MewingBar} alt="Bar" className="w-full h-full" />
                <div className="absolute top-5 left-[83.5%] -translate-x-1/2 w-full h-[92%]" style={{
                    clipPath: `inset(${100 - progress}% 0 0 0)`, // Reveal based on progress
                    transition: "clip-path 0.2s ease-in-out", // Smooth transition
                }}>
                    <img src={MewingBarFill} alt="Filling" className="w-16 opacity-100 h-full" />
                </div>
            </div>

        </>
    );
};

export default ProgressBar;
