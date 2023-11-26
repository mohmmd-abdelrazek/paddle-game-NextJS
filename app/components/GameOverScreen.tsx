type GameOverScreenProps = {
    onRestart: () => void;
    onCancel: () => void;
    gameStatus: string;

  };

  export default function GameOverScreen({ onRestart, onCancel, gameStatus} : GameOverScreenProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-1/3 bg-white text-stone-600 text-xl font-bold rounded-lg hidden flex-col justify-center items-center" 
    style={{display: gameStatus !== "gameover" && gameStatus !== "win" ? 'none' : 'flex'}}>
      <h1 className="game-over__text" style={{color: gameStatus === "win" ? "green" : "black"}}>{gameStatus === "gameover" ? "Game Over" : "You Won!"}</h1>
      <div className="flex gap-5 mt-5">
        <button className="button" onClick={onRestart}>Restart</button>
        <button className="button" onClick={onCancel}>Cancel</button>
      </div>
    </div>  )
}

