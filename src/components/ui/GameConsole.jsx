import { useRef, useContext } from "react";
import { movePaddle, stopPaddle } from "../../game/gameLoop";
import GameContext from "../../store/gameContext";

function GameConsole() {
  const intervalId = useRef(null);
  const gameContext = useContext(GameContext);

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
    <div className="flex justify-between w-full">
      <div className="console-container">
        {/* Up Button */}
        <div
          className="console-btn up"
          onMouseDown={() => handleStart("left", "up")}
          onTouchStart={() => handleStart("left", "up")}
          onMouseUp={() => handleEnd("left")}
          onMouseLeave={() => handleEnd("left")}
          onTouchEnd={() => handleEnd("left")}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="arrow">▲</span>
        </div>

        {/* Down Button */}
        <div
          className="console-btn down"
          onMouseDown={(e) => handleStart("left", "down")}
          onTouchStart={(e) => handleStart("left", "down")}
          onMouseUp={() => handleEnd("left")}
          onMouseLeave={() => handleEnd("left")}
          onTouchEnd={() => handleEnd("left")}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="arrow">▲</span>
        </div>
      </div>

      {gameContext.gameType === "u/vs/u" && (
        <div className="console-container">
          {/* Up Button */}
          <div
            className="console-btn up"
            onMouseDown={(e) => handleStart("right", "up")}
            onTouchStart={(e) => handleStart("right", "up")}
            onMouseUp={() => handleEnd("right")}
            onMouseLeave={() => handleEnd("right")}
            onTouchEnd={() => handleEnd("right")}
            onContextMenu={(e) => e.preventDefault()}
          >
            <span className="arrow">▲</span>
          </div>

          {/* Down Button */}
          <div
            className="console-btn down"
            onMouseDown={(e) => handleStart("right", "down")}
            onTouchStart={(e) => handleStart("right", "down")}
            onMouseUp={() => handleEnd("right")}
            onMouseLeave={() => handleEnd("right")}
            onTouchEnd={() => handleEnd("right")}
            onContextMenu={(e) => e.preventDefault()}
          >
            <span className="arrow">▲</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameConsole;
