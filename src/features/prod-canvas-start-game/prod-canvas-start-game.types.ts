export const ACT_START_GAME = "ACT_START_GAME" as const;

export type ApplicationState = "ready" | "playing";
export type HighScore = number | null;

export interface ProdCanvasStartGameState {
  applicationState: ApplicationState;
  highScore: HighScore;
}

export interface StartGameActionResult {
  actionRef: typeof ACT_START_GAME;
  state: ProdCanvasStartGameState;
}
