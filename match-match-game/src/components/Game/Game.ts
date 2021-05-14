import Helper from "../common/Helper";
import CardField from "./card-field/CardField";
import s from './game.scss';
import Timer from "./timer/Timer";

class Game {
  element: HTMLElement
  container: HTMLElement
  cardField: CardField | null
  timer: Timer

  constructor() {
    this.element = Helper.createElement('main', s.game);
    this.container = Helper.createElement('div', s.container);
    this.element.appendChild(this.container);

    this.cardField = null;
    
    this.timer = new Timer();
    this.container.appendChild(this.timer.element);

    this.startGame();
  }

  async startGame(): Promise<void> {
    const response = await (await fetch('./assets/images/card-images.json')).json();
    this.cardField = new CardField(response.animal);
    this.container.appendChild(this.cardField.element);
    // this.timer.start();
  }
}

export default Game;