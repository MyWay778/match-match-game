import renderPosition from '../constants/render-position';
import IRenderManager from '../typing/interfaces/app/renderManager';
import IStore from '../typing/interfaces/app/store';
import IGame from '../typing/interfaces/components/game';
import IHeader from '../typing/interfaces/components/header';
import IScore from '../typing/interfaces/components/score';
import ISettings from '../typing/interfaces/components/settings';
import IConnectors from '../typing/interfaces/connectors/connectors';
import IGameResult from '../typing/interfaces/game-result';
import IScoreData from '../typing/interfaces/score-data';
import ISettingsValue from '../typing/interfaces/settings-value';
import IUser from '../typing/interfaces/user';
import IUserDB from '../typing/interfaces/user-db';
import TCategories from '../typing/types/categories';
import TConnectors from '../typing/types/connectors';
import TDifficulty from '../typing/types/difficulty';

class Controller {
  connector: IConnectors;
  header: IHeader | null = null;
  game: IGame | null = null;
  score: IScore | null = null;
  settings: ISettings | null = null;

  constructor(
    private readonly renderManager: IRenderManager,
    private readonly store: IStore
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

  connectHeader = (header: IHeader): void => {
    this.header = header;
  };

  connectGame = (game: IGame): void => {
    this.game = game;
  };

  connectScore = (score: IScore): void => {
    this.score = score;
  };

  connectSettings = (settings: ISettings): void => {
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
      this.header?.setIsGame(false);
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
      this.game?.initGame(settings.difficulty, settings.categories);
      this.header?.setIsGame(true);
    } else if (newRoute === 'score') {
      this.header?.setIsGame(false);
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
      this.header?.setIsGame(false);
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
    this.header?.registerUser({
      userImage: newUser.image
        ? window.URL.createObjectURL(newUser.image)
        : null,
    });
  };

  gameEndHandler = (result: IGameResult): void => {
    this.store.saveResult(result);
  };

  getBestScore = async (): Promise<IScoreData[]> => {
    const bestScores = await this.store.getBestScore();
    const convertedBestScores = bestScores.map<IUserDB>((score) => {
      if (score.image) {
        score.image = URL.createObjectURL(score.image);
      }
      return score;
    });

    return convertedBestScores as IScoreData[];
  };

  setCardCategory = (cardCategory: TCategories): void => {
    this.store.setCardCategory(cardCategory);
  };

  setGameDifficulty = (difficulty: TDifficulty): void => {
    this.store.setGameDifficulty(difficulty);
  };

  getSettings = (): ISettingsValue => this.store.getSettings();
}

export default Controller;
