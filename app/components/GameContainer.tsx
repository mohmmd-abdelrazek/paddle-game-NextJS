import { forwardRef } from "react";

type GameProps = {
  children: React.ReactNode;
};

const GameContainer = forwardRef<HTMLDivElement, GameProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute h-[calc(98%-60px)] w-full overflow-hidden rounded-lg bg-[#e8f15c] outline-4 outline-slate-800"
      >
        {children}
      </div>
    );
  },
);
GameContainer.displayName = "GameContainer";

export default GameContainer;
