import { useRef, useContext } from "react";
import { movePaddle, stopPaddle } from "../../game/gameLoop";
import GameContext from "../../store/gameContext";
import { useEffect } from "react";

function GameConsole() {
  const intervalId = useRef(null);
  const gameContext = useContext(GameContext);

  useEffect(() => {}, []);

  const handleStart = (whichPaddle, direction) => {
    movePaddle(whichPaddle, direction); // Immediate movement
    intervalId.current = setInterval(
      () => movePaddle(whichPaddle, direction),
      50
    ); // Continuous movement
  };

  const handleEnd = (whichPaddle) => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      stopPaddle(whichPaddle);
    }
  };

  return (
    <div
      className={`flex w-full ${
        gameContext.gameType === "b/vs/b" ? "justify-end" : "justify-between"
      }`}
    >
      {gameContext.gameType !== "b/vs/b" && (
        <div className="console-container">
          {/* Up Button */}
          <div
            className={`console-btn up ${
              gameContext.countdownRunning ? "disabled-area" : ""
            }`}
            onMouseDown={() => handleStart("left", "up")}
            onTouchStart={() => handleStart("left", "up")}
            onMouseUp={() => handleEnd("left")}
            onMouseLeave={() => handleEnd("left")}
            onTouchEnd={() => handleEnd("left")}
            onContextMenu={(e) => e.preventDefault()}
            aria-disabled={gameContext.countdownRunning}
          >
            <span className="arrow">▲</span>
          </div>

          {/* Down Button */}
          <div
            className={`console-btn down ${
              gameContext.countdownRunning ? "disabled-area" : ""
            }`}
            onMouseDown={(e) => handleStart("left", "down")}
            onTouchStart={(e) => handleStart("left", "down")}
            onMouseUp={() => handleEnd("left")}
            onMouseLeave={() => handleEnd("left")}
            onTouchEnd={() => handleEnd("left")}
            onContextMenu={(e) => e.preventDefault()}
            aria-disabled={gameContext.countdownRunning}
          >
            <span className="arrow">▲</span>
          </div>
        </div>
      )}

      <div className="console-container">
        <button
          className={`pause-btn ${
            gameContext.gameStatus === "paused" ? "z-100" : "z-0"
          } ${gameContext.countdownRunning ? "disabled-btn" : ""}`}
          onClick={
            gameContext.gameStatus === "running"
              ? () => gameContext.handlePauseGame()
              : () => gameContext.handleResumeGame()
          }
          disabled={gameContext.countdownRunning}
        >
          {gameContext.gameStatus === "running" ? "Pause" : "Resume"}
        </button>
        <button
          className={`restart-btn ${
            gameContext.gameStatus === "paused" ? "z-100" : "z-0"
          }`}
          onClick={() => gameContext.handleInterruptGame()}
        >
          Restart
        </button>
      </div>

      {gameContext.gameType === "u/vs/u" && (
        <div className="console-container">
          {/* Up Button */}
          <div
            className={`console-btn up ${
              gameContext.countdownRunning ? "disabled-area" : ""
            }`}
            onMouseDown={(e) => handleStart("right", "up")}
            onTouchStart={(e) => handleStart("right", "up")}
            onMouseUp={() => handleEnd("right")}
            onMouseLeave={() => handleEnd("right")}
            onTouchEnd={() => handleEnd("right")}
            onContextMenu={(e) => e.preventDefault()}
            aria-disabled={gameContext.countdownRunning}
          >
            <span className="arrow">▲</span>
          </div>

          {/* Down Button */}
          <div
            className={`console-btn down ${
              gameContext.countdownRunning ? "disabled-area" : ""
            }`}
            onMouseDown={(e) => handleStart("right", "down")}
            onTouchStart={(e) => handleStart("right", "down")}
            onMouseUp={() => handleEnd("right")}
            onMouseLeave={() => handleEnd("right")}
            onTouchEnd={() => handleEnd("right")}
            onContextMenu={(e) => e.preventDefault()}
            aria-disabled={gameContext.countdownRunning}
          >
            <span className="arrow">▲</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameConsole;
