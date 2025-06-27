import { useEffect, useContext } from "react";
import GameContext from "../../../store/gameContext";
import gameConfig from "../../../logic/gameConfig";

function ScoreBoard() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (gameContext.leftPlayerScore >= gameConfig.GAME.WINNING_SCORE)
      gameContext.handleEndGame("left");
    if (gameContext.rightPlayerScore >= gameConfig.GAME.WINNING_SCORE)
      gameContext.handleEndGame("right");
    // eslint-disable-next-line
  }, [gameContext.leftPlayerScore, gameContext.rightPlayerScore]);

  return (
    <div className="scoreboard-container">
      {/* Left Player */}
      <div className="player">
        <div className="player-name">{gameContext.leftPlayerName}</div>
        <div className="player-score">{gameContext.leftPlayerScore}</div>
      </div>

      {/* Divider */}
      <div className="divider">VS</div>

      {/* Right Player */}
      <div className="player">
        <div className="player-name">{gameContext.rightPlayerName}</div>
        <div className="player-score">{gameContext.rightPlayerScore}</div>
      </div>
    </div>
  );
}

export default ScoreBoard;
