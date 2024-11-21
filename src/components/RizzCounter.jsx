import React from "react";

const RizzCounter = ({ totalRizz, handleClick, multiplier, activeCharacter, mewingActive }) => {
    return (
        <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">Total Rizz: {totalRizz}</p>
            <p className="text-sm text-gray-600">
                Active Character: {activeCharacter.name} | Rizz Per Click:{" "}
                {activeCharacter.rizzPerClick * multiplier}{" "}
                {mewingActive ? "(x2 Active!)" : ""}
            </p>
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Rizz Me!
            </button>
        </div>
    );
};

export default RizzCounter;
