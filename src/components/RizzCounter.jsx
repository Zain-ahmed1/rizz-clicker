import React, { useEffect, useState } from "react";
import { Ahegao, BlushWink, EyebrowRaise, HeartEyes, KissyFace, Multiplier, NervousWave, Neutral, RizzCounterBar, Rizzing, SideEyeSmile, SuckingOff } from "../assets/Rizz Clicker";
import { characters } from "../Data";

const levelImages = [
    Neutral,
    SideEyeSmile,
    EyebrowRaise,
    NervousWave,
    BlushWink,
    KissyFace,
    HeartEyes,
    Rizzing,
    SuckingOff,
    Ahegao
];


const RizzCounter = ({ totalRizz, handleClick, multiplier, activeCharacter, mewingActive }) => {
    const [isScaling, setIsScaling] = useState(false);
    const [currentGif, setCurrentGif] = useState(levelImages[0]); // Default to the first gif

    // Handle character click and animation
    const handleClickWithAnimation = () => {
        setIsScaling(true); // Start the scaling animation
        setTimeout(() => setIsScaling(false), 200); // Reset animation after 200ms
        handleClick(); // Call the click handler
    };

    // Find the active character in the characters array based on the character name
    const character = characters.find((char) => char.name === activeCharacter.name);

    // Update the gif based on the character's purchase level
    useEffect(() => {
        if (character) {
            // The character's index in the array maps to the levelImages array
            const characterIndex = characters.indexOf(character);
            setCurrentGif(levelImages[characterIndex]); // Set the corresponding gif
        }
    }, [character]); // Re-run when character changes

    if (!character) return null; // If the active character is not found, return nothing

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="relative">
                <img src={RizzCounterBar} alt="Rizz Counter Bar" />
                <span className="font-medium text-2xl absolute top-1/2 -translate-y-1/2 left-[150px] pointer-events-none select-none">
                    {totalRizz === 0 ? "" : `${totalRizz}`}
                </span>
                {mewingActive ? (
                    <img
                        src={Multiplier}
                        alt="3X Boost"
                        className="absolute -right-14 top-0 rotate-45 animate-bounce"
                    />
                ) : null}
            </div>
            <p className="font-GameFont text-lg pt-2 text-gray-600">
                Rizz Per Click:{" "}
                <span className="font-mono font-bold"> {character.rizzPerClick * multiplier} </span>
            </p>
            <div className="w-96 h-96 p-10 rounded-full flex items-center justify-center drop-shadow-2xl bg-black/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-16">
                <img
                    src={currentGif}
                    alt={character.name}
                    className={`z-10 w-full h-full cursor-pointer transition-transform duration-75 ${isScaling ? "scale-95" : "scale-100"}`}
                    onClick={handleClickWithAnimation}
                />
            </div>
        </div>
    );
};


export default RizzCounter;
