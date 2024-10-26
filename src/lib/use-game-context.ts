import { useContext } from "react";
import { GameContext } from "@/components";

const useGameContext = () => {
  return useContext(GameContext);
};

export default useGameContext;
