import BaseComponent from '../../../shared/components/base-component/base-component';
import Helper from '../../common/helper';
import './score-item.scss';
import defaultImage from '../../../assets/images/avatar.webp';

class ScoreItem extends BaseComponent {
  constructor(
    userName: string,
    userEmail = 'none',
    userScore: number,
    userImage?: string
  ) {
    super('li', 'score-item');
    const leftPart = Helper.createElement('div', 'score-item-left-part');
    const rightPart = Helper.createElement('div', 'score-item-right-part');

    const image = new Image(40, 40);
    image.alt = 'User image';
    image.src = userImage || defaultImage;
    image.classList.add('score-item-left-part__image');

    const userBlock = Helper.createElement(
      'div',
      'score-item-left-part-user-block'
    );
    const name = Helper.createTextElement(
      'span',
      'score-item-left-part-user-block__user-name',
      userName
    );
    const email = Helper.createTextElement(
      'span',
      'score-item-left-part-user-block__user-email',
      userEmail
    );
    userBlock.append(name, email);

    leftPart.append(image, userBlock);

    const score = Helper.createTextElement(
      'span',
      'score-item-right-part__score',
      'Score:'
    );
    const scoreValue = Helper.createTextElement(
      'span',
      'score-item-right-part__value',
      String(userScore)
    );

    rightPart.append(score, scoreValue);

    this.element.append(leftPart, rightPart);
  }
}

export default ScoreItem;
