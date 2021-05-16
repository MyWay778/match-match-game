import imageBack from '../../../assets/images/back-card-image.jpg';
import Helper from '../../common/Helper';
import s from './card.scss';


class Card {
  element: HTMLElement;
  handler: null | ((e: MouseEvent) => void);

  constructor(frontImage: string, id?: number) {
    this.element = Helper.createElement('figure', s.card);
    this.element.dataset.id = String(id);
    this.handler = null;

    this.element.innerHTML = `
        <div class="${s.front}">
            <img src=${frontImage}>
        </div>
            <div class=${s.back}>
            <img src=${imageBack}>
        </div>`
  }

  flip(isFlipped = true):Promise<void> {
    if (isFlipped) {
      this.element.classList.add(s.flipped);
    } else {
      this.element.classList.remove(s.flipped);
    }

    return new Promise<void>((resolve) => {
      this.element.addEventListener('transitionend', ()=>{
        resolve();
      }, {once: true});
    }) 
  }

  match(isMatch = true):Promise<void> {
    if (isMatch) {
      this.element.classList.add(s.match);
      this.disableOnclick();
    } else {
      this.element.classList.remove(s.match);
    }

    return new Promise<void>((resolve) => {
      this.element.addEventListener('animationend', ()=>{
        resolve();
      }, {once: true});
    }) 
  }


  noMatch() {
    this.element.classList.add(s.noMatch);
  }



  set onclick(handler: (e: MouseEvent) => void ) {
    this.handler = handler;
    this.element.addEventListener('click', handler);
  }

  disableOnclick() {
    if (this.handler) {
      this.element.removeEventListener('click', this.handler);
    }
  }
}

export default Card;