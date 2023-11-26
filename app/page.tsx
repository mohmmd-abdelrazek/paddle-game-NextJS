"use client"

import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import GameContainer from './components/GameContainer';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import Board from './components/Board';
import Ball from './components/Ball';

export default function Game() {
  const [level, setLevel] = useState<number>(Number(1));
  const [score, setScore] = useState<number>(0);
  const [boardX, setBoardX] = useState(0);
  const [ballX, setBallX] = useState(0);
  const [ballY, setBallY] = useState(0);
  const [gameStatus, setGameStatus] = useState("start");

  const containerRef = useRef<HTMLDivElement | null >(null);
  const boardRef = useRef<HTMLDivElement | null >(null);
  const ballRef = useRef<HTMLDivElement | null >(null);

  const animationFrameId = useRef<number | null>();
  const ballSpeedX = useRef(10);
  const ballSpeedY = useRef(12);
  const isLeftArrowPressed = useRef(false);
  const isRightArrowPressed = useRef(false);
  const prevLevelRef = useRef<number | null>(null);

  
  if (prevLevelRef.current !== level) {
    const speedX = 10 + level;
    ballSpeedX.current = ballSpeedX.current > 0 ? speedX : -speedX;
    ballSpeedY.current = 12 + level;

    prevLevelRef.current = level;
  }

  const move = useCallback(() => {
    if (gameStatus !== "running") return;

    setBallX((bx)=> bx + ballSpeedX.current);
    setBallY((by)=> by - ballSpeedY.current);
    
    const boardSpeed = 15;
    const containerWidth = containerRef.current?.offsetWidth??0,
          containerHeight = containerRef.current?.offsetHeight??0, 
          boardLeft = boardRef.current?.offsetLeft??0, 
          boardWidth = boardRef.current?.offsetWidth??0, 
          boardTop = boardRef.current?.offsetTop??0, 
          ballTop = ballRef.current?.offsetTop??0, 
          ballLeft = ballRef.current?.offsetLeft??0, 
          ballHeight = ballRef.current?.offsetHeight??0, 
          ballWidth = ballRef.current?.offsetWidth??0

    if (isLeftArrowPressed.current && boardLeft > 0) {setBoardX((bx) => bx - boardSpeed);}
    if (isRightArrowPressed.current && boardLeft < containerWidth - boardWidth) {setBoardX((bx) => bx + boardSpeed);}
    
    if (ballTop <= 0) { ballSpeedY.current = -ballSpeedY.current; }
    if (ballLeft <= 0 || ballLeft >= containerWidth - 20) {ballSpeedX.current = -ballSpeedX.current;}
    
    const ballDistance = boardTop - ballHeight - ballTop;
    const boardCollision = boardLeft - ballWidth < ballLeft && boardLeft + boardWidth > ballLeft;

    if (ballDistance <= 0 && ballDistance >= -20  && boardCollision) {
          ballSpeedY.current = -ballSpeedY.current; 
          setScore((s) => s + 1);
        }
        
    if (ballTop + ballHeight >= containerHeight) {
      setGameStatus("gameover");
      setScore(0);

    }

    if (score === 5 && level < 10) {
      setLevel((l) => l + 1);
      setScore(0);
    }
    if (level === 10 && score === 5) {
      setGameStatus("win");
    }
    
    animationFrameId.current = requestAnimationFrame(move);

  },[gameStatus, level, score]);

  const startGame = useCallback(() => {
    const containerWidth = containerRef.current?.offsetWidth??0,
          containerHeight = containerRef.current?.offsetHeight??0,
          boardWidth = boardRef.current?.offsetWidth??0, 
          ballHeight = ballRef.current?.offsetHeight??0, 
          ballWidth = ballRef.current?.offsetWidth??0, 
          boardHeight = boardRef.current?.offsetHeight??0;

    setGameStatus("running");
    setBoardX((containerWidth - boardWidth) / 2);
    setBallX((containerWidth - ballWidth) / 2);
    setBallY(containerHeight - boardHeight - ballHeight - 25);
    setScore(0);
    ballSpeedY.current = 12 + level

    if (level === 10 && score === 5) {setLevel(1)}
  },[level, score]);

  const pauseGame = useCallback(() => {
    if (gameStatus === "paused") {
      setGameStatus("running")
    } else if (gameStatus === "running") {
      setGameStatus("paused");
    } else startGame();
  }, [gameStatus, startGame]);
  
  const cancelGame = useCallback(() => {
    setGameStatus("start");
    setLevel(1);
    setScore(0);
  }, []);

  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth??0, containerHeight = containerRef.current?.offsetHeight??0, boardWidth = boardRef.current?.offsetWidth??0, ballHeight = ballRef.current?.offsetHeight??0, ballWidth = ballRef.current?.offsetWidth??0, boardHeight = boardRef.current?.offsetHeight??0;

    setBoardX((containerWidth - boardWidth) / 2);
    setBallX((containerWidth - ballWidth) / 2);
    setBallY(containerHeight - boardHeight - ballHeight - 25);
  }, [])

  useEffect(() => {
    if (gameStatus === "running") {
      animationFrameId.current= requestAnimationFrame(move);
    } else {
      (animationFrameId.current) && cancelAnimationFrame(animationFrameId.current);

    }
    return () => {
      animationFrameId.current && cancelAnimationFrame(animationFrameId.current);
    }
  }, [gameStatus, move])

  useEffect(() => {
      const handleKey = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          isLeftArrowPressed.current = true;
              };
        if (event.key === "ArrowRight") {
          isRightArrowPressed.current = true;
              };
        if (event.key === " ") pauseGame();     
        if (event.key === "Escape" || event.key === "Esc") cancelGame();
      };
    
      const handleKeyRelease = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {isLeftArrowPressed.current = false};
        if (event.key === "ArrowRight") {isRightArrowPressed.current = false};
      };
    
      document.addEventListener("keydown", handleKey);
      document.addEventListener("keyup", handleKeyRelease);
    
      return () => {
        document.removeEventListener("keydown", handleKey);
        document.removeEventListener("keyup", handleKeyRelease);
      };
  }, [cancelGame, pauseGame]);
    
    return (
      <div id='container' className='relative h-full w-full md:w-4/5 bg-[#f0e39d]'>
        <Header score={score} level={level} onPause={pauseGame} gameStatus={gameStatus} />
        <GameContainer ref={containerRef}>
          <Board ref={boardRef} level={level} boardX={boardX} />
          <Ball ref={ballRef} ballX={ballX} ballY={ballY} />
        </GameContainer>
        <StartScreen onStart={startGame} gameStatus={gameStatus} />
        <GameOverScreen onRestart={startGame} onCancel={cancelGame} gameStatus={gameStatus} />
      </div>
    );
  };