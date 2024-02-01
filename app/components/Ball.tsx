import { forwardRef } from "react";

type BallProps = { ballX: number; ballY: number };

const Ball = forwardRef<HTMLDivElement, BallProps>(({ ballX, ballY }, ref) => {
  return (
    <div
      ref={ref}
      id="ball"
      className="absolute bottom-10 h-5 w-5 rounded-full border-2 border-solid border-white bg-[#860303]"
      style={{ left: `${ballX}px`, top: `${ballY}px` }}
    ></div>
  );
});
Ball.displayName = "Ball";

export default Ball;
