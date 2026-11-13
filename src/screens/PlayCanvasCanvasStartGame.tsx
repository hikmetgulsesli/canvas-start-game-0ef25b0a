// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Play canvas - Canvas Start Game
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Preserve the generated action-input state and exact payload transport
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state


export type PlayCanvasCanvasStartGameActionId = "start-1";

export interface PlayCanvasCanvasStartGameProps {
  actions?: {
    "start-1"?: () => void;
  };
  gameMessage?: string;
  highScore?: number | null;
}

export type PlayCanvasCanvasStartGameActionCallbacks = NonNullable<PlayCanvasCanvasStartGameProps["actions"]>;

export function PlayCanvasCanvasStartGame({ actions, gameMessage = "", highScore = null }: PlayCanvasCanvasStartGameProps) {
  const highScoreValue = highScore === null ? "" : String(highScore);

  return (
    <>
      <div data-surface-id="SURF_PLAY_CANVAS" className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center" data-setfarm-element-ref="E000001" data-observable-refs="OBS_START_GAME_PLAY_ROUTE_STABILITY">
          {/* Header / Branding chrome (non-actionable) */}
          <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-5 mb-6">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 rounded-sm bg-sky-400 rotate-45"></div>
              <span className="text-xl font-bold tracking-wider text-slate-100 uppercase">Canvas Game</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium">Route:</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 text-sky-400 font-mono text-xs font-semibold">/play</span>
              </div>
            </div>
          </div>
      
          {/* Status & Score Bar */}
          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Game Status</span>
              <div className="min-h-[1.5rem] text-sm font-medium text-emerald-400 flex items-center" data-setfarm-element-ref="E000002" role="status" aria-label="Game message" data-observable-refs="OBS_START_GAME_GAME_STARTED_MESSAGE">{gameMessage}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Record</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-sm text-slate-400">High Score:</span>
                <div className="text-lg font-bold text-sky-400 font-mono min-h-[1.5rem] flex items-center" data-setfarm-element-ref="E000003" role="status" aria-label="High score" data-observable-refs="OBS_START_GAME_HIGH_SCORE_VALUE" data-value={highScoreValue}>{highScoreValue}</div>
              </div>
            </div>
          </div>
      
          {/* Playfield / Canvas Area */}
          <div className="w-full aspect-[16/9] bg-slate-950 border border-slate-800 rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-8 mb-6 shadow-inner">
            {/* Grid backdrop styling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
      
            {/* Playfield Decorative Center Display */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4 text-sky-400 shadow-lg shadow-sky-500/10">
                <div className="w-8 h-8 rounded-lg bg-sky-400/20 border border-sky-400 flex items-center justify-center">
                  <div className="w-3 h-3 bg-sky-400 rounded-sm"></div>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">Ready to begin your session. Press Start to initiate the game canvas.</p>
            </div>
          </div>
      
          {/* Control Area */}
          <div className="w-full flex items-center justify-center pt-2">
            <button type="button" data-action="ACT_START_GAME" data-control-slot="CSLOT_START_GAME_START_BUTTON" className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 transition-colors duration-150 transform active:scale-95 text-base tracking-wide flex items-center justify-center cursor-pointer" data-setfarm-element-ref="E000004" data-observable-refs="OBS_START_GAME_START_BUTTON_AVAILABILITY" data-action-id="start-1" onClick={actions?.["start-1"]}>
              Start
            </button>
          </div>
        </div>
    </>
  );
}
