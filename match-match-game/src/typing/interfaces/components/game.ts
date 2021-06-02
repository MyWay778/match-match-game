import IBaseComponent from './base-component';

interface IGame extends IBaseComponent {
  container: HTMLElement;
  initGame(difficulty: string, categories: string): Promise<void>;
  startGame(): void;
  stopGame(mistakeCounter: number): void;
}
export default IGame;
