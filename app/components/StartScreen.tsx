type startPropes = {
  onStart: () => void,
  gameStatus: string;
}

export default function StartScreen({ onStart, gameStatus } : startPropes) {
  return (
    <div id="start-page" 
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-2/6 bg-white text-black flex justify-center items-center" 
    style={{display: gameStatus !== "start" ? 'none' : 'flex'}}>
      <button className="button" onClick={onStart}>Start</button>
    </div>
  )
}