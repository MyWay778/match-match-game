import s from './Card.scss';

interface ICardClassNames {
    card: string;
    container: string;
    front: string;
    back: string;
}

interface ITemplateProps {
    frontImage: string;
    backImage: string;
    classNames: ICardClassNames;
}

type TTemplate = (frontImage: string, backImage: string) => string;

export const cardTemplate = (frontImage: string, backImage: string): string => {
    return `<div class=${s.container}>
            <div class=${s.front}>
                <img src=${frontImage} alt="Front side">
            </div>
            <div class=${s.back}>
                <img src=${backImage} alt="Back side">
            </div>
        </div>
    </div>`
}


class Card {
    card: HTMLElement;

    constructor(template: TTemplate, frontImage: string, backImage: string) {
        this.card = document.createElement('div');
        this.card.classList.add(s.card);
        this.card.innerHTML = template(frontImage, backImage)
    }

    render() {
        return this.card;
    }
}


export default Card;