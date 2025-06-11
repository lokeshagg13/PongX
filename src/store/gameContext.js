import { createContext, useRef, useState } from "react";

import { startGame } from "../game/gameLoop";
import constants from "./constants";

const GameContext = createContext({
    gameStatus: null,
    gameType: null,
    leftPlayerName: null,
    rightPlayerName: null,
    leftPlayerScore: 0,
    rightPlayerScore: 0,
    winner: null,
    mainCanvasRef: null,
    gameCleanupRef: null,
    handleStartGame: (leftName, rightName, gameType) => { },
    incrementLeftPlayerScore: () => { },
    incrementRightPlayerScore: () => { },
    setLeftPlayerWinner: () => { },
    setRightPlayerWinner: () => { },
});

export function GameContextProvider(props) {
    const [gameStatus, setGameStatus] = useState(null);
    const [gameType, setGameType] = useState(constants.GAME_TYPES[0]);
    const [leftPlayerName, setLeftPlayerName] = useState("Player 1");
    const [rightPlayerName, setRightPlayerName] = useState("Player 2");
    const [leftPlayerScore, setLeftPlayerScore] = useState(0);
    const [rightPlayerScore, setRightPlayerScore] = useState(0);
    const [winner, setWinner] = useState("Bot");

    const mainCanvasRef = useRef(null);
    const gameCleanupRef = useRef(null);

    function handleStartGame(leftName, rightName, gameType) {
        setGameStatus("running");
        setLeftPlayerScore(0);
        setRightPlayerScore(0);
        setWinner(null);
        if (leftName) setLeftPlayerName(leftName);
        if (rightName) setRightPlayerName(rightName);
        if (gameType && constants.GAME_TYPES.includes(gameType)) setGameType(gameType);
        if (gameCleanupRef.current) {
            gameCleanupRef.current();
        }
        const cleanup = startGame(mainCanvasRef.current, {
            incrementLeftPlayerScore,
            incrementRightPlayerScore,
        });
        gameCleanupRef.current = cleanup;
    }

    function incrementLeftPlayerScore() {
        setLeftPlayerScore((prevScore) => prevScore + 1);
    }

    function incrementRightPlayerScore() {
        setRightPlayerScore((prevScore) => prevScore + 1);
    }

    function setLeftPlayerWinner() {
        setGameStatus("completed");
        setWinner(leftPlayerName);
    }

    function setRightPlayerWinner() {
        setGameStatus("completed");
        setWinner(rightPlayerName);
    }

    const currentGameContext = {
        gameStatus,
        gameType,
        leftPlayerName,
        rightPlayerName,
        leftPlayerScore,
        rightPlayerScore,
        winner,
        mainCanvasRef,
        gameCleanupRef,
        handleStartGame,
        incrementLeftPlayerScore,
        incrementRightPlayerScore,
        setLeftPlayerWinner,
        setRightPlayerWinner
    };

    return (
        <GameContext.Provider value={currentGameContext}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;