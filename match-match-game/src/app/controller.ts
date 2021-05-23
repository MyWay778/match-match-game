import { TDifficulty } from '../typing/types';
// eslint-disable-next-line import/no-cycle
import { renderPosition } from '../app';
import {
  IGameResult,
  IUser,
  IUserDB,
  IConnectors,
  TConnectors,
  ISettings,
} from '../typing/interfaces';
import RenderManager from './render-manager';
import Store from './store';
import Header from '../components/header/header';
import Game from '../components/game/game';
import Score from '../components/score/score';
import Settings from '../components/settings/settings';

class Controller {
  connector: IConnectors;
  header: Header | null = null;
  game: Game | null = null;
  score: Score | null = null;
  settings: Settings | null = null;

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
      settings: {
        setCardCategory: this.setCardCategory,
        setGameDifficulty: this.setGameDifficulty,
        connect: this.connectSettings,
      },
    };

    this.renderManager.connectComponent(
      'header',
      this.connector.header as TConnectors
    );
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

  connectSettings = (settings: Settings): void => {
    this.settings = settings;
  };

  private openRegister = () => {
    this.renderManager.createComponent('registration');
    this.renderManager.connectComponent(
      'registration',
      this.connector.registration as TConnectors
    );
    this.renderManager.addComponent('registration', renderPosition.aside);
  };

  updateRoute = (newRoute: string): void => {
    if (newRoute === 'about') {
      this.renderManager.placeComponent('about', renderPosition.main);
      this.header?.makeActiveLink(0);
    } else if (newRoute === 'game') {
      this.renderManager.createComponent('game');
      this.renderManager.connectComponent(
        'game',
        this.connector.game as TConnectors
      );
      this.renderManager.placeComponent('game', renderPosition.main);
      const settings = this.store.getSettings();
      this.game?.initGame(settings.difficulty);
    } else if (newRoute === 'score') {
      this.renderManager.createComponent('score');
      this.renderManager.connectComponent(
        'score',
        this.connector.score as TConnectors
      );
      this.renderManager.placeComponent('score', renderPosition.main);
      this.header?.makeActiveLink(1);
      this.store.getBestScore().then((result) => {
        this.score?.setData(result);
      });
    } else if (newRoute === 'settings') {
      this.renderManager.createComponent('settings');
      this.renderManager.connectComponent(
        'settings',
        this.connector.settings as TConnectors
      );
      const settings = this.store.getSettings();
      this.settings?.setValues(settings);
      this.renderManager.placeComponent('settings', renderPosition.main);
      this.header?.makeActiveLink(2);
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

  getBestScore = (): Promise<IUserDB[]> => this.store.getBestScore();

  setCardCategory = (cardCategory: string): void => {
    console.log('Set category ', cardCategory);
  };

  setGameDifficulty = (difficulty: TDifficulty): void => {
    this.store.setGameDifficulty(difficulty);
  };

  getSettings = (): ISettings => this.store.getSettings();
}

export default Controller;
