import { ProdCanvasStartGameRepo } from "../prod-canvas-start-game/prod-canvas-start-game.repo";
import {
  ACT_START_GAME,
  type ProdCanvasStartGameState,
  type StartGameActionResult,
} from "../prod-canvas-start-game/prod-canvas-start-game.types";

export function actStartGame(
  currentState: ProdCanvasStartGameState,
  repository: ProdCanvasStartGameRepo,
): StartGameActionResult {
  const state: ProdCanvasStartGameState = {
    ...currentState,
    applicationState: "playing",
    highScore: 0,
  };

  repository.writeHighScore(0);
  return { actionRef: ACT_START_GAME, state };
}

export const act_start_game = actStartGame;
