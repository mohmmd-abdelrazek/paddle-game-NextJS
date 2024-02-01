import { forwardRef } from "react";

type BoardProps = { level: number; boardX: number };

const Board = forwardRef<HTMLDivElement, BoardProps>(
  ({ level, boardX }, ref) => {
    return (
      <div
        ref={ref}
        id="board"
        className="absolute bottom-5 h-5 rounded-xl"
        style={{ width: `calc(25% - ${level} * 3px)`, left: `${boardX}px` }}
      ></div>
    );
  },
);
Board.displayName = "Board";
export default Board;
