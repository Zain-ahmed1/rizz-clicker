import React, { useState, useEffect, useRef } from "react";
import RizzCounter from "./components/RizzCounter";
import ProgressBar from "./components/ProgressBar";
import CharacterList from "./components/CharacterList";
import { characters } from "./Data";

function App() {
  const [totalRizz, setTotalRizz] = useState(0);
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);
  const [ownedCharacters, setOwnedCharacters] = useState([characters[0].name]);
  const [mewingProgress, setMewingProgress] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [mewingActive, setMewingActive] = useState(false);
  const [clicking, setClicking] = useState(false);

  const clickTimeout = useRef(null);
  const activatorTimeout = useRef(null);
  const decrementInterval = useRef(null);

  // Handle Rizz generation
  const handleClick = () => {
    setTotalRizz((prev) => prev + activeCharacter.rizzPerClick * multiplier);

    // Start filling the progress bar
    setClicking(true);
    setMewingProgress((prev) =>
      Math.min(prev + 100 / (120 * 10), 100) // 2 minutes = 100%
    );

    // Reset inactivity timeout
    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    clickTimeout.current = setTimeout(() => {
      setClicking(false);
    }, 300); // Detects inactivity after 300ms
  };

  // Gradually decrease progress bar when not clicking
  useEffect(() => {
    if (!clicking && !mewingActive) {
      decrementInterval.current = setInterval(() => {
        setMewingProgress((prev) => Math.max(prev - 0.5, 0)); // Reduce progress
      }, 50); // Adjust speed of decrement as needed
    } else {
      clearInterval(decrementInterval.current);
    }

    return () => clearInterval(decrementInterval.current);
  }, [clicking, mewingActive]);

  // Handle Mewing Activator
  useEffect(() => {
    if (mewingProgress >= 100 && !mewingActive) {
      setMultiplier(2); // 2x multiplier
      setMewingActive(true);

      activatorTimeout.current = setTimeout(() => {
        setMultiplier(1);
        setMewingActive(false);
        setMewingProgress(0);
      }, 30000); // 30 seconds
    }
  }, [mewingProgress, mewingActive]);

  const handlePurchase = (character) => {
    if (totalRizz >= character.cost) {
      setTotalRizz((prev) => prev - character.cost);
      setOwnedCharacters((prev) => [...prev, character.name]);
      setActiveCharacter(character); // Automatically set the purchased character as active
    }
  };

  const handleSetActiveCharacter = (character) => {
    if (ownedCharacters.includes(character.name)) {
      setActiveCharacter(character); // Update active character if owned
    }
  };

  return (
    <div className="min-h-screen bg-yellow-200 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Rizz Clicker</h1>

      <RizzCounter
        totalRizz={totalRizz}
        handleClick={handleClick}
        multiplier={multiplier}
        activeCharacter={activeCharacter}
        mewingActive={mewingActive}
      />

      <ProgressBar progress={mewingProgress} mewingActive={mewingActive} />

      <CharacterList
        characters={characters}
        ownedCharacters={ownedCharacters}
        totalRizz={totalRizz}
        setActiveCharacter={handleSetActiveCharacter}
        handlePurchase={handlePurchase}
      />
    </div>
  );
}

export default App;
