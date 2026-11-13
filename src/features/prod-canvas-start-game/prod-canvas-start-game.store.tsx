import {
  createContext,
  useContext,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { GameRuntime } from "../../game/game-runtime";
import type {
  ProdCanvasStartGameState,
  StartGameActionResult,
} from "./prod-canvas-start-game.types";

const GameRuntimeContext = createContext<GameRuntime | null>(null);

export interface ProdCanvasStartGameProviderProps {
  children: ReactNode;
  runtime?: GameRuntime;
}

export function ProdCanvasStartGameProvider({
  children,
  runtime,
}: ProdCanvasStartGameProviderProps) {
  const localRuntime = useRef<GameRuntime | null>(null);
  if (!runtime && localRuntime.current === null) {
    localRuntime.current = new GameRuntime();
  }
  const activeRuntime = runtime ?? localRuntime.current;
  if (!activeRuntime) throw new Error("GAME_RUNTIME_UNAVAILABLE");

  return (
    <GameRuntimeContext.Provider value={activeRuntime}>
      {children}
    </GameRuntimeContext.Provider>
  );
}

export function useGameRuntime(): GameRuntime {
  const runtime = useContext(GameRuntimeContext);
  if (!runtime) {
    throw new Error("useGameRuntime must be used within ProdCanvasStartGameProvider");
  }
  return runtime;
}

export interface ProdCanvasStartGameStore {
  state: ProdCanvasStartGameState;
  startGame: () => StartGameActionResult;
}

export function useProdCanvasStartGame(): ProdCanvasStartGameStore {
  const runtime = useGameRuntime();
  const state = useSyncExternalStore(
    runtime.subscribe,
    runtime.getSnapshot,
    runtime.getSnapshot,
  );
  return { state, startGame: runtime.startGame };
}
