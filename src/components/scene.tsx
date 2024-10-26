import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";

import useGameContext from "@/lib/use-game-context";
import { PlayingPieces } from "@/components";

const Scene = () => {
  const { gameMode } = useGameContext();
  return (
    gameMode && (
      <Canvas
        className="h-full w-full"
        camera={{ position: new Vector3(0, 15, 0), fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <PlayingPieces />
      </Canvas>
    )
  );
};

export default Scene;
