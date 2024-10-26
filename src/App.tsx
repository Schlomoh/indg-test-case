import { Scene, GameProvider, UIOverlay } from "@/components";
import "./tailwind.css";

function App() {
  return (
    <div className="h-screen w-screen">
      <GameProvider>
        <UIOverlay />
        <Scene />
      </GameProvider>
    </div>
  );
}

export default App;
