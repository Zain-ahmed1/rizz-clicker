import React from "react";

const CharacterList = ({
    characters,
    ownedCharacters,
    totalRizz,
    setActiveCharacter,
    handlePurchase,
}) => {
    return (
        <div className="mt-8 grid grid-cols-2 gap-4">
            {characters.map((char) => (
                <div
                    key={char.name}
                    className={`p-4 border-2 ${ownedCharacters.includes(char.name)
                            ? "border-green-500"
                            : "border-gray-500"
                        } rounded`}
                >
                    <h3 className="font-bold">{char.name}</h3>
                    <p>Rizz/Click: {char.rizzPerClick}</p>
                    <p>Cost: {char.cost}</p>
                    {ownedCharacters.includes(char.name) ? (
                        <button
                            className="bg-gray-400 text-white font-bold py-1 px-2 rounded cursor-default"
                            onClick={() => setActiveCharacter(char)}
                        >
                            Active
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                            onClick={() => handlePurchase(char)}
                        >
                            Buy
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CharacterList;
