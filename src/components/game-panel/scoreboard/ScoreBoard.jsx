import { useEffect, useContext } from "react";
import GameContext from "../../../store/gameContext";
import constants from "../../../store/constants";

function ScoreBoard() {
  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (gameContext.leftPlayerScore >= constants.WINNING_SCORE)
      gameContext.setLeftPlayerWinner();
    if (gameContext.rightPlayerScore >= constants.WINNING_SCORE)
      gameContext.setRightPlayerWinner();
    // eslint-disable-next-line
  }, [gameContext.leftPlayerScore, gameContext.rightPlayerScore]);

  return (
    <div className="flex items-center justify-between w-full h-16">
      <div className="font-score text-white pl-4">
        {gameContext.leftPlayerScore}
      </div>
      <div className="font-score text-white pr-4">
        {gameContext.rightPlayerScore}
      </div>
    </div>
  );
}

export default ScoreBoard;
