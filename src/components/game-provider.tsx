import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
} from "react";
import useGetInitialPositions from "@/lib/use-get-initial-positions";
import { Vector3 } from "three";

/**
 * Constants defining the initial game parameters.
 */
const PIECE_AMOUNT = 20;
const FIELD_SIZE = 10;
const PIECE_SIZE = 1;

/**
 * Defines the possible game modes.
 */
type GameMode = "single" | "multi" | null;

/**
 * Interface for the game context value.
 */
interface GameContextValue {
  pieces: Vector3[];
  setPieces: React.Dispatch<React.SetStateAction<Vector3[]>>;
  increaseMoveCount: (piecesRemoved: number, index?: number) => void;
  moveCount: number;
  finishTurn: () => void;
  turn: 1 | 2;
  winner: number | null;
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  initialValues: {
    pieceAmount: number;
    fieldSize: number;
    pieceSize: number;
  };
}

/**
 * Creates the GameContext with an undefined default value.
 */
export const GameContext = createContext<GameContextValue>(
  {} as ReturnType<typeof useGame>
);

/**
 * Custom hook that manages the game logic and state.
 * @returns The current game state and actions.
 */
const useGame = (): GameContextValue => {
  // Generate initial positions for the pieces.
  const initialPositions = useGetInitialPositions(
    FIELD_SIZE,
    PIECE_AMOUNT,
    PIECE_SIZE
  );

  // State variables for the game.
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [pieces, setPieces] = useState<Vector3[]>(initialPositions);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [winner, setWinner] = useState<number | null>(null);

  /**
   * Toggles the turn between player 1 and player 2.
   */
  const toggleTurn = useCallback(() => {
    setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
  }, []);

  /**
   * Ends the current turn and resets the move count.
   */
  const finishTurn = useCallback(() => {
    setMoveCount(0);
    toggleTurn();
  }, [toggleTurn]);

  /**
   * Increases the move count for the current turn.
   * Removes the specified number of pieces from the game.
   * If the maximum moves are reached, it automatically finishes the turn.
   * @param piecesRemoved - The number of pieces to remove (1-3).
   */
  const increaseMoveCount = useCallback(
    (piecesRemoved: number, index?: number) => {
      if (winner || piecesRemoved < 1 || piecesRemoved > 3) return;

      // Remove the specified number of pieces.
      setPieces((prevPieces) => {
        const newPieces = index
          ? [...prevPieces]
          : prevPieces.slice(0, prevPieces.length - piecesRemoved);

        if (index !== undefined) {
          newPieces.splice(index, 1);
        }

        return newPieces;
      });

      setMoveCount((prevCount) => {
        const newCount = prevCount + piecesRemoved;

        // Automatically finish the turn if maximum moves are reached.
        if (newCount >= 3) {
          finishTurn();
        }

        return newCount;
      });
    },
    [winner, finishTurn]
  );

  /**
   * Effect that checks for a winner whenever the pieces array changes.
   */
  useEffect(() => {
    if (pieces.length <= 0 && !winner) {
      // The last player who made a move loses.
      const losingPlayer = turn === 1 ? 2 : 1;
      setWinner(losingPlayer);
    }
  }, [pieces.length, turn, winner]);

  /**
   * Effect that simulates the computer's turn in single-player mode.
   */
  useEffect(() => {
    // Only act if the game is in single-player mode, it's player 2's turn, and there's no winner.
    if (gameMode !== "single" || turn !== 2 || winner) return;

    // Simulate a delay for the computer's move (optional).
    const computerMoveDelay = setTimeout(() => {
      // Determine how many pieces the computer should remove.
      const piecesRemaining = pieces.length;
      let piecesToRemove = piecesRemaining % 4;

      // If modulo 4 is 0, pick a random number between 1 and 3.
      if (piecesToRemove === 0 || piecesToRemove > 3) {
        piecesToRemove = Math.floor(Math.random() * 3) + 1;
      }

      // Ensure we don't remove more pieces than are available.
      piecesToRemove = Math.min(piecesToRemove, 3, piecesRemaining);

      // Increase move count and remove pieces.
      increaseMoveCount(piecesToRemove);

      // Finish the turn if maximum moves are reached or if pieces are depleted.
      finishTurn();
    }, 500); // 500ms delay for realism

    return () => clearTimeout(computerMoveDelay);
  }, [gameMode, turn, winner, pieces.length, increaseMoveCount, finishTurn]);

  return {
    pieces,
    setPieces,
    increaseMoveCount,
    moveCount,
    finishTurn,
    turn,
    winner,
    gameMode,
    setGameMode,
    initialValues: {
      pieceAmount: PIECE_AMOUNT,
      fieldSize: FIELD_SIZE,
      pieceSize: PIECE_SIZE,
    },
  };
};

/**
 * Provides the GameContext to its children.
 * @param children - The components that will consume the GameContext.
 */
const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const gameState = useGame();

  return (
    <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
