type GameOverScreenProps = {
  onRestart: () => void;
  onCancel: () => void;
  gameStatus: string;
};

export default function GameOverScreen({
  onRestart,
  onCancel,
  gameStatus,
}: GameOverScreenProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 hidden h-1/3 w-3/5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-white text-xl font-bold text-stone-600"
      style={{
        display:
          gameStatus !== "gameover" && gameStatus !== "win" ? "none" : "flex",
      }}
    >
      <h1
        className="game-over__text"
        style={{ color: gameStatus === "win" ? "green" : "black" }}
      >
        {gameStatus === "gameover" ? "Game Over" : "You Won!"}
      </h1>
      <div className="mt-5 flex gap-5">
        <button className="button" onClick={onRestart}>
          Restart
        </button>
        <button className="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
