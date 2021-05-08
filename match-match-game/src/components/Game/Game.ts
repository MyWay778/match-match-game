import { container } from "webpack";
import Card from "./Card/Card";
import frontImage from "../../assets/images/front-card-image.jpg";
import backImage from "../../assets/images/back-card-image.png";

class Game {
    container: HTMLElement;
    cards: any;

    constructor(className: string) {
        this.container = document.createElement('div');
        this.container.classList.add(className);
    }

    addCards(cards: any) {
        this.cards = cards;
    }

    render() {
        this.container.appendChild(this.cards);
        return this.container;
    }
}

// const game = new Game('game');
// // const card = new Card(cardTemplate, frontImage, backImage);

// game.addCards(card);

// export default game;