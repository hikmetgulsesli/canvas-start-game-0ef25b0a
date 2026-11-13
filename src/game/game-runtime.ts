import { ProdCanvasStartGameRepo } from "../features/prod-canvas-start-game/prod-canvas-start-game.repo";
import {
  ACT_START_GAME,
  type ProdCanvasStartGameState,
  type StartGameActionResult,
} from "../features/prod-canvas-start-game/prod-canvas-start-game.types";
import { actStartGame } from "../features/surf-play-canvas/act_start_game";

type RuntimeListener = () => void;

export class GameRuntime {
  private state: ProdCanvasStartGameState;
  private readonly listeners = new Set<RuntimeListener>();

  constructor(readonly repository: ProdCanvasStartGameRepo = new ProdCanvasStartGameRepo()) {
    this.state = {
      applicationState: "ready",
      highScore: repository.readHighScore(),
    };
  }

  readonly getSnapshot = (): ProdCanvasStartGameState => this.state;

  readonly subscribe = (listener: RuntimeListener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  readonly startGame = (): StartGameActionResult => {
    const result = actStartGame(this.state, this.repository);
    this.state = result.state;
    this.listeners.forEach((listener) => listener());
    return result;
  };

  readonly invokeAction = (actionRef: string): StartGameActionResult => {
    if (actionRef !== ACT_START_GAME) {
      throw new RangeError(`UNSUPPORTED_ACTION:${actionRef}`);
    }
    return this.startGame();
  };
}
