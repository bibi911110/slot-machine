import React, { useState, useEffect } from 'react';

import Reel from './Reel';
import '../styles/slot-style.css';

const SlotMachine = () => {
    const [reels, setReels] = useState([
        Array.from({length: 9}, (_, i) => i+1),
        Array.from({length: 9}, (_, i) => i+1),
        Array.from({length: 9}, (_, i) => i+1)
    ]),

    [coins, changeCoins] = useState(20),
    [spinError, setSpinError] = useState(false),
    [addedCoins, setAddedCoins] = useState(0),
    [coinsFor, setCoinsFor] = useState({}),
    [currentReel, setCurrentReel] = useState([{ index: 0}, {index: 0}, {index: 0}]),
    [spinner, setSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            spin(false);
            setSpinner(false)
        }, 1000)
    }, [reels])

    const spin = updateCoins => {
        const newCurrentReel = reels.map(reel => {
            const randomNum =  getRandomInt(0, reel.length)
            return {
                index: randomNum,
                name: reel[randomNum]
            }
        });

        if (updateCoins) calculateCoins(newCurrentReel)
        
        setCurrentReel(newCurrentReel)
    }

    const handleSpin = () => {
        const newCoins = coins-1;
        setSpinError(newCoins === 0 ? true : false);
        setSpinner(true)

        setTimeout(() => {
            spin(true);
            setSpinner(false);
        }, 1000)
    }

    const calculateCoins = currentReel => {
        const reelsCount = currentReel.map(dataItem => dataItem.name)
                                        .filter((name, index, array) => array.indexOf(name) === index)
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * max);
    }

    return (
        <div className="app">
            <h3>Slot Machine - click Spin to play</h3>
            <p>1 spin = 1 coin</p>
            <p>Match two or three similar items to win coins. (exception: 2 lemons = 0 coins)</p>
            <div className="slot">
                <h2 className="slot__heading">Slot Machine</h2>
                <div className="slot__win-message">
                { addedCoins > 0 ? (
                        <span className="success">You Won {addedCoins} coins for {coinsFor.count} {coinsFor.name}s!!</span> 
                    ): null
                }
                </div>                
                <p>Coins: <strong>{coins}</strong></p>
                <div className="slot__slot-container">
                    {reels.map((reelItem, index) => 
                        <Reel reelItem={reelItem} key={index} selectedReel={currentReel[index]} spinner={spinner} />
                    )}                   
                </div>
                { spinError &&  <span className="error">Game over. Add more coins to play</span>}
                <button className="btn btn-primary slot__spin-button" onClick={handleSpin} disabled={(coins === 0)} >Spin</button>
            </div>            
        </div>
    )
}

export default SlotMachine;