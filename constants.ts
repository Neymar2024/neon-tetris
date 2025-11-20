import { TetrominoType } from './types';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINOES: Record<string, { shape: number[][]; color: string }> = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    color: '6, 182, 212', // Cyan-500
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    color: '59, 130, 246', // Blue-500
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    color: '249, 115, 22', // Orange-500
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '234, 179, 8', // Yellow-500
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '34, 197, 94', // Green-500
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    color: '168, 85, 247', // Purple-500
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '239, 68, 68', // Red-500
  },
};

export const SCORES = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  BACK_TO_BACK_TETRIS: 1200,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};

// Basic empty grid generator
export const createStage = () =>
  Array.from(Array(BOARD_HEIGHT), () =>
    new Array(BOARD_WIDTH).fill({ type: null, locked: false })
  );

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)] as TetrominoType;
  return { type: randTetromino, shape: TETROMINOES[randTetromino].shape };
};