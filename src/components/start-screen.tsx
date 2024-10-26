import { useState } from "react";
import { Cpu, Users } from "lucide-react";

export default function StartScreen({
  onGameStart,
}: {
  onGameStart: (mode: "single" | "multi") => void;
}) {
  const [hoveredButton, setHoveredButton] = useState<
    "computer" | "multiplayer" | null
  >(null);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-white mb-8 text-center font-candy animate-bounce">
        Last one out loses
      </h1>
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Choose Your Game Mode
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => onGameStart("single")}
            onMouseEnter={() => setHoveredButton("computer")}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-purple-500"
            aria-label="Play against computer"
          >
            <div className="flex items-center justify-center">
              <Cpu className="mr-2" />
              <span>Play vs Computer</span>
            </div>
          </button>
          <button
            onClick={() => onGameStart("multi")}
            onMouseEnter={() => setHoveredButton("multiplayer")}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-purple-500"
            aria-label="Play local multiplayer"
          >
            <div className="flex items-center justify-center">
              <Users className="mr-2" />
              <span>Local Multiplayer</span>
            </div>
          </button>
        </div>
      </div>
      <div className="mt-8 text-white text-center h-8">
        {" "}
        {/* Fixed height */}
        {hoveredButton === "computer" && (
          <p className="animate-fade-in">
            Challenge our AI and test your skills!
          </p>
        )}
        {hoveredButton === "multiplayer" && (
          <p className="animate-fade-in">
            Play with a friend on the same device!
          </p>
        )}
      </div>
    </div>
  );
}
