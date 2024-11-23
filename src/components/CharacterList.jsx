import React from "react";
import { CharBox } from "../assets/Rizz Clicker";

const CharacterList = ({
    characters,
    ownedCharacters,
    totalRizz,
    setActiveCharacter,
    handlePurchase,
    activeCharacter
}) => {
    const formatCost = (cost) => {
        if (cost >= 1000000000000) { // For Trillions
            const formatted = (cost / 1000000000000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000000000000)}T` : `${formatted}T`;
        } else if (cost >= 1000000000) { // For Billions
            const formatted = (cost / 1000000000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000000000)}B` : `${formatted}B`;
        } else if (cost >= 1000000) { // For Millions
            const formatted = (cost / 1000000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000000)}M` : `${formatted}M`;
        } else if (cost >= 1000) { // For Thousands
            const formatted = (cost / 1000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000)}K` : `${formatted}K`;
        } else {
            return cost;
        }
    };
    return (
        <div className="relative w-48 grid grid-cols-1 h-screen overflow-scroll">
            {characters.map((char) => {
                const isOwned = ownedCharacters.some((owned) => owned.name === char.name);
                const canPurchaseAgain = totalRizz >= char.cost;

                // Find the level of the character in ownedCharacters
                const characterLevel = ownedCharacters.find(
                    (owned) => owned.name === char.name
                )?.level || 1;

                const overlayClass = isOwned && !canPurchaseAgain || char.name === "Tyler J"
                    ? "!pointer-events-none select-none before:content-[''] before:bg-black/30 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:rounded-lg before:shadow-[0px_4px_4px_0px_#00000025] before:z-[7] before:!pointer-events-none"
                    : "";
                const filterClass = !isOwned && !canPurchaseAgain ? "grayscale(100%)" : "none";
                const pointerEvents = (isOwned && canPurchaseAgain) || !isOwned ? "auto" : "none";

                return (
                    <div
                        key={char.name}
                        className={`pl-[4px] pr-2 rounded-lg cursor-pointer relative ${overlayClass}`}
                        style={{
                            backgroundImage: `url(${CharBox})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            filter: filterClass,
                            pointerEvents: pointerEvents,
                        }}
                        onClick={() =>
                            isOwned
                                ? canPurchaseAgain
                                    ? handlePurchase(char)
                                    : setActiveCharacter(char)
                                : handlePurchase(char)
                        }
                    >
                        <div className="font-GameFont flex items-center gap-x-1 relative pr-6">
                            <img
                                src={char.image}
                                alt={char.name}
                                className="w-16 h-16 py-[2px] object-contain"
                            />
                            <div>
                                <h3 className="font-normal text-xl capitalize leading-tight">{char.name}</h3>
                                <span className="font-mono font-bold text-sm -mt-2 block">{characterLevel}x</span>
                            </div>
                            <span className="font-mono absolute right-0">
                                {formatCost(char.cost)}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


export default CharacterList;
