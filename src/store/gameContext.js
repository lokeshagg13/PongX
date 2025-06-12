import { createContext, useRef, useState } from "react";

import { initGame } from "../game/gameLoop";
import constants from "./constants";

const GameContext = createContext({
    gameStatus: null,
    countdownRunning: false,
    gameType: null,
    leftPlayerName: null,
    rightPlayerName: null,
    leftPlayerScore: 0,
    rightPlayerScore: 0,
    winner: null,
    mainCanvasRef: null,
    handleStartGame: (leftName, rightName, gameType) => { },
    handlePauseGame: () => { },
    handleResumeGame: () => { },
    handleInterruptGame: () => { },
    incrementLeftPlayerScore: () => { },
    incrementRightPlayerScore: () => { },
    handleEndGame: (winner) => { },
});

export function GameContextProvider(props) {
    const [gameStatus, setGameStatus] = useState(null);
    const [countdownRunning, setCountdownRunning] = useState(false);
    const [gameType, setGameType] = useState(constants.GAME_TYPES[0]);
    const [leftPlayerName, setLeftPlayerName] = useState("Player 1");
    const [rightPlayerName, setRightPlayerName] = useState("Player 2");
    const [leftPlayerScore, setLeftPlayerScore] = useState(0);
    const [rightPlayerScore, setRightPlayerScore] = useState(0);
    const [winner, setWinner] = useState("Bot");

    const mainCanvasRef = useRef(null);
    const pauseGameFuncRef = useRef(null);
    const resumeGameFuncRef = useRef(null);
    const endGameFuncRef = useRef(null);

    function handleStartGame(leftName, rightName, gameType) {
        setGameStatus("running");
        setLeftPlayerScore(0);
        setRightPlayerScore(0);
        setWinner(null);
        if (leftName) setLeftPlayerName(leftName);
        if (rightName) setRightPlayerName(rightName);
        if (gameType && constants.GAME_TYPES.includes(gameType)) setGameType(gameType);
        if (endGameFuncRef.current) {
            endGameFuncRef.current();
        }
        const { startGame, pauseGame, resumeGame, endGame } = initGame(mainCanvasRef.current, gameType, {
            toggleCountdownState,
            incrementLeftPlayerScore,
            incrementRightPlayerScore,
        });
        pauseGameFuncRef.current = pauseGame;
        resumeGameFuncRef.current = resumeGame;
        endGameFuncRef.current = endGame;
        startGame();
    }

    function incrementLeftPlayerScore() {
        setLeftPlayerScore((prevScore) => prevScore + 1);
    }

    function incrementRightPlayerScore() {
        setRightPlayerScore((prevScore) => prevScore + 1);
    }

    function toggleCountdownState() {
        setCountdownRunning(prev => !prev);
    }

    function handlePauseGame() {
        setGameStatus("paused");
        if (pauseGameFuncRef.current) {
            pauseGameFuncRef.current();
        }
    }

    function handleResumeGame() {
        setGameStatus("running");
        if (resumeGameFuncRef.current) {
            resumeGameFuncRef.current();
        }
    }

    function handleInterruptGame() {
        if (endGameFuncRef.current) {
            endGameFuncRef.current();
        }
        setGameStatus(null);
    }

    function handleEndGame(winner) {
        if (endGameFuncRef.current) {
            endGameFuncRef.current();
        }
        setGameStatus("completed");
        setWinner(winner === "left" ? leftPlayerName : rightPlayerName);
    }

    const currentGameContext = {
        gameStatus,
        countdownRunning,
        gameType,
        leftPlayerName,
        rightPlayerName,
        leftPlayerScore,
        rightPlayerScore,
        winner,
        mainCanvasRef,
        handleStartGame,
        handlePauseGame,
        handleResumeGame,
        handleInterruptGame,
        incrementLeftPlayerScore,
        incrementRightPlayerScore,
        handleEndGame
    };

    return (
        <GameContext.Provider value={currentGameContext}>
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;