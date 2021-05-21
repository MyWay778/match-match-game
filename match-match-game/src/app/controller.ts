// eslint-disable-next-line import/no-cycle
import { renderPosition } from '../app';
import {
  IGameConnector,
  IHeadConnector,
  IRegistrationConnector,
  IScoreConnector,
  ISubscriber,
  IGameResult,
  IUser,
  IScoreEntry,
} from '../typing/interfaces';
import RenderManager from './render-manager';
import Store from './store';
import Header from '../components/header/header';
import Game from '../components/game/game';
import Score from '../components/score/score';

interface IConnector {
  router: ISubscriber;
  header: IHeadConnector;
  registration: IRegistrationConnector;
  game: IGameConnector;
  score: IScoreConnector;
}

class Controller {
  connector: IConnector;
  header: Header | null = null;
  game: Game | null = null;
  score: Score | null = null;

  constructor(
    private readonly renderManager: RenderManager,
    private readonly store: Store
  ) {
    this.connector = {
      router: {
        update: this.updateRoute,
      },
      header: {
        openRegister: this.openRegister,
        connect: this.connectHeader,
      },
      registration: {
        closeHandler: this.closeRegistration,
        registerUser: this.registerUser,
      },
      game: {
        gameEndHandler: this.gameEndHandler,
        connect: this.connectGame,
      },
      score: {
        getData: this.getBestScore,
        connect: this.connectScore,
      },
    };
  }

  connectHeader = (header: Header): void => {
    this.header = header;
  };

  connectGame = (game: Game): void => {
    this.game = game;
  };

  connectScore = (score: Score): void => {
    this.score = score;
  };

  private openRegister = () => {
    this.renderManager.createComponent('registration');
    this.renderManager.connectComponent(
      'registration',
      this.connector.registration
    );
    this.renderManager.addComponent('registration', renderPosition.aside);
  };

  updateRoute = (newRoute: string): void => {
    if (newRoute === 'about') {
      this.renderManager.placeComponent('about', renderPosition.main);
      this.header?.makeActiveLink(0);

    } else if (newRoute === 'game') {
      this.renderManager.createComponent('game');
      this.renderManager.connectComponent('game', this.connector.game);
      this.renderManager.placeComponent('game', renderPosition.main);
      this.game?.initGame();

    } else if (newRoute === 'score') {
      this.renderManager.createComponent('score');
      this.renderManager.connectComponent('score', this.connector.score);
      this.renderManager.placeComponent('score', renderPosition.main);
      this.header?.makeActiveLink(1);
      this.store.getBestScore().then((result) => {
        this.score?.setData(result);
      });
    }
  };

  closeRegistration = (): void => {
    this.renderManager.removeComponent('registration');
  };

  registerUser = (newUser: IUser): void => {
    this.renderManager.removeComponent('registration');
    this.store.saveUser(newUser);
    this.header?.registerUser({ userImage: null });
  };

  gameEndHandler = (result: IGameResult): void => {
    this.store.saveResult(result);
  };

  getBestScore = (): Promise<IScoreEntry[]> => this.store.getBestScore();
}

export default Controller;
