import { useEffect, useContext } from "react";
import GameContext from "../../../store/gameContext";

function GameCanvas() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    const mainCanvas = gameContext.mainCanvasRef.current;
    const resizeCanvas = () => {
      mainCanvas.width = Math.min(window.innerWidth * 0.9, 2160);
      mainCanvas.height = Math.min(window.innerHeight * 0.6, 1180);

      // reset the game
    };
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", () => resizeCanvas()); // Handle window resize
    return () =>
      window.removeEventListener("resize", () => resizeCanvas(false));
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      id="main-canvas"
      ref={gameContext.mainCanvasRef}
      className="w-full border-2 border-white rounded-lg"
    />
  );
}

export default GameCanvas;
