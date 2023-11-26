type HeaderProps = {
    score: number;
    level: number;
    onPause: () => void;
    gameStatus: string;
  };

  export default function Header({ score, level, onPause, gameStatus } : HeaderProps) {
  return (
    <div id="header" className="flex justify-between items-center py-3 px-6 h-16 text-lg font-semibold text-[#860303]">
      <div>Score: <span className="font-extrabold text-2xl">{score}</span></div>
      <div>Level: <span className="font-extrabold text-2xl">{level}</span></div>
      <button className="invisible w-[50px] h-[40px] pt-0 pb-0" onClick={onPause} style={{visibility: gameStatus === "running" || gameStatus === "paused" ? "visible" : "hidden"}}>{gameStatus === "running" ? "||" : "▶"}</button>
    </div>
  )
}