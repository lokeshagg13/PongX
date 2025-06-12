import { useRef, useContext } from "react";
import { movePaddle } from "../../game/gameLoop";
import GameContext from "../../store/gameContext";

function GameConsole() {
  const intervalId = useRef(null);
  const gameContext = useContext(GameContext);

  const handleStart = (e, whichPaddle, direction) => {
    e.preventDefault();
    movePaddle(whichPaddle, direction); // Immediate movement
    intervalId.current = setInterval(
      () => movePaddle(whichPaddle, direction),
      50
    ); // Continuous movement
  };

  const handleEnd = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="console-container">
        {/* Up Button */}
        <div
          className="console-btn up"
          onMouseDown={(e) => handleStart(e, "left", "up")}
          onTouchStart={(e) => handleStart(e, "left", "up")}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchEnd={handleEnd}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span className="arrow">▲</span>
        </div>

        {/* Down Button */}
        <div
          className="console-btn down"
          onMouseDown={(e) => handleStart(e, "left", "down")}
          onTouchStart={(e) => handleStart(e, "left", "down")}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchEnd={handleEnd}
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
            onMouseDown={(e) => handleStart(e, "right", "up")}
            onTouchStart={(e) => handleStart(e, "right", "up")}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchEnd={handleEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <span className="arrow">▲</span>
          </div>

          {/* Down Button */}
          <div
            className="console-btn down"
            onMouseDown={(e) => handleStart(e, "right", "down")}
            onTouchStart={(e) => handleStart(e, "right", "down")}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchEnd={handleEnd}
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
