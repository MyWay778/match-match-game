import Helper from "../common/helper";
import './about.scss';

import firstImg from '../../assets/images/first-item.webp';
import secondImg from '../../assets/images/second-item.webp';
import thirdImg from '../../assets/images/third-item.webp';
import BaseComponent from "../../shared/components/base-component/base-component";
import IAbout from "../../typing/interfaces/components/about";

function createCard(itemNumber: string, cardText: string) {
  const card = Helper.createElement('section', 'about-card');
  const item  = Helper.createTextElement('span', 'about-card__item', itemNumber);
  const text = Helper.createTextElement('p', 'about-card__text', cardText);
  card.append(item, text);
  return card;
}


class About extends BaseComponent implements IAbout{
  card: HTMLElement | null;

  constructor(root: HTMLElement) {
    super('main', 'about', root)

    this.card = null;
    const container = Helper.createElement('div', 'about__container');
    const title = Helper.createTextElement('h2', '', 'How to play?');

    // first item
    const firstCardText = 'Register new player in game';
    const firstCard = createCard('1', firstCardText);

    const firstRowImage =  new Image();
    firstRowImage.classList.add('about-card__image');
    firstRowImage.src = firstImg;

    const firstRow = Helper.createElement('div', 'about-row');
    firstRow.append(firstCard, firstRowImage);

    // second item
    const secondCardText = 'Configure your game settings';
    const secondCard = createCard('2', secondCardText);

    const secondRowImage =  new Image();
    secondRowImage.classList.add('about-card__image');
    secondRowImage.src = secondImg;

    const secondRow = Helper.createElement('div', 'about-row');
    secondRow.append(secondCard, secondRowImage);

    // third item
    const thirdCardText = 'Start you new game! Remember card positions and match it before times up.';
    const thirdCard = createCard('3', thirdCardText); 

    const thirdRowImage = new Image();
    thirdRowImage.classList.add('about-card__image');
    thirdRowImage.src = thirdImg;

    const thirdRow = Helper.createElement('div', 'about-row');
    thirdRow.append(thirdCard, thirdRowImage);

    // assembly
    container.append(title, firstRow, secondRow, thirdRow);
    this.element.appendChild(container);
  }
}

export default About;