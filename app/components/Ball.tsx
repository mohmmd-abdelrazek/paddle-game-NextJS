import { forwardRef } from "react"

type BallProps = {ballX: number, ballY: number}

const Ball = forwardRef<HTMLDivElement, BallProps>(({ ballX, ballY }, ref) => {
  return (
    <div ref={ref} id="ball" className="absolute w-5 h-5 rounded-full border-solid border-2 border-white bg-[#860303] bottom-10" style={{ left: `${ballX}px`, top: `${ballY}px` }}></div>
  )
});
Ball.displayName = "Ball";

export default Ball