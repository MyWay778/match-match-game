import { IGameConnector, IGameResult } from './../../typing/interfaces';
import Helper from "../common/Helper";
import CardField from "./card-field/CardField";
import GameModal from "./game-modal/GameModal";
import s from './game.scss';
import Timer from "./timer/Timer";

class Game {
  element: HTMLElement;
  container: HTMLElement;
  cardField: CardField | null;
  timer: Timer;
  gameModal: null | GameModal;

  constructor(private readonly connector: IGameConnector) {
    console.log(connector)
    this.element = Helper.createElement('main', s.game);
    this.container = Helper.createElement('div', s.container);
    this.element.appendChild(this.container);
    this.cardField = null;
    this.timer = new Timer();
    this.container.appendChild(this.timer.element);
    this.gameModal = null;
  }

  async initGame(): Promise<void> {
    const response = await (await fetch('./assets/images/card-images.json')).json();
    this.cardField = new CardField(response.animal, this.stopGame);
    this.container.appendChild(this.cardField.element);

    const preparing = () => {
      if (this.cardField) {
        this.cardField.flipAll();
        this.timer.countdown(5, this.startGame);
      }
    }
    window.setTimeout(preparing ,1000) // ???
  }

  startGame = () => {
    this.cardField?.flipAll(false);
    this.timer.start();
    this.cardField?.addClickListeners();
  }

  stopGame = (mistakeCounter: number) => {
    const result: IGameResult = {
      mistakes: 0,
      time: 0
    };

    result.mistakes = mistakeCounter;
    result.time = this.timer.stop();

    //From controller!!!!
    const removeModal = () => {
      if (this.gameModal) {
        this.gameModal.element.remove();
        this.gameModal = null;
        window.location.hash = 'score';
      }
    }

    this.gameModal = new GameModal(result.time, result.mistakes, removeModal);

    const body = this.element.parentElement;
    if (body) {
      this.gameModal.setParent(body);
      this.gameModal.render();
    }

    this.connector.gameEndHandler(result);
  }
} 

export default Game;