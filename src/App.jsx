import React, { useState, useEffect, useRef } from "react";
import RizzCounter from "./components/RizzCounter";
import ProgressBar from "./components/ProgressBar";
import CharacterList from "./components/CharacterList";
import { characters } from "./Data";
import CrowdCheer from "/crowd-cheer.mp3"
import { Background, Dex, DexHover, Divider, Insta, InstaHover, MewingBoard, RizzClickerLogo, SocialBar, Telegram, TelegramHover } from "./assets/Rizz Clicker";

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

  // Reference for audio element
  const clapSoundRef = useRef(null);

  const handleClick = () => {
    setTotalRizz((prev) => prev + activeCharacter.rizzPerClick * multiplier);

    setClicking(true);
    setMewingProgress((prev) =>
      Math.min(prev + 100 / (10 * 1), 100) // 2 minutes * 5 clicks per sec = 100%
    );

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
      setMultiplier(3);
      setMewingActive(true);

      activatorTimeout.current = setTimeout(() => {
        setMultiplier(1);
        setMewingActive(false);
        setMewingProgress(0);
      }, 15000);
    }
  }, [mewingProgress, mewingActive]);

  const handlePurchase = (character) => {
    const characterIndex = characters.findIndex((char) => char.name === character.name);
    const previousCharacter = characters[characterIndex - 1];

    if (characterIndex > 0 && !ownedCharacters.includes(previousCharacter.name)) {
      alert(`You must purchase ${previousCharacter.name} first!`);
      return;
    }

    if (totalRizz >= character.cost) {
      setTotalRizz((prev) => prev - character.cost);
      setOwnedCharacters((prev) => [...prev, character.name]);
      setActiveCharacter(character);

      // Play the clapping sound
      if (clapSoundRef.current) {
        clapSoundRef.current.play();
      }
    } else {
      alert("Not enough Rizz to purchase this character!");
    }
  };

  const handleSetActiveCharacter = (character) => {
    if (ownedCharacters.includes(character.name)) {
      setActiveCharacter(character);
    }
  };

  return (
    <div className="flex items-center justify-between">

      {/* Progress Bar Section */}
      <div className="w-64 h-screen relative flex flex-col justify-evenly items-center" >
        <img src={Divider} alt="Divider" className="absolute h-full -right-2 top-0 z-[2]" />
        {/* Social Banner */}
        <div className="relative w-full px-2 -mt-8">
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
        {/* Progress Bar */}
        <ProgressBar progress={mewingProgress} mewingActive={mewingActive} />
        {/* Streak Board */}
        <div className="relative w-full">
          <img src={MewingBoard} alt="Board" className="w-full" />
        </div>
      </div>

      {/* Main Screen */}
      <div className="relative w-full h-screen text-center flex flex-col justify-start items-center" style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
      }}>
        <img src={RizzClickerLogo} alt="Rizz Clicker" className="" />
        <RizzCounter
          totalRizz={totalRizz}
          handleClick={handleClick}
          multiplier={multiplier}
          activeCharacter={activeCharacter}
          mewingActive={mewingActive}
        />
      </div>

      {/* Sound Tracks */}
      <audio ref={clapSoundRef} src={CrowdCheer} preload="auto" />

      {/* Characters Section */}
      <div className="w-fit relative h-screen">
        {/* Divider */}
        <img src={Divider} alt="Divider" srcset={Divider} className="absolute -left-3 h-full top-0 z-[2]" />
        <CharacterList
          characters={characters}
          ownedCharacters={ownedCharacters}
          totalRizz={totalRizz}
          setActiveCharacter={handleSetActiveCharacter}
          handlePurchase={handlePurchase}
        />
      </div>
    </div>
  );
}

export default App;
