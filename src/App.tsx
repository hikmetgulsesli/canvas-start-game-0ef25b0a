import { useEffect, useState } from "react";
import {
  ProdCanvasStartGameProvider,
  useProdCanvasStartGame,
} from "./features/prod-canvas-start-game/prod-canvas-start-game.store";
import { GameRuntime } from "./game/game-runtime";
import { PlayCanvasCanvasStartGame } from "./screens/PlayCanvasCanvasStartGame";
import { installTestBridge } from "./test/bridge";

function PlayRoute() {
  const { state, startGame } = useProdCanvasStartGame();
  const gameMessage = state.applicationState === "playing" ? "Game started" : "";

  return (
    <main
      data-setfarm-root="baseline"
      data-testid="setfarm-app-root"
      className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"
    >
      <PlayCanvasCanvasStartGame
        actions={{ "start-1": startGame }}
        gameMessage={gameMessage}
        highScore={state.highScore}
      />
    </main>
  );
}

export default function App() {
  const [runtime] = useState(() => new GameRuntime());

  useEffect(() => installTestBridge(runtime), [runtime]);

  return (
    <ProdCanvasStartGameProvider runtime={runtime}>
      <PlayRoute />
    </ProdCanvasStartGameProvider>
  );
}
