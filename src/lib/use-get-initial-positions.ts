import { Vector3 } from "three";
import { useMemo } from "react";

function getRandomPosition(fieldSize: number, pieceSize: number) {
  return (
    Math.floor(Math.random() * (fieldSize / pieceSize)) * pieceSize -
    fieldSize / 2 +
    pieceSize / 2
  );
}

function useGetInitialPositions(
  fieldSize: number,
  pieceAmount: number,
  pieceSize: number
) {
  return useMemo(() => {
    const positions: Vector3[] = [];
    const positionSet = new Set<string>();

    while (positions.length < pieceAmount) {
      const x = getRandomPosition(fieldSize, pieceSize);
      const y = pieceSize / 2;
      const z = getRandomPosition(fieldSize, pieceSize);

      const key = `${x},${z}`;

      if (!positionSet.has(key)) {
        positionSet.add(key);
        positions.push(new Vector3(x, y, z));
      }
    }

    return positions;
  }, [fieldSize, pieceAmount, pieceSize]);
}

export default useGetInitialPositions;
