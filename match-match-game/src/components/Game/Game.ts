import Helper from "../common/Helper";
import CardField from "./card-field/CardField";

class Game {
  element: HTMLElement;
  container: HTMLElement;
  cardField: CardField | null;

  constructor() {
    this.element = Helper.createElement('main', 'game');
    this.container = Helper.createElement('div', 'container');

    this.element.appendChild(this.container);
    this.cardField = null;

    this.startGame();
  }

  async startGame() {
    const response = await (await fetch('./assets/images/card-images.json')).json();
    this.cardField = new CardField(response.animal);
    
    this.container.appendChild(this.cardField.element);
  }
}

export default Game;