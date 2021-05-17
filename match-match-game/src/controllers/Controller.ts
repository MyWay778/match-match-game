import App from '../App';
import Store from '../store/Store';
import { IGameResult, IUser } from './../typing/interfaces';

class Controller {
  connector: unknown

  constructor(private readonly app: App, private readonly store: Store) {
    this.connector = {
      update: this.updateRoute,
      registration: {
        closeHandler: this.closeRegistration,
        registerUser: this.registerUser
      },
      game: {
        gameEndHandler: this.gameEndHandler
      },
      score: {
        getData: this.getBestScore
      } 
    };
  }
  
  updateRoute = (newRoute:string):void => {
    if (newRoute === 'about') {
      this.app.showAbout();

    } else if (newRoute === 'registration') {
      this.app.showRegistration();

    } else if (newRoute === 'game') {
      this.app.showGame();
    } else if (newRoute === 'score') {
      this.app.showScore();
    }
  }

  closeRegistration = ():void => {
    this.app.closeRegistration();
    window.location.hash = '#about';
  }

  registerUser = (newUser: IUser ):void => {
    this.closeRegistration();
    this.app.provideToHeaderNewUser({userImage: null});
    this.store.saveUser(newUser);
  }

  gameEndHandler = (result: IGameResult):void => {
    this.store.saveResult(result);
  }

  getBestScore = (): Promise<any> => {
    return this.store.getBestScore();
  }
}

export default Controller;