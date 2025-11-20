export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type GridCell = {
  type: TetrominoType | null;
  locked: boolean;
};

export type Grid = GridCell[][];

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
}

export interface PlayerState {
  pos: { x: number; y: number };
  tetromino: Tetromino;
  collided: boolean;
}

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}