import { TCardSize } from '../../../typing/card-size';
import imageBack from '../../../assets/images/back-card-image.jpg';
import Helper from '../../common/helper';
import './card.scss';

class Card {
  element: HTMLElement;
  handler: null | ((e: MouseEvent) => void);
  isDisabled = false;

  constructor(frontImage: string, id?: number, size: TCardSize = 'large') {
    this.element = Helper.createElement('figure', 'game-card');
    this.element.dataset.id = String(id);
    if (size !== 'large') {
      this.element.classList.add(`game-card_${size}`);
    }
    this.handler = null;

    this.element.innerHTML = `
        <div class="${'game-card__front'}">
            <img src=${frontImage}>
        </div>
            <div class=${'game-card__back'}>
            <img src=${imageBack}>
        </div>`;
  }

  flipUp = (): Promise<void> => {
    this.element.classList.add('game-card_flipped');

    return new Promise<void>((resolve) => {
      this.element.addEventListener(
        'transitionend',
        () => {
          resolve();
        },
        { once: true }
      );
    });
  };

  flipDown = (): Promise<void> => {
    this.element.classList.remove('game-card_flipped');

    return new Promise<void>((resolve) => {
      this.element.addEventListener(
        'transitionend',
        () => {
          resolve();
        },
        { once: true }
      );
    });
  };

  match(isMatch = true): Promise<void> {
    if (isMatch) {
      this.element.classList.add('game-card_match');
      this.disableOnclick();
    } else {
      this.element.classList.remove('game-card_match');
    }

    return new Promise<void>((resolve) => {
      this.element.addEventListener(
        'animationend',
        () => {
          resolve();
        },
        { once: true }
      );
    });
  }

  noMatch(isNoMatch = true): Promise<void> {
    if (isNoMatch) {
      this.element.classList.add('game-card_nomatch');
    } else {
      this.element.classList.remove('game-card_nomatch');
    }

    return new Promise<void>((resolve) => {
      this.element.addEventListener('animationend', () => {
        resolve();
      }, { once: true });
    });
  }

  set onclick(handler: (e: MouseEvent) => void) {
    this.handler = handler;
    this.element.addEventListener('click', handler);
  }

  disableOnclick(): void {
    if (this.handler) {
      this.element.removeEventListener('click', this.handler);
    }
  }
}

export default Card;
