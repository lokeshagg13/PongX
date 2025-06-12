import { useContext } from "react";
import GameContext from "../../store/gameContext";
import HeaderImage from "../../images/header.png";
import GameForm from "./commons/GameForm";
import GameInstructions from "./commons/GameInstructions";

function WinnerModal() {
  const gameContext = useContext(GameContext);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-10">
      <div className="flex flex-col gap-5 bg-white p-6 rounded-lg text-center scroll-bar">
        <img src={HeaderImage} alt="PongX" className="w-full img-fit" />

        <h2 className="text-4xl font-bold mt-4">{gameContext.winner} Wins!</h2>

        {/* Game Instructions */}
        <GameInstructions expanded={false} />

        {/* Game Form and Control */}
        <GameForm expanded={false} startText="Restart" />
      </div>
    </div>
  );
}

export default WinnerModal;
