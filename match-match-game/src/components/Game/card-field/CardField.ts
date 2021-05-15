import Helper from '../../common/Helper';
import Card from '../card/Card';
import s from './card-field.scss';

class CardField {
  element: HTMLElement;
  cards: Card[];
  images: string[];
  currentCard: null | Card;
  isAnimated: boolean;

  constructor(images: string[]) {
    this.element = Helper.createElement('section', s.cardField);
    this.cards = [];
    this.images = images;
    this.currentCard = null;
    this.isAnimated = false;

    this.fillCards();
    this.shuffle();
    this.addCards();
  }

  clickCardHandler = (card: any) => {
    if (this.currentCard) {
      if (this.currentCard.element.dataset.id === card.element.dataset.id) {

      }else {
        this.currentCard.flip(false);
        card.flip(false);
      }
      this.currentCard = null;
    } else {
      this.currentCard = card;
    }
  }

  makeInteractive() {
    this.cards.forEach((card) => {
      card.onclick = () => {
        if (!this.isAnimated) {

          this.isAnimated = true; 
          window.setTimeout(()=> {this.isAnimated = false}, 200);

          card.flip().then(()=> {
            this.clickCardHandler(card); 
          });
        }
      };
    });
  }

  flipAll(isFlipped: boolean = true) {
    this.cards.forEach(card => card.flip(isFlipped));
  }

  private fillCards(): void {
    for (let i = 0; i < this.images.length; i++) {
      this.cards.push(new Card(this.images[i], i), new Card(this.images[i], i));
    }
  }

  private shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  private addCards(): void {
    this.cards.forEach((card) => {
      this.element.appendChild(card.element);
    });
  }
}

export default CardField;
