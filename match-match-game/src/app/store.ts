import { IGameResult, IScoreEntry, IState, IUser } from '../typing/interfaces';

class Store {
  private state: IState;
  constructor(state?: IState) {
    this.state = {
      user: null,
      score: null,
      bestScores: [],
      gameSettings: {
        difficult: '3x4',
      },
    };

    if (state) {
      this.state = state;
    }
  }

  saveUser(user: IUser): void {
    this.state = {
      ...this.state,
      user,
    };
  }

  isUserRegister(): boolean {
    return !!this.state.user;
  }

  saveResult(result: IGameResult): void {
    const score = (6 - result.mistakes) * 100 - result.time * 10;
    this.state.score = score;

    const scoreBestEntry: IScoreEntry = {
      user: this.state.user,
      score: this.state.score,
    };
    this.state.bestScores?.push(scoreBestEntry);
  }

  getBestScore(): Promise<IScoreEntry[]> {
    return new Promise<IScoreEntry[]>((resolve) => {
      const sortedBestScore = this.state.bestScores.sort(
        (a, b) => b.score - a.score
      );
      resolve(sortedBestScore);
    });
  }
}

export default Store;
