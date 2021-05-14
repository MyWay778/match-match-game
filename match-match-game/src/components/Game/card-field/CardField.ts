import Helper from '../../common/Element';
import Card from '../card/Card';
import s from './card-field.scss';

class CardField {
  element: HTMLElement

  cards: Card[];

  images: string[];

  constructor(images: string[]) {
    this.element = Helper.createElement('section', s.cardField);
    this.cards = [];
    this.images = images;

    this.fillCards();
    this.shuffle();
    this.cards.forEach(card => {
      card.onclick = () => card.flip();
    })
    this.addCards();
  }

  fillCards() {
    for (let i = 0; i < this.images.length; i++) {
      this.cards.push(new Card(this.images[i]), new Card(this.images[i]));
    }
  }

  shuffle () {
    this.cards.sort(() => Math.random() - 0.5);
  }

  addCards() {
    this.cards.forEach(card => {
      this.element.appendChild(card.element);
    })
  }
}

export default CardField;