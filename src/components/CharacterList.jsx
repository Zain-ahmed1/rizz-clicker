import React from "react";
import { CharBox, Divider } from "../assets/Rizz Clicker";

const CharacterList = ({
    characters,
    ownedCharacters,
    totalRizz,
    setActiveCharacter,
    handlePurchase,
}) => {

    const formatCost = (cost) => {
        if (cost >= 1000000) {
            const formatted = (cost / 1000000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000000)}M` : `${formatted}M`; // Remove `.0` if it's a whole number
        } else if (cost >= 1000) {
            const formatted = (cost / 1000).toFixed(1);
            return formatted.endsWith(".0") ? `${Math.floor(cost / 1000)}K` : `${formatted}K`; // Remove `.0` if it's a whole number
        } else {
            return cost; // Return as-is for values less than 1000
        }
    };


    return (
        <div className="relative w-48 grid grid-cols-1">
            {characters.map((char) => (
                <div
                    key={char.name}
                    className={`pl-[4px] pr-2 ${ownedCharacters.includes(char.name)
                        ? "pointer-events-none relative before:content-[''] before:bg-black/30 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:rounded-lg before:shadow-[0px_4px_4px_0px_#00000025] before:z-[2]"
                        : "pointer-events-auto"
                        } rounded-lg cursor-pointer`}
                    style={
                        {
                            backgroundImage: `url(${CharBox})`,
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            filter: ownedCharacters.includes(char.name) || totalRizz >= char.cost ? "none" : "grayscale(100%)",
                            pointerEvents: ownedCharacters.includes(char.name) || totalRizz >= char.cost ? "auto" : "none",
                        }
                    }
                    onClick={() =>
                        ownedCharacters.includes(char.name)
                            ? setActiveCharacter(char)
                            : handlePurchase(char)
                    }
                >
                    <div className="font-GameFont flex items-center gap-x-2 relative pr-6">
                        <img src={char.image} alt={char.name} className="w-16 h-16 py-[2px] object-contain" />
                        <h3 className="font-normal text-xl capitalize">{char.name}</h3>
                        <span className="font-mono absolute right-0">{formatCost(char.cost)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
