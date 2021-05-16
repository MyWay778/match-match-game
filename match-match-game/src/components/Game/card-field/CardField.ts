import Helper from '../../common/Helper';
import Card from '../card/Card';
import s from './card-field.scss';

class CardField {
  element: HTMLElement;
  cards: Card[];
  images: string[];
  currentCard: null | Card;
  isMatching: boolean;

  constructor(images: string[]) {
    this.element = Helper.createElement('section', s.cardField);
    this.cards = [];
    this.images = images;
    this.currentCard = null;
    this.isMatching = false;

    this.fillCards();
    this.shuffle();
    this.addCards();
  }

  clickCardHandler = (card: any) => {
    if (this.currentCard) {

      const {currentCard} = this;

      if (this.currentCard.element.dataset.id === card.element.dataset.id) {
        setTimeout(() => {

          currentCard.match();
          card.match();
          this.isMatching = false;

        },1000)
      }else {

          currentCard?.noMatch();
          card.noMatch();
          setInterval(()=> {
            currentCard.flip(false);
            card.flip(false);
            this.isMatching = false;
          },1000)
      }
      this.currentCard = null;
    } 
  }

  addClickListeners() {
    this.cards.forEach((card) => {
      card.onclick = () => {
        if (!this.isMatching) {

          card.flip()

          if (!this.currentCard) {
            this.currentCard = card;
          } else {
            this.isMatching = true;

            this.clickCardHandler(card);
          }
          
        }
      };
    });
  }

  flipAll(isFlipped = true) {
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
