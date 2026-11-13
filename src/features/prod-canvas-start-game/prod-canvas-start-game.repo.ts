export const LOCAL_HIGH_SCORE_STORAGE_KEY =
  "setfarm.canvas_start_game.local_high_score.v1" as const;

export interface HighScoreStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function browserStorage(): HighScoreStorage | undefined {
  try {
    return typeof globalThis.localStorage === "undefined"
      ? undefined
      : globalThis.localStorage;
  } catch {
    return undefined;
  }
}

function parseHighScore(value: string | null): number | null {
  if (value === null) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    const candidate =
      typeof parsed === "object" && parsed !== null && "high_score" in parsed
        ? (parsed as { high_score?: unknown }).high_score
        : parsed;
    return typeof candidate === "number" && Number.isFinite(candidate)
      ? candidate
      : null;
  } catch {
    return null;
  }
}

export class ProdCanvasStartGameRepo {
  constructor(private readonly storage: HighScoreStorage | undefined = browserStorage()) {}

  readHighScore(): number | null {
    try {
      return parseHighScore(this.storage?.getItem(LOCAL_HIGH_SCORE_STORAGE_KEY) ?? null);
    } catch {
      return null;
    }
  }

  writeHighScore(highScore: number): void {
    if (!Number.isFinite(highScore)) {
      throw new TypeError("HIGH_SCORE_MUST_BE_FINITE");
    }
    this.storage?.setItem(LOCAL_HIGH_SCORE_STORAGE_KEY, JSON.stringify(highScore));
  }
}
