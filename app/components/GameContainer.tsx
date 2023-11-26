import { forwardRef } from "react";
import React from "react";

type GameProps = {
  children: React.ReactNode
}

const GameContainer = forwardRef<HTMLDivElement, GameProps>(({ children }, ref ) => {
  
  return (
    <div ref={ref} className="absolute w-full outline-4 outline-slate-800 rounded-lg overflow-hidden bg-[#e8f15c] h-[calc(98%-60px)]">
      {children}
    </div>
  );
})
GameContainer.displayName = "GameContainer";

export default GameContainer