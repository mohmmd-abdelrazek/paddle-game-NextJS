type HeaderProps = {
  score: number;
  level: number;
  onPause: () => void;
  gameStatus: string;
};

export default function Header({
  score,
  level,
  onPause,
  gameStatus,
}: HeaderProps) {
  return (
    <div
      id="header"
      className="flex h-16 items-center justify-between px-6 py-3 text-lg font-semibold text-[#860303]"
    >
      <div>
        Score: <span className="text-2xl font-extrabold">{score}</span>
      </div>
      <div>
        Level: <span className="text-2xl font-extrabold">{level}</span>
      </div>
      <button
        className="invisible h-[40px] w-[50px] pb-0 pt-0"
        onClick={onPause}
        style={{
          visibility:
            gameStatus === "running" || gameStatus === "paused"
              ? "visible"
              : "hidden",
        }}
      >
        {gameStatus === "running" ? "||" : "▶"}
      </button>
    </div>
  );
}
