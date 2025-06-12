import HeaderImage from "../../images/header.png";
import GameForm from "./commons/GameForm";
import GameInstructions from "./commons/GameInstructions";

function StartModal() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-10">
      <div className="flex flex-col gap-5 bg-white p-6 rounded-lg text-center scroll-bar">
        <img src={HeaderImage} alt="PongX" className="w-full img-fit" />

        {/* Game Form and Control */}
        <GameForm expanded={true} startText="Start" />

        {/* Game Instructions */}
        <GameInstructions expanded={true} />
      </div>
    </div>
  );
}

export default StartModal;
