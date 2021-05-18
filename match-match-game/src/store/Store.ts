import { IGameResult, IUser } from "../typing/interfaces";

interface IScoreEntry {
  user:  null | IUser;
  score: number;
}

interface IState {
  user: null | IUser
  score: null | number
  bestScores: IScoreEntry[]
  gameSettings: {
    difficult: string
  }
}


class Store {
  private state: IState
  constructor(state?: IState) {

   this.state = {
    user: null,
    score: null,
    bestScores: [],
    gameSettings: {
      difficult: '3x4'
    }
   }

   if (state) {
    this.state = state;
   }

  }

  saveUser(user: IUser): void {
    this.state = {
      ...this.state,
      user
    }
    console.log('Store',this.state);
  }

  isUserRegister(): boolean {
    return !!this.state.user;
  }

  saveResult(result: IGameResult): void {
   const score = ((6 - result.mistakes) * 100) - (result.time * 10);
   this.state.score = score;

   const scoreBestEntry: IScoreEntry = {user: this.state.user, score: this.state.score};
   this.state.bestScores?.push(scoreBestEntry);
   console.log('Store',this.state);
  }

  getBestScore() {
    return new Promise<any>((resolve, reject) => {
      const sortedBestScore = this.state.bestScores.sort((a, b) => b.score - a.score);
      resolve(sortedBestScore);
    }) 
  }
}

export default Store;