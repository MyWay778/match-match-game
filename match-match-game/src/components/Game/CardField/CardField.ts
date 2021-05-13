import s from './CardField.scss';
import GeneralComponent  from '../../common/GeneralComponent';
import Card from '../Card/Card';

class CardField  extends GeneralComponent {
  cards: Card[];

  constructor(images: string[]) {
    super('div');
    super.addClassName(s.cardField);
    this.cards = [];
    this._fillCards(images);
    this._shuffle();
    this.cards.forEach(card => {
      card.onclick = () => card.flip();
    })
  }

  _fillCards(images: string[]) {
    for (let i = 0; i < images.length; i++) {
      this.cards.push(new Card(images[i]), new Card(images[i]));
    }
  }

  _shuffle () {
    this.cards.sort(() => Math.random() - 0.5);
  }

  getElement() {
    this.cards.forEach(card => {
      this.element.appendChild(card.getElement());
    })
    return this.element;
  }
}

export default CardField;