import Helper from "../common/Helper";
import s from './about.scss';

import firstImg from '../../assets/images/first-item.webp';
import secondImg from '../../assets/images/second-item.webp';
import thirdImg from '../../assets/images/third-item.webp';
import BaseComponent from "../../shared/components/base-component/BaseComponent";

function createCard(itemNumber: string, cardText: string) {
  const card = Helper.createElement('section', s.card);
  const item  = Helper.createTextElement('span', s.item, itemNumber);
  const text = Helper.createTextElement('p', s.text, cardText);
  card.append(item, text);
  return card;
}


class About extends BaseComponent {
  card: HTMLElement | null;

  constructor(root: HTMLElement) {
    super('main', s.about, root)

    this.card = null;
    const container = Helper.createElement('div', s.container);
    const title = Helper.createTextElement('h2', '', 'How to play?');

    // first item
    const firstCardText = 'Register new player in game';
    const firstCard = createCard('1', firstCardText);

    const firstRowImage =  new Image();
    firstRowImage.classList.add(s.img);
    firstRowImage.src = firstImg;

    const firstRow = Helper.createElement('div', s.row);
    firstRow.append(firstCard, firstRowImage);

    // second item
    const secondCardText = 'Configure your game settings';
    const secondCard = createCard('2', secondCardText);

    const secondRowImage =  new Image();
    secondRowImage.classList.add(s.img);
    secondRowImage.src = secondImg;

    const secondRow = Helper.createElement('div', s.row);
    secondRow.append(secondCard, secondRowImage);

    // third item
    const thirdCardText = 'Start you new game! Remember card positions and match it before times up.';
    const thirdCard = createCard('3', thirdCardText); 

    const thirdRowImage = new Image();
    thirdRowImage.classList.add(s.img);
    thirdRowImage.src = thirdImg;

    const thirdRow = Helper.createElement('div', s.row);
    thirdRow.append(thirdCard, thirdRowImage);

    // assembly
    container.append(title, firstRow, secondRow, thirdRow);
    this.element.appendChild(container);
  }
}

export default About;