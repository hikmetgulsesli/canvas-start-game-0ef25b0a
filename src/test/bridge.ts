import { GameRuntime } from "../game/game-runtime";
import type {
  ApplicationState,
  HighScore,
  StartGameActionResult,
} from "../features/prod-canvas-start-game/prod-canvas-start-game.types";

export const SETFARM_TEST_BRIDGE_GLOBAL = "__SETFARM_TEST_BRIDGE__" as const;

export interface SetfarmBridgeStates {
  STATE_APPLICATION_STATE: ApplicationState;
  STATE_HIGH_SCORE: HighScore;
}

export interface SetfarmBridgeSnapshot {
  states: SetfarmBridgeStates;
}

export interface SetfarmActionInvocation {
  actionRef: string;
  input?: Record<string, never>;
}

export interface SetfarmTestBridge extends SetfarmBridgeSnapshot {
  getState(): SetfarmBridgeSnapshot;
  invokeAction(
    action: string | SetfarmActionInvocation,
    input?: Record<string, never>,
  ): StartGameActionResult;
}

function readSnapshot(runtime: GameRuntime): SetfarmBridgeSnapshot {
  const state = runtime.getSnapshot();
  return {
    states: {
      STATE_APPLICATION_STATE: state.applicationState,
      STATE_HIGH_SCORE: state.highScore,
    },
  };
}

function synchronizeBridge(runtime: GameRuntime, bridge: SetfarmTestBridge): void {
  const snapshot = readSnapshot(runtime);
  bridge.states.STATE_APPLICATION_STATE = snapshot.states.STATE_APPLICATION_STATE;
  bridge.states.STATE_HIGH_SCORE = snapshot.states.STATE_HIGH_SCORE;
}

export function createTestBridge(runtime: GameRuntime): SetfarmTestBridge {
  const bridge: SetfarmTestBridge = {
    states: {
      STATE_APPLICATION_STATE: "ready",
      STATE_HIGH_SCORE: null,
    },
    getState: () => readSnapshot(runtime),
    invokeAction: (action, _input) => {
      const actionRef = typeof action === "string" ? action : action.actionRef;
      const result = runtime.invokeAction(actionRef);
      synchronizeBridge(runtime, bridge);
      return result;
    },
  };
  synchronizeBridge(runtime, bridge);
  return bridge;
}

declare global {
  interface Window {
    __SETFARM_TEST_BRIDGE__?: SetfarmTestBridge;
  }
}

export function installTestBridge(runtime: GameRuntime): () => void {
  if (typeof window === "undefined") return () => undefined;

  const bridge = createTestBridge(runtime);
  const previousBridge = window.__SETFARM_TEST_BRIDGE__;
  window.__SETFARM_TEST_BRIDGE__ = bridge;
  const unsubscribe = runtime.subscribe(() => synchronizeBridge(runtime, bridge));

  return () => {
    unsubscribe();
    if (window.__SETFARM_TEST_BRIDGE__ !== bridge) return;
    if (previousBridge) {
      window.__SETFARM_TEST_BRIDGE__ = previousBridge;
    } else {
      delete window.__SETFARM_TEST_BRIDGE__;
    }
  };
}
