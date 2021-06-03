import TDifficulty from '../typing/types/difficulty';

type Dsd = {
  [key: string]: TDifficulty;
};

export const difficulty: Dsd = {
  '3x4': '6',
  '4x4': '8',
  '6x6': '18',
};
