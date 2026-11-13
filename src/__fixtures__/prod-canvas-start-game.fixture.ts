import { LOCAL_HIGH_SCORE_STORAGE_KEY } from "../features/prod-canvas-start-game/prod-canvas-start-game.repo";
import {
  ACT_START_GAME,
  type ProdCanvasStartGameState,
} from "../features/prod-canvas-start-game/prod-canvas-start-game.types";

export const prodCanvasStartGameFixture = {
  actionRef: ACT_START_GAME,
  controlSlotRef: "CSLOT_START_GAME_START_BUTTON",
  route: "/play",
  storageKey: LOCAL_HIGH_SCORE_STORAGE_KEY,
  initialState: {
    applicationState: "ready",
    highScore: null,
  } satisfies ProdCanvasStartGameState,
  startedState: {
    applicationState: "playing",
    highScore: 0,
  } satisfies ProdCanvasStartGameState,
  gameStartedMessage: "Game started",
} as const;

export default prodCanvasStartGameFixture;
