import React, { useState, useRef } from "react";
import { InstancedMesh } from "three";
import { Instances, Instance } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import useGameContext from "@/lib/use-game-context";

const PlayingPieces: React.FC = () => {
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const meshRef = useRef<InstancedMesh>(null);

  const { pieces, moveCount, increaseMoveCount, winner } = useGameContext();
  const { raycaster, mouse, camera } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    // Update the raycaster with the current mouse position
    raycaster.setFromCamera(mouse, camera);

    // Perform raycasting against the Instances mesh
    const intersects = raycaster.intersectObject(meshRef.current);

    if (intersects.length > 0) {
      // Get the instanceId of the closest intersected cube
      const instanceId = intersects[0].instanceId;
      if (
        instanceId !== null &&
        typeof instanceId !== "undefined" &&
        instanceId !== activePiece
      ) {
        setActivePiece(instanceId);
      }
    } else if (activePiece !== null) {
      // If no intersections and an activePiece is set, reset it
      setActivePiece(null);
    }
  });

  /**
   * Removes the piece from the board when clicked based on the given index.
   * @param index The index of the piece to remove.
   */
  function handlePieceClick(index: number) {
    if (winner) return;
    setActivePiece(null);

    if (moveCount < 3) increaseMoveCount(1, index);
  }

  return (
    <Instances ref={meshRef} limit={pieces.length}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />

      {pieces.map((position, index) => (
        <Instance
          key={index}
          position={position}
          color={index === activePiece ? "hotpink" : "darkgrey"}
          onClick={() => handlePieceClick(index)}
        />
      ))}
    </Instances>
  );
};

export default PlayingPieces;
