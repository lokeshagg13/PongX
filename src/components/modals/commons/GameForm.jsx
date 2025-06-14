import { useEffect, useContext, useState } from "react";
import GameContext from "../../../store/gameContext";
import constants from "../../../store/constants";
import DropdownIcon from "../../ui/DropdownIcon";
import SimulatorContext from "../../../store/simulatorContext";

function GameForm({ type = "start", expanded = false }) {
  const gameContext = useContext(GameContext);
  const simulatorContext = useContext(SimulatorContext);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [gameType, setGameType] = useState(gameContext.gameType);
  const [leftPlayer, setLeftPlayer] = useState(gameContext.leftPlayerName);
  const [rightPlayer, setRightPlayer] = useState(gameContext.rightPlayerName);
  const [errors, setErrors] = useState({
    leftPlayerError: false,
    rightPlayerError: false,
  });

  useEffect(() => {
    let leftTimeout, rightTimeout;
    if (errors.leftPlayerError) {
      leftTimeout = setTimeout(
        () => setErrors((prev) => ({ ...prev, leftPlayerError: false })),
        3000
      );
    }
    if (errors.rightPlayerError) {
      rightTimeout = setTimeout(
        () => setErrors((prev) => ({ ...prev, rightPlayerError: false })),
        3000
      );
    }

    return () => {
      if (leftTimeout) clearTimeout(leftTimeout);
      if (rightTimeout) clearTimeout(rightTimeout);
    };
  }, [errors]);

  const setInputError = (key) => {
    setErrors((prev) => ({ ...prev, [key]: true }));
  };

  const handleInputChange = (value, setPlayer, errorKey) => {
    if (
      value === "" ||
      (value.length <= 10 && /^[a-zA-Z0-9\s]*$/gm.test(value))
    ) {
      if (errors[errorKey])
        setErrors((prev) => ({ ...prev, [errorKey]: false }));
      setPlayer(value);
    }
  };

  const handleStart = () => {
    if (leftPlayer.trim() && rightPlayer.trim()) {
      gameContext.handleStartGame(
        leftPlayer.trim(),
        rightPlayer.trim(),
        gameType
      );
    } else {
      if (!leftPlayer.trim()) {
        setInputError("leftPlayerError");
      }
      if (!rightPlayer.trim()) {
        setInputError("rightPlayerError");
      }
    }
  };

  return (
    <>
      {/* Game Information */}
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center justify-center gap-10">
          <h2 className="text-xl font-bold">
            {type === "start" ? "Game Information" : "Review Game Info"}
          </h2>
          <button onClick={() => setIsExpanded((prev) => !prev)}>
            <DropdownIcon className={isExpanded ? "rotate-180" : "rotate-0"} />
          </button>
        </div>
        {isExpanded && (
          <div className={`${isExpanded ? "fade-in w-full" : ""}`}>
            <div className="flex items-center w-full justify-between mt-4">
              <label
                htmlFor="gameType"
                className="w-full text-md text-left font-bold"
              >
                Game Type
              </label>
              <select
                id="gameType"
                name="gameType"
                className="bg-gray-800 text-white text-center text-last-center border border-gray-600 rounded px-3 py-1 w-full text-md h-8"
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
              >
                {constants.GAME_TYPES.map((type) => (
                  <option value={type} key={type}>
                    {type === "u/vs/b"
                      ? "User v/s Bot"
                      : type === "u/vs/u"
                      ? "User v/s User"
                      : "Bot v/s Bot"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-3 w-full mt-2">
              <div className="flex items-center w-full justify-between">
                <label
                  htmlFor="leftPlayer"
                  className="w-full text-md text-left font-bold"
                >
                  Left Player
                </label>
                <input
                  id="leftPlayer"
                  name="leftPlayer"
                  type="text"
                  maxLength="10"
                  placeholder="Left Player Name"
                  className={`border rounded p-2 w-full text-md h-8 text-center ${
                    errors.leftPlayerError
                      ? "shake border-2 border-red-600"
                      : ""
                  }`}
                  value={leftPlayer}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      setLeftPlayer,
                      "leftPlayerError"
                    )
                  }
                />
              </div>
              <div className="flex items-center w-full justify-between">
                <label
                  htmlFor="rightPlayer"
                  className="w-full text-md text-left font-bold"
                >
                  Right Player
                </label>
                <input
                  id="rightPlayer"
                  name="rightPlayer"
                  type="text"
                  maxLength="10"
                  placeholder="Right Player Name"
                  className={`border rounded p-2 w-full text-md h-8 text-center ${
                    errors.rightPlayerError
                      ? "shake border-2 border-red-600"
                      : ""
                  }`}
                  value={rightPlayer}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      setRightPlayer,
                      "rightPlayerError"
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Controls */}
      <div className="game-form flex justify-between items-center w-full mt-8 gap-8">
        {type === "start" && (
          <button
            className="control-btn enter-simulator-btn"
            onClick={() => simulatorContext.openSimulator()}
          >
            Enter Simulator
          </button>
        )}
        <button className="control-btn start-game-btn" onClick={handleStart}>
          {type === "start" ? "Start Game" : "Restart Game"}
        </button>
        {type === "restart" && (
          <button
            className="control-btn quit-btn"
            onClick={() => gameContext.handleInterruptGame()}
          >
            Quit Game
          </button>
        )}
      </div>
    </>
  );
}

export default GameForm;
