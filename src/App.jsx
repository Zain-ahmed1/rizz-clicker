import React, { useState, useEffect, useRef } from "react";
import RizzCounter from "./components/RizzCounter";
import ProgressBar from "./components/ProgressBar";
import CharacterList from "./components/CharacterList";
import { characters } from "./Data";
import CharUnlock from "/unlock_char.mp3";
import MewingStreak from "/mewing_streak.mp3";
import AfterCharUnlock from "/after_unlock.mp3";
import { Background, Dex, DexHover, Divider, Insta, InstaHover, MewingBoard, RizzClickerLogo, SocialBar, Telegram, TelegramHover } from "./assets/Rizz Clicker";

function App() {
    const [totalRizz, setTotalRizz] = useState(0);
    const [activeCharacter, setActiveCharacter] = useState(characters[0]);
    const [ownedCharacters, setOwnedCharacters] = useState([{ name: characters[0].name, level: 1 }]); // Track character levels
    const [mewingProgress, setMewingProgress] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [mewingActive, setMewingActive] = useState(false);
    const [clicking, setClicking] = useState(false);

    const clickTimeout = useRef(null);
    const activatorTimeout = useRef(null);
    const decrementInterval = useRef(null);

    const CharunlockSound = useRef(null);
    const AftercharUnlock = useRef(null);
    const MewingStreakSound = useRef(null);

    const handleClick = () => {
        setTotalRizz((prev) => prev + activeCharacter.rizzPerClick * multiplier);
        setClicking(true);
        setMewingProgress((prev) => Math.min(prev + 100 / (150 * 1), 100));

        if (clickTimeout.current) clearTimeout(clickTimeout.current);

        clickTimeout.current = setTimeout(() => {
            setClicking(false);
        }, 300);
    };

    useEffect(() => {
        if (!clicking && !mewingActive) {
            decrementInterval.current = setInterval(() => {
                setMewingProgress((prev) => Math.max(prev - 0.5, 0));
            }, 50);
        } else {
            clearInterval(decrementInterval.current);
        }

        return () => clearInterval(decrementInterval.current);
    }, [clicking, mewingActive]);

    useEffect(() => {
        if (mewingProgress >= 100 && !mewingActive) {
            setMultiplier(2);
            setMewingActive(true);

            if (MewingStreakSound.current) {
                MewingStreakSound.current.play();
            }

            activatorTimeout.current = setTimeout(() => {
                setMultiplier(1);
                setMewingActive(false);
                setMewingProgress(0);
            }, 7000);
        }
    }, [mewingProgress, mewingActive]);

    const handlePurchase = (character) => {
        // Check if the user has enough Rizz to buy the character
        if (totalRizz >= character.cost) {
            // Deduct the character's cost from the total Rizz
            setTotalRizz((prev) => prev - character.cost);

            // Check if the character is already owned
            const existingCharacter = ownedCharacters.find((owned) => owned.name === character.name);

            // Update the owned characters state
            setOwnedCharacters((prev) => {
                // If the character is already owned, increment the level
                if (existingCharacter) {
                    return prev.map((owned) =>
                        owned.name === character.name
                            ? { ...owned, level: owned.level + 1 }
                            : owned
                    );
                }

                // If the character is not owned, add it to the list with level 1
                return [...prev, { name: character.name, level: 1 }];
            });

            // Update the active character state with the correct level
            setActiveCharacter((prev) => {
                const updatedChar = characters.find((char) => char.name === character.name);
                const characterLevel = existingCharacter ? existingCharacter.level + 1 : 1; // Correct level calculation
                return {
                    ...updatedChar,
                    level: characterLevel,  // Set the updated level
                    rizzPerClick: updatedChar.rizzPerClick * characterLevel,  // Update rizzPerClick based on level
                };
            });
            console.log(ownedCharacters)
            // Play sound when character is unlocked
            if (CharunlockSound.current) {
                CharunlockSound.current.play();
                CharunlockSound.current.onended = () => {
                    if (AftercharUnlock.current) {
                        AftercharUnlock.current.play();
                    }
                };
            }
        } else {
            alert("Not enough Rizz to purchase this character!");
        }
    };


    const handleSetActiveCharacter = (character) => {
        if (ownedCharacters.some((owned) => owned.name === character.name)) {
            setActiveCharacter(character);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="w-64 h-screen relative flex flex-col justify-between items-start">
                <img src={Divider} alt="Divider" className="absolute h-full -right-2 top-0 z-[2]" />
                <div className="relative w-full px-2">
                    <img src={SocialBar} alt="Social banner" className="w-full" />
                    <div className="flex gap-x-4 w-full h-full items-center justify-center absolute top-[2px] left-1/2 -translate-x-1/2">
                        <div className="flex relative group cursor-pointer">
                            <img src={Insta} alt="Dex" />
                            <img src={InstaHover} alt="Dex" className="absolute opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="flex relative group cursor-pointer">
                            <img src={Dex} alt="Dex" />
                            <img src={DexHover} alt="Dex" className="absolute opacity-0 group-hover:opacity-100" />
                        </div>
                        <div className="flex relative group cursor-pointer">
                            <img src={Telegram} alt="Dex" />
                            <img src={TelegramHover} alt="Dex" className="absolute opacity-0 group-hover:opacity-100" />
                        </div>
                    </div>
                </div>
                <ProgressBar progress={mewingProgress} mewingActive={mewingActive} />
                <div className="relative w-full mb-8">
                    <img src={MewingBoard} alt="Board" className="w-full" />
                </div>
            </div>

            <div className="relative w-full h-screen text-center flex flex-col justify-start items-center" style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
            }}>
                <img src={RizzClickerLogo} alt="Rizz Clicker" />
                <RizzCounter
                    totalRizz={totalRizz}
                    handleClick={handleClick}
                    multiplier={multiplier}
                    activeCharacter={activeCharacter}
                    mewingActive={mewingActive}
                />
            </div>

            <audio src={CharUnlock} ref={CharunlockSound} preload="auto"></audio>
            <audio src={AfterCharUnlock} ref={AftercharUnlock} preload="auto"></audio>
            <audio src={MewingStreak} ref={MewingStreakSound} preload="auto"></audio>

            <div className="w-fit relative h-screen">
                <img src={Divider} alt="Divider" className="absolute -left-3 h-full top-0 z-[2]" />
                <CharacterList
                    characters={characters}
                    ownedCharacters={ownedCharacters}
                    totalRizz={totalRizz}
                    setActiveCharacter={handleSetActiveCharacter}
                    handlePurchase={handlePurchase}
                    activeCharacter={activeCharacter}
                />
            </div>
        </div>
    );
}

export default App;
