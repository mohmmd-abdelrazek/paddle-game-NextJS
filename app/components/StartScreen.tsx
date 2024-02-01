type startPropes = {
  onStart: () => void;
  gameStatus: string;
};

export default function StartScreen({ onStart, gameStatus }: startPropes) {
  return (
    <div
      id="start-page"
      className="absolute left-1/2 top-1/2 flex h-2/6 w-3/5 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-white text-black"
      style={{ display: gameStatus !== "start" ? "none" : "flex" }}
    >
      <button className="button" onClick={onStart}>
        Start
      </button>
    </div>
  );
}
