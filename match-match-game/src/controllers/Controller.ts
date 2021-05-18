import { renderPosition } from './../App';
import { IGameConnector, IHeadConnector, IRegistrationConnector, IScoreConnector, ISubscriber } from '../typing/interfaces';
import RenderManager from '../app/RenderManager';
import Store from '../store/Store';
import { IGameResult, IUser } from './../typing/interfaces';
import Header from '../components/header/Header';
import Game from '../components/game/Game';
import Score from '../components/score/Score';


interface IConnector {
  router: ISubscriber,
  header: IHeadConnector,
  registration: IRegistrationConnector,
  game: IGameConnector,
  score: IScoreConnector
}

class Controller {
  connector: IConnector;
  header: Header | null = null;
  game: Game | null = null;
  score: Score | null = null;

  constructor(private readonly renderManager: RenderManager, private readonly store: Store) {

    this.connector = {
      router: {
        update: this.updateRoute,
      },
      header: {
        openRegister: this.openRegister,
        connect: this.connectHeader
      },
      registration: {
        closeHandler: this.closeRegistration,
        registerUser: this.registerUser
      },
      game: {
        gameEndHandler: this.gameEndHandler,
        connect: this.connectGame
      },
      score: {
        getData: this.getBestScore,
        connect: this.connectScore
      } 
    };
  }
  
  connectHeader = (header: Header) => {
    this.header = header;
  }

  connectGame = (game: Game) => {
    this.game = game
  }

  connectScore = (score: Score) => {
    this.score = score;
  }

  private openRegister = () => {
    this.renderManager.createComponent('registration');
    this.renderManager.connectComponent('registration', this.connector.registration);
    this.renderManager.addComponent('registration', renderPosition.aside);
  }
  updateRoute = (newRoute:string):void => {
    if (newRoute === 'about') {
      this.renderManager.placeComponent('about', renderPosition.main);
      this.header?.makeActiveLink(0);
    } 

    else if (newRoute === 'game') {
      console.log('game');
      this.renderManager.createComponent('game');
      this.renderManager.connectComponent('game', this.connector.game);
      this.renderManager.placeComponent('game', renderPosition.main);
      this.game?.initGame({size: '3x4'});
    }

    else if (newRoute === 'score') {
      this.renderManager.createComponent('score');
      this.renderManager.connectComponent('score', this.connector.score);
      this.renderManager.placeComponent('score', renderPosition.main);
      this.header?.makeActiveLink(1);
      this.store.getBestScore().then(result => {
        this.score?.setData(result);
      })
    }
  }

  closeRegistration = ():void => {
    this.renderManager.removeComponent('registration');
  }

  registerUser = (newUser: IUser ):void => {
    
    this.renderManager.removeComponent('registration');
    this.store.saveUser(newUser);
    this.header?.registerUser({userImage: null});
  }

  gameEndHandler = (result: IGameResult):void => {
    console.log(result);
    this.store.saveResult(result);

  }

  getBestScore = (): Promise<any> => {
    return this.store.getBestScore();
  }
}

export default Controller;