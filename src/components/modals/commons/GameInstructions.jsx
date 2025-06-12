import { useState } from "react";
import DropdownIcon from "../../ui/DropdownIcon";

function GameInstructions({ expanded = false }) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center justify-center gap-10">
        <h2 className="text-xl font-bold">Key Controls</h2>
        <button onClick={() => setIsExpanded((prev) => !prev)}>
          <DropdownIcon className={isExpanded ? "rotate-180" : "rotate-0"} />
        </button>
      </div>
      {isExpanded && (
        <div
          className={`flex flex-wrap gap-1r mt-4 w-full key-adjust ${
            isExpanded ? "fade-in" : ""
          }`}
        >
          <div className="flex-box">
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-12 h-8 border rounded bg-gray-200 text-lg font-bold">
                  W
                </div>
                <div className="flex items-center justify-center w-12 h-8 border rounded bg-gray-200 text-lg font-bold">
                  S
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center h-8">Move Left Paddle Up</div>
                <div className="flex items-center h-8">
                  Move Left Paddle Down
                </div>
              </div>
            </div>
          </div>
          <div className="flex-box">
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-12 h-8 border rounded bg-gray-200 text-lg font-bold">
                  ▲
                </div>
                <div className="flex items-center justify-center w-12 h-8 border rounded bg-gray-200 text-lg font-bold">
                  ▼
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center h-8">
                  Move Right Paddle Up
                </div>
                <div className="flex items-center h-8">
                  Move Right Paddle Down
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default GameInstructions;
