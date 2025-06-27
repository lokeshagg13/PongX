import { useEffect, useContext } from "react";
import gameConfig from "../../../logic/gameConfig";
import GameContext from "../../../store/gameContext";

const { RES_WIDTH_PERC, RES_HEIGHT_PERC, MAX_RES_WIDTH, MAX_RES_HEIGHT } =
  gameConfig.GAME_CANVAS;

function GameCanvas() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    const gameCanvas = gameContext.gameCanvasRef.current;
    gameCanvas.width = Math.min(
      window.innerWidth * RES_WIDTH_PERC,
      MAX_RES_WIDTH
    );
    gameCanvas.height = Math.min(
      window.innerHeight * RES_HEIGHT_PERC,
      MAX_RES_HEIGHT
    );
  }, [gameContext.gameCanvasRef]);

  return (
    <div className="canvas-wrapper">
      <canvas
        id="gameCanvas"
        ref={gameContext.gameCanvasRef}
        className="game-canvas"
      />
    </div>
  );
}

export default GameCanvas;
