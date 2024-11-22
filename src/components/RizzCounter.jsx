import React, { useState } from "react";
import { HeartEyes, Multiplier, Neutral, RizzCounterBar } from "../assets/Rizz Clicker";

const RizzCounter = ({ totalRizz, handleClick, multiplier, activeCharacter, mewingActive }) => {

    const [isScaling, setIsScaling] = useState(false);

    const handleClickWithAnimation = () => {
        setIsScaling(true); // Start the scaling animation
        setTimeout(() => setIsScaling(false), 200); // Reset animation after 200ms
        handleClick(); // Call the click handler
    };

    return (
        <div className="flex flex-col items-center mt-6">
            <div className="relative">
                <img src={RizzCounterBar} alt="" />
                <span className="font-medium text-2xl absolute top-1/2 -translate-y-1/2 left-[150px] pointer-events-none select-none">{totalRizz === 0 ? "" : `${totalRizz}`}</span>
                {mewingActive ?
                    (
                        <>
                            <img src={Multiplier} alt="3X Boost" srcset={Multiplier} className="absolute -right-14 top-0 rotate-45 animate-bounce" />
                        </>

                    ) : null}

            </div>
            <p className="font-GameFont text-base pt-2 text-gray-600">
                Active Character: {activeCharacter.name} | Rizz Per Click:{" "}
                <span className="font-mono font-bold"> {activeCharacter.rizzPerClick * multiplier}{" "}
                    {/* {mewingActive ? "(x3 Active!)" : ""} */}
                </span>
            </p>
            <div className="w-80 h-80 rounded-full flex items-center justify-center drop-shadow-2xl bg-black/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {
                    mewingActive ? (
                        <img
                            src={HeartEyes}
                            alt="Neutral"
                            className={`z-10 w-fit h-fit cursor-pointer transition-transform duration-75 ${isScaling ? "scale-95" : "scale-100"}`}
                            onClick={handleClickWithAnimation}
                        />
                    ) : (
                        <img
                            src={Neutral}
                            alt="Neutral"
                            className={`z-10 w-fit h-fit cursor-pointer transition-transform duration-75 ${isScaling ? "scale-95" : "scale-100"}`}
                            onClick={handleClickWithAnimation}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default RizzCounter;
