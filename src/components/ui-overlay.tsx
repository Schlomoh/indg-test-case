"use client";

import { useCallback } from "react";
import useGameContext from "@/lib/use-game-context";
import { Lollipop, Users, Move } from "lucide-react";
import StartScreen from "./StartScreen";

export default function UIOverlay() {
  const { turn, finishTurn, moveCount, pieces, winner, gameMode, setGameMode } =
    useGameContext();

  const handleFinishTurn = useCallback(() => {
    finishTurn();
  }, [finishTurn]);

  return gameMode ? (
    <div className="w-full h-full absolute top-0 left-0 pointer-events-none z-10">
      <div className="p-4 flex justify-between items-start">
        <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-4 shadow-lg max-w-sm pointer-events-auto">
          {winner && (
            <h1 className="text-2xl font-bold text-white mb-2 text-center font-candy">
              Player {winner} wins!
            </h1>
          )}
          <div className="bg-white bg-opacity-20 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="text-yellow-300" aria-hidden="true" />
                <span className="text-white font-semibold">Current player</span>
              </div>
              <span className="text-white font-bold text-xl">{turn}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Move className="text-blue-300" aria-hidden="true" />
                <span className="text-white font-semibold">Moves (max. 3)</span>
              </div>
              <span className="text-white font-bold text-xl">{moveCount}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Lollipop className="text-green-300" aria-hidden="true" />
                <span className="text-white font-semibold">
                  Candies remaining
                </span>
              </div>
              <span className="text-white font-bold text-xl">
                {pieces.length}
              </span>
            </div>
          </div>
        </div>
        {!winner && (
          <button
            disabled={moveCount === 0 || (gameMode === "single" && turn === 2)}
            onClick={handleFinishTurn}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out pointer-events-auto z-20"
            style={{ pointerEvents: "auto" }}
            aria-label="Finish Turn"
          >
            Finish Turn
          </button>
        )}
      </div>
    </div>
  ) : (
    <StartScreen onGameStart={setGameMode} />
  );
}
