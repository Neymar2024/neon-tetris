import React, { useEffect, useRef } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import Board from './components/Board';
import NextPiece from './components/NextPiece';
import Stats from './components/Stats';
import Controls from './components/Controls';
import { GameStatus } from './types';

const App: React.FC = () => {
  const {
    grid,
    activePiece,
    nextPiece,
    gameStatus,
    score,
    rowsCleared,
    level,
    startGame,
    pauseGame,
    move,
    drop,
    hardDrop,
    playerRotate,
  } = useGameLogic();

  const boardRef = useRef<HTMLDivElement>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== GameStatus.PLAYING) return;

      // Prevent default scrolling for game keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
      else if (e.key === 'ArrowDown') drop();
      else if (e.key === 'ArrowUp') playerRotate();
      else if (e.key === ' ') hardDrop();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStatus, move, drop, playerRotate, hardDrop]);

  // Focus management
  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.focus();
    }
  }, []);

  return (
    <div 
      className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black flex flex-col items-center justify-center p-4"
      tabIndex={0}
      ref={boardRef}
      style={{ outline: 'none' }}
    >
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-display italic tracking-tighter neon-text drop-shadow-lg">
          NEON TETRIS
        </h1>
        <p className="text-slate-400 text-sm mt-2 font-light tracking-widest uppercase">React • TypeScript • Tailwind</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-start justify-center">
        
        {/* Left Panel (Stats - Desktop) */}
        <div className="hidden md:flex flex-col gap-4 w-48 order-2 md:order-1">
           <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
              <h2 className="text-slate-300 text-xs uppercase mb-2 font-bold">Controls</h2>
              <ul className="text-slate-400 text-xs space-y-1 font-mono">
                <li>← / → : Move</li>
                <li>↑ : Rotate</li>
                <li>↓ : Soft Drop</li>
                <li>Space : Hard Drop</li>
              </ul>
           </div>
        </div>

        {/* Main Board Area */}
        <div className="relative order-1 md:order-2">
          <Board grid={grid} activePiece={activePiece} />
          
          {/* Overlays */}
          {gameStatus === GameStatus.MENU && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
              <button 
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.5)] font-display"
              >
                START GAME
              </button>
            </div>
          )}

          {gameStatus === GameStatus.GAME_OVER && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-10">
              <h2 className="text-4xl font-bold text-red-500 mb-4 font-display neon-text">GAME OVER</h2>
              <p className="text-white mb-8 text-lg">Score: {score}</p>
              <button 
                onClick={startGame}
                className="px-8 py-3 bg-white/10 border border-white/30 rounded-full text-white font-bold hover:bg-white/20 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {gameStatus === GameStatus.PAUSED && (
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
              <h2 className="text-3xl font-bold text-yellow-400 font-display tracking-widest">PAUSED</h2>
            </div>
          )}
        </div>

        {/* Right Panel (Stats & Next) */}
        <div className="flex flex-col gap-4 w-full md:w-48 order-3">
          <NextPiece tetromino={nextPiece} />
          <Stats score={score} level={level} lines={rowsCleared} />
          
          <button 
            onClick={gameStatus === GameStatus.MENU ? startGame : pauseGame}
            className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-lg ${
                gameStatus === GameStatus.PLAYING 
                ? 'bg-yellow-600/80 text-yellow-100 hover:bg-yellow-500' 
                : 'bg-emerald-600/80 text-emerald-100 hover:bg-emerald-500'
            }`}
          >
            {gameStatus === GameStatus.PLAYING ? 'Pause' : gameStatus === GameStatus.PAUSED ? 'Resume' : 'Start'}
          </button>
        </div>

      </div>

      {/* Mobile Controls */}
      <Controls 
        onMove={(dir) => gameStatus === GameStatus.PLAYING && move(dir)} 
        onRotate={() => gameStatus === GameStatus.PLAYING && playerRotate()} 
        onDrop={() => gameStatus === GameStatus.PLAYING && drop()} 
        onHardDrop={() => gameStatus === GameStatus.PLAYING && hardDrop()}
      />

    </div>
  );
};

export default App;