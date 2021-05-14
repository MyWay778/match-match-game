import imageBack from '../../../assets/images/back-card-image.jpg';
import Helper from '../../common/Helper';
import s from './Card.scss';


class Card {
  element: HTMLElement;

  constructor(frontImage: string) {
    this.element = Helper.createElement('figure', s.card);
    this.element.innerHTML = `
        <div class=${s.front}>
            <img src=${frontImage}>
        </div>
            <div class=${s.back}>
            <img src=${imageBack}>
        </div>`
  }

  flip() {
    this.element.classList.add(s.flipped);
  }

  set onclick(handler: (e: MouseEvent) => void ) {
    this.element.addEventListener('click', handler);
  }
}

export default Card;