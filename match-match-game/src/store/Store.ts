import { IGameResult, IUser } from "../typing/interfaces";

interface IState {
  user: null | IUser
  score: null | number
  bestScores: null | []
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
    bestScores: null,
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

  saveResult(result: IGameResult): void {
   const score = ((6 - result.mistakes) * 100) - (result.time * 10);
   this.state.score = score;
   console.log('Store',this.state);
  }

  getBestScore() {
    return new Promise<any>((resolve, reject) => {
      resolve([{user: this.state.user, score: this.state.score}]);
    }) 
  }
}

export default Store;