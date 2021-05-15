import imageBack from '../../../assets/images/back-card-image.jpg';
import Helper from '../../common/Helper';
import s from './Card.scss';


class Card {
  element: HTMLElement;

  constructor(frontImage: string, id?: number) {
    this.element = Helper.createElement('figure', s.card);
    this.element.dataset.id = String(id);

    this.element.innerHTML = `
        <div class=${s.front}>
            <img src=${frontImage}>
        </div>
            <div class=${s.back}>
            <img src=${imageBack}>
        </div>`
  }

  flip(isFlipped:boolean = true): Promise<any> {
    if (isFlipped) {
      this.element.classList.add(s.flipped);
    } else {
      this.element.classList.remove(s.flipped);
    }

    return new Promise<void> ((resolve) => {
      this.element.addEventListener('transitionend', () => {
        resolve();
      },{once: true});
    })
  }

  set onclick(handler: (e: MouseEvent) => void ) {
    this.element.addEventListener('click', handler);
  }
}

export default Card;