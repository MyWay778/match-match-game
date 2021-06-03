import TCardSize from '../../../typing/types/card-size';
import Helper from '../../common/helper';
import Card from '../card/card';
import './card-field.scss';

class CardField {
  element: HTMLElement;
  cards: Card[];
  currentCard: null | Card;
  mistakeCounter: number;
  matchedCardAmount: number;
  gameEndSubscriber: (counter: number) => void;
  private readonly difficulty: number;

  constructor(
    private readonly images: string[],
    difficulty: string,
    gameEndSubscriber: (counter: number) => void
  ) {
    this.element = Helper.createElement('section', 'card-field');
    this.cards = [];
    this.currentCard = null;
    this.mistakeCounter = 0;
    this.matchedCardAmount = 0;
    this.gameEndSubscriber = gameEndSubscriber;
    this.difficulty = Number(difficulty);

    this.fillCards();
    this.shuffle();
    this.addCards();
  }

  clickCardHandler = (currentCard: Card, card: Card): void => {
    if (currentCard.element.dataset.id === card.element.dataset.id) {
      currentCard.disableOnclick();
      card.disableOnclick();

      Promise.all([currentCard.match(), card.match()]).then(() => {
        this.matchedCardAmount += 1;
        if (this.matchedCardAmount >= this.difficulty) {
          this.gameEndSubscriber(this.mistakeCounter);
        }
      });
    } else {
      this.mistakeCounter += 1;

      currentCard.noMatch().then(() => {
        currentCard.flipDown();
        currentCard.noMatch(false);
        currentCard.isDisabled = false;
      });

      card.noMatch().then(() => {
        card.flipDown();
        card.noMatch(false);
        card.isDisabled = false;
      });
    }
  };

  addClickListeners(): void {
    this.cards.forEach((card) => {
      card.onclick = () => {
        if (card.isDisabled) {
          return;
        }

        if (this.currentCard) {
          const current = this.currentCard;
          card.isDisabled = true;

          card.flipUp().then(() => {
            this.clickCardHandler(current, card);
          });
          this.currentCard = null;
        } else {
          card.flipUp();
          this.currentCard = card;
          this.currentCard.isDisabled = true;
        }
      };
    });
  }

  flipAll(isFlipped = true): void {
    if (isFlipped) {
      this.cards.forEach((card) => card.flipUp());
    } else {
      this.cards.forEach((card) => card.flipDown());
    }
  }

  private fillCards(): void {
    let size: TCardSize = 'large';
    if (this.difficulty === 8) {
      size = 'medium';
      this.element.classList.add('card-field_medium-gap');
    }
    if (this.difficulty === 18) {
      size = 'small';
      this.element.classList.add('card-field_small-gap');
    }

    for (let i = 0; i < this.difficulty; i++) {
      this.cards.push(
        new Card(this.images[i], i, size),
        new Card(this.images[i], i, size)
      );
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
