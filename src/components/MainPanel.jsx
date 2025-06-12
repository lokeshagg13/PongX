import { useContext } from "react";

import GameContext from "../store/gameContext";
import GamePanel from "./game-panel/GamePanel";
import StartModal from "./modals/StartModal";
import WinnerModal from "./modals/WinnerModal";
import PausedModal from "./modals/PausedModal";
import { useEffect } from "react";

function MainPanel() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (gameContext.gameStatus === "running") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [gameContext.gameStatus]);

  return (
    <div>
      {/* Game Panel */}
      <GamePanel />

      {/* Start Modal */}
      {gameContext.gameStatus === null && <StartModal />}

      {/* Winner Modal */}
      {gameContext.gameStatus === "completed" && gameContext.winner && (
        <WinnerModal />
      )}

      {gameContext.gameStatus === "paused" && <PausedModal />}
    </div>
  );
}

export default MainPanel;
