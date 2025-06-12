import { useContext } from "react";

import ScoreBoard from "./scoreboard/ScoreBoard";
import GameCanvas from "./game-canvas/GameCanvas";
import GameConsole from "../ui/GameConsole";
import GameContext from "../../store/gameContext";

function GamePanel() {
  const gameContext = useContext(GameContext);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Scores */}
      <ScoreBoard />

      {/* Canvas */}
      <GameCanvas />

      {/* Gaming Console */}
      {gameContext.gameType !== "b/vs/b" && <GameConsole />}

      {/* Manual Override Button */}
      {/* <div className="flex w-full justify-end">
        <button
          type="button"
          className="bg-green-600 text-white rounded px-4 py-2"
          onClick={() => {
            setManualOverride((prev) => !prev);
            toggleManualOverride();
          }}
        >
          Manual Override
        </button>
      </div> */}
    </div>
  );
}

export default GamePanel;
