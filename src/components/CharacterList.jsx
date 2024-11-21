import React from "react";

const CharacterList = ({
    characters,
    ownedCharacters,
    totalRizz,
    setActiveCharacter,
    handlePurchase,
}) => {
    return (
        <div className="relative w-64 grid grid-cols-1 gap-[2px]">
            {characters.map((char) => (
                <div
                    key={char.name}
                    className={`pl-[2px] shadow-[0px_4px_4px_0px_#00000025] ${ownedCharacters.includes(char.name)
                            ? "pointer-events-none relative before:content-[''] before:bg-black/30 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:rounded-lg before:shadow-[0px_4px_4px_0px_#00000025]"
                            : "pointer-events-auto"
                        } rounded-lg cursor-pointer bg-[#EBDAB1]`}
                    onClick={() =>
                        ownedCharacters.includes(char.name)
                            ? setActiveCharacter(char)
                            : handlePurchase(char)
                    }
                >
                    <div className="flex items-center gap-x-3">
                        <img src={char.image} alt={char.name} className="w-16 h-16" />
                        <h3 className="font-bold text-base">{char.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
