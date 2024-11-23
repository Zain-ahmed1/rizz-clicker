import React from 'react'
import { Play } from '../assets/Rizz Clicker'

export default function PlayButton({ setshowGame }) {
    return (
        <>
            <div className='fixed top-0 left-0 bottom-0 w-full h-full bg-black/20 backdrop-blur-xl z-50'>
                <img src={Play} alt="Play Game" className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer w-[500px]' onClick={() => setshowGame(true)} />
            </div>
        </>
    )
}
