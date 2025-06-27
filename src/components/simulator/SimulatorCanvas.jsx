import { useContext, useEffect } from "react";
import gameConfig from "../../logic/gameConfig";
import SimulatorContext from "../../store/simulatorContext";

const { RES_WIDTH_PERC, RES_HEIGHT_PERC, MAX_RES_WIDTH, MAX_RES_HEIGHT } =
  gameConfig.GAME_CANVAS;

function SimulatorCanvas() {
  const simulatorContext = useContext(SimulatorContext);

  useEffect(() => {
    const simulatorCanvas = simulatorContext.simulatorCanvasRef.current;
    simulatorCanvas.width = Math.min(
      window.innerWidth * RES_WIDTH_PERC,
      MAX_RES_WIDTH
    );
    simulatorCanvas.height = Math.min(
      window.innerHeight * RES_HEIGHT_PERC,
      MAX_RES_HEIGHT
    );
  }, [simulatorContext.simulatorCanvasRef]);

  return (
    <div className="canvas-wrapper">
      <canvas
        id="simulatorCanvas"
        ref={simulatorContext.simulatorCanvasRef}
        className="game-canvas"
      />
    </div>
  );
}

export default SimulatorCanvas;
