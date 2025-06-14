import { useEffect, useContext } from "react";
import GameContext from "../../../store/gameContext";

function GameCanvas() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    const gameCanvas = gameContext.gameCanvasRef.current;
    const resizeCanvas = () => {
      gameCanvas.width = Math.min(window.innerWidth * 0.9, 2160);
      gameCanvas.height = Math.min(window.innerHeight * 0.6, 1180);

      // reset the game
    };
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", () => resizeCanvas()); // Handle window resize
    return () =>
      window.removeEventListener("resize", () => resizeCanvas(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="canvas-wrapper">
      <canvas
        id="main-canvas"
        ref={gameContext.gameCanvasRef}
        className="game-canvas"
      />
    </div>
  );
}

export default GameCanvas;
