import Helper from '../../common/helper';
import Card from '../card/card';
import s from './card-field.scss';

class CardField {
  element: HTMLElement;
  cards: Card[];
  images: string[];
  currentCard: null | Card;
  isMatching: boolean;
  mistakeCounter: number;
  matchedCardAmount: number;
  gameEndSubscriber: Function;

  constructor(images: string[], gameEndSubscriber: Function) {
    this.element = Helper.createElement('section', s.cardField);
    this.cards = [];
    this.images = images;
    this.currentCard = null;
    this.isMatching = false;
    this.mistakeCounter = 0;
    this.matchedCardAmount = 0;
    this.gameEndSubscriber = gameEndSubscriber;

    this.fillCards();
    this.shuffle();
    this.addCards();
  }

  clickCardHandler = (card: any) => {
    const { currentCard } = this;

    if (!currentCard) {
      return;
    }
    if (currentCard.element === card.element) {
      return;
    }

    if (currentCard.element.dataset.id === card.element.dataset.id) {
      Promise.all([currentCard.match(), card.match()]).then(() => {
        this.matchedCardAmount += 1;
        if (this.matchedCardAmount >= 6) {
          this.gameEndSubscriber(this.mistakeCounter);
        }
      });

      currentCard.disableOnclick();
      card.disableOnclick();
    } else {
      this.mistakeCounter += 1;
      currentCard
        .noMatch()
        .then(() =>
          currentCard.flip(false).then(() => currentCard.noMatch(false))
        );
      card
        .noMatch()
        .then(() => card.flip(false).then(() => card.noMatch(false)));
    }

    this.currentCard = null;
  };

  addClickListeners() {
    this.cards.forEach((card) => {
      card.onclick = () => {
        if (this.isMatching) {
          return;
        }

        if (!this.currentCard) {
          card.flip();
          this.currentCard = card;
        } else {
          if (this.currentCard.element === card.element) {
            return;
          }

          this.isMatching = true;
          card.flip().then(() => {
            this.clickCardHandler(card);
            this.isMatching = false;
          });
        }
      };
    });
  }

  flipAll(isFlipped = true) {
    this.cards.forEach((card) => card.flip(isFlipped));
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
