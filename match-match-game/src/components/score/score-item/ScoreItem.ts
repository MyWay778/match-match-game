import BaseComponent from '../../../shared/components/base-component/BaseComponent';
import Helper from '../../common/Helper';
import style from './score-item.scss';
import defaultImage from '../../../assets/images/avatar.webp';

class ScoreItem extends BaseComponent {
  constructor(userName: string, userEmail: string, userScore: number, userImage?: string) {
    super('li', style.item)
    const leftPart = Helper.createElement('div', style.leftPart);
    const rightPart = Helper.createElement('div', style.rightPart);
    
    const image = new Image(40, 40);
    image.alt = 'User image';
    image.src = userImage ? userImage : defaultImage;

    const userBlock = Helper.createElement('div', style.userBlock);
    const name = Helper.createTextElement('span', style.userName, userName);
    const email = Helper.createTextElement('span', style.userEmail, userEmail);
    userBlock.append(name, email);
    
    leftPart.append(image, userBlock);

    const score = Helper.createTextElement('span', style.score, 'Score:');
    const scoreValue = Helper.createTextElement('span', style.scoreValue, String(userScore));

    rightPart.append(score, scoreValue);
    
    this.element.append(leftPart, rightPart);
  }
}

export default ScoreItem;