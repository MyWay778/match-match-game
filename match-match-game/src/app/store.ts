import IStore from "../typing/interfaces/app/store";
import IGameResult from "../typing/interfaces/game-result";
import ISettingsValue from "../typing/interfaces/settings-value";
import IState from "../typing/interfaces/state";
import IUser from "../typing/interfaces/user";
import IUserDB from "../typing/interfaces/user-db";
import TCategories from "../typing/types/categories";
import TDifficulty from "../typing/types/difficulty";
import DBController from "./db-controller";

class Store implements IStore{
  dbController: DBController;

  private state: IState;
  constructor(state?: IState) {
    this.state = {
      name: null,
      email: null,
      score: null,
      bestScores: [],
      gameSettings: {
        difficulty: '6',
        categories: 'animals',
      },
    };

    if (state) {
      this.state = state;
    }

    this.dbController = new DBController();
  }

  saveUser(user: IUser): void {
    this.state = {
      ...this.state,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
  }

  private saveToDB(user: IUserDB): void {
    this.dbController.addPlayer(user);
  }

  isUserRegister(): boolean {
    return !!this.state.name;
  }

  saveResult(result: IGameResult): void {
    let score =
      (Number(this.state.gameSettings.difficulty) - result.mistakes) * 100 -
      result.time * 10;
    if (score < 0) {
      score = 0;
    }
    this.state.score = score;

    const scoreBestEntry: IUserDB = {
      name: this.state.name || 'noname',
      email: this.state.email || '',
      score: this.state.score,
    };
    this.state.bestScores?.push(scoreBestEntry);
    this.saveToDB(scoreBestEntry);
  }

  async getBestScore(): Promise<IUserDB[]> {
    const result = await this.dbController.getPlayersByScore();
    this.state.bestScores = result.sort((a, b) => b.score - a.score);
    return this.state.bestScores;
  }

  setGameDifficulty = (difficulty: TDifficulty): void => {
    this.state.gameSettings.difficulty = difficulty;
  };

  setCardCategory = (category: TCategories): void => {
    this.state.gameSettings.categories = category;
  };

  getSettings = (): ISettingsValue => this.state.gameSettings;
}

export default Store;
