import GeneralComponent from '../../common/GeneralComponent';
import imageBack from '../../../assets/images/back-card-image.jpg';
import s from './Card.scss';


class Card extends GeneralComponent{
    constructor(frontImage: string) {
        super('div');
        super.addClassName(s.card);
        this.element.innerHTML = this._createCard(frontImage);   
    }

    _createCard(frontImage: string) {
        return `
            <div class=${s.front}>
                <img src=${frontImage}>
            </div>
            <div class=${s.back}>
                <img src=${imageBack}>
            </div>`
    }

    flip() {
        super.addClassName(s.flipped);
    }

    set onclick(handler: (e: MouseEvent) => void ) {
        this.element.addEventListener('click', handler);
    }
}

export default Card;