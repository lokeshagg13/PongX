import { useEffect, useContext } from "react";
import GameContext from "../../../store/gameContext";
import constants from "../../../store/constants";

function ScoreBoard() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (gameContext.leftPlayerScore >= constants.WINNING_SCORE)
      gameContext.handleEndGame("left");
    if (gameContext.rightPlayerScore >= constants.WINNING_SCORE)
      gameContext.handleEndGame("right");
    // eslint-disable-next-line
  }, [gameContext.leftPlayerScore, gameContext.rightPlayerScore]);

  return (
    <div className="flex items-center justify-between w-full h-24">
      <div className="flex flex-col items-center gap-5 pl-4">
        <div className="text-white text-2xl">{gameContext.leftPlayerName}</div>
        <div className="font-score text-white">
          {gameContext.leftPlayerScore}
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 pr-4">
        <div className="text-white text-2xl">{gameContext.rightPlayerName}</div>
        <div className="font-score text-white">
          {gameContext.rightPlayerScore}
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
