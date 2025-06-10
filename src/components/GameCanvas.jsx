import { useRef } from "react";
import { useEffect } from "react";
import { startGame } from "../game/gameLoop";

function GameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = Math.min(window.innerWidth * 0.9, 2160);
      canvas.height = Math.min(window.innerHeight * 0.6, 1180);

      // reset the game
    };
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", () => resizeCanvas()); // Handle window resize
    return () =>
      window.removeEventListener("resize", () => resizeCanvas(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const cleanup = startGame(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <div className="flex flex-col items-center gap-1r">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="w-full border-2 border-white rounded-lg"
      />
    </div>
  );
}

export default GameCanvas;
