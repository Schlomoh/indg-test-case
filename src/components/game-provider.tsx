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
   * Increases the move count by the given number of pieces removed.
   * @param piecesRemoved The number of pieces to remove.
   * @param index The index of the piece to remove.
   */
  const increaseMoveCount = useCallback(
    (piecesRemoved: number, index?: number) => {
      if (winner || piecesRemoved < 1 || piecesRemoved > 3) return;

      // Remove the specified number of pieces.
      setPieces((prevPieces) => {
        const newPieces =
          index !== undefined
            ? [...prevPieces]
            : prevPieces.slice(0, prevPieces.length - piecesRemoved);

        if (index !== undefined) {
          newPieces.splice(index, 1);
        }

        return newPieces;
      });

      setMoveCount((prevCount) => {
        const newCount = prevCount + piecesRemoved;
        if (newCount >= 3 && index !== undefined) {
          finishTurn();
          return 0;
        } else {
          return newCount;
        }
      });
    },
    [winner, finishTurn]
  );

  /**
   * Effect that checks for a winner whenever the pieces array changes.
   */
  useEffect(() => {
    if (winner) return;
    // Check if the current player has to remove the last piece.
    if ((pieces.length <= 1 && moveCount === 0) || pieces.length === 0) {
      // The current player will have to remove the last piece and thus loses.
      setWinner(turn === 1 ? 2 : 1);
    }
  }, [pieces.length, turn, winner, moveCount]);

  /**
   * Calculates the optimal move for the computer player in single-player mode.
   * @param piecesRemaining The number of pieces remaining.
   * @returns The number of pieces to remove.
   */
  const calculateOptimalMove = useCallback(
    (piecesRemaining: number): number => {
      let itemsTaken: number;
      if ((piecesRemaining - 1) % 4 === 0) {
        // Computer is in a losing position; cannot avoid losing
        // Take 1 item to prolong the game
        itemsTaken = 1;
      } else {
        // Computer takes enough to make (remainingItems % 4 === 1) for the player
        itemsTaken = piecesRemaining % 4;

        if (itemsTaken === piecesRemaining) {
          // Computer is in a winning position; take all items - 1
          itemsTaken = piecesRemaining - 1;
        } else if (itemsTaken === 0 || itemsTaken > 3) {
          itemsTaken = 3;
        }
      }

      console.log(
        `Total items: ${piecesRemaining}`,
        `Items taken: ${itemsTaken}`
      );
      return itemsTaken;
    },
    []
  );

  /**
   * Effect that simulates the computer's move in single-player mode.
   */
  useEffect(() => {
    // Only act if the game is in single-player mode, it's player 2's turn, and there's no winner.
    if (gameMode !== "single" || turn !== 2 || winner) return;

    // Simulate a delay for the computer's move
    const computerMoveDelay = setTimeout(() => {
      const piecesToRemove = calculateOptimalMove(pieces.length);
      increaseMoveCount(piecesToRemove);
      finishTurn(); // AI always finishes turn after one move
    }, 500);

    return () => clearTimeout(computerMoveDelay);
  }, [
    gameMode,
    turn,
    winner,
    pieces.length,
    increaseMoveCount,
    calculateOptimalMove,
    finishTurn,
  ]);

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
