import { useContext } from "react";

import GameContext from "../store/gameContext";
import GamePanel from "./game-panel/GamePanel";
import StartModal from "./modals/StartModal";
import WinnerModal from "./modals/WinnerModal";

function MainPanel() {
  const gameContext = useContext(GameContext);
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
    </div>
  );
}

export default MainPanel;
