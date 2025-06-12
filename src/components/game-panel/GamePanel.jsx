import ScoreBoard from "./scoreboard/ScoreBoard";
import GameCanvas from "./game-canvas/GameCanvas";
import GameConsole from "../ui/GameConsole";

function GamePanel() {
  return (
    <div className="flex flex-col items-center gap-10">
      {/* Scores */}
      <ScoreBoard />

      {/* Canvas */}
      <GameCanvas />

      {/* Gaming Console */}
      <GameConsole />
    </div>
  );
}

export default GamePanel;
