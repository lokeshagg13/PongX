import { useContext, useEffect } from "react";
import SimulatorContext from "../../store/simulatorContext";

function SimulatorCanvas() {
  const simulatorContext = useContext(SimulatorContext);

  useEffect(() => {
    const simulatorCanvas = simulatorContext.simulatorCanvasRef.current;
    const resizeCanvas = () => {
      simulatorCanvas.width = Math.min(window.innerWidth * 0.9, 2160);
      simulatorCanvas.height = Math.min(window.innerHeight * 0.6, 1180);
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
        id="simulator-canvas"
        ref={simulatorContext.simulatorCanvasRef}
        className="game-canvas"
      />
    </div>
  );
}

export default SimulatorCanvas;
