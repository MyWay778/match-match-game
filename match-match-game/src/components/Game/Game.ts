import Helper from '../common/helper';
import GameModal from './game-modal/game-modal';
import './game.scss';
import Timer from './timer/timer';
import ConnectorComponent from '../../shared/components/base-component/connector-component';
import CardField from './card-field/card-field';
import IGame from '../../typing/interfaces/components/game';
import IGameConnector from '../../typing/interfaces/connectors/game-connector';
import IGameResult from '../../typing/interfaces/game-result';
import { difficulty as gameDifficulty } from '../../constants/difficulty';

class Game extends ConnectorComponent<IGameConnector> implements IGame {
  container: HTMLElement;
  cardField?: CardField;
  timer: Timer;
  gameModal?: GameModal;
  connector?: IGameConnector;

  constructor(root: HTMLElement) {
    super('main', 'game', root);

    this.container = Helper.createElement('div', 'game__container');
    this.element.appendChild(this.container);
    this.timer = new Timer();
    this.container.appendChild(this.timer.element);
  }

  connect = (connector: IGameConnector): void => {
    this.connector = connector;
    this.connector.connect(this);
  };

  async initGame(difficulty: string, categories: string): Promise<void> {
    const response = await (
      await fetch('./assets/images/card-images.json')
    ).json();
    const imagesCategory = response[categories];
    this.cardField = new CardField(imagesCategory, difficulty, this.stopGame);
    this.container.appendChild(this.cardField.element);

    const preparing = () => {
      if (this.cardField) {
        this.cardField.flipAll();
        let countdown = 5;
        if (difficulty === gameDifficulty['4x4']) {
          countdown = 10;
        } else if (difficulty === gameDifficulty['6x6']) {
          countdown = 30;
        }
        this.timer.countdown(countdown, this.startGame);
      }
    };
    window.setTimeout(preparing, 1000);
  }

  startGame = (): void => {
    this.cardField?.flipAll(false);
    this.timer.start();
    this.cardField?.addClickListeners();
  };

  stopGame = (mistakeCounter: number): void => {
    const result: IGameResult = {
      mistakes: 0,
      time: 0,
    };

    result.mistakes = mistakeCounter;
    result.time = this.timer.stop();

    const removeModal = () => {
      if (this.gameModal) {
        this.gameModal.element.remove();
        this.gameModal = undefined;
        window.location.hash = 'score';
      }
    };

    this.gameModal = new GameModal(result.time, result.mistakes, removeModal);

    const body = this.element.parentElement;
    if (body) {
      this.gameModal.setParent(body);
      this.gameModal.render();
    }

    this.connector?.gameEndHandler(result);
  };
}

export default Game;
