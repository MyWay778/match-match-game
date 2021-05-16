import Helper from '../../common/Helper';
import s from './user-panel.scss';
import defaultUserImage from '../../../assets/images/avatar.webp';
import { IUserData } from '../../../typing/interfaces';

class UserPanel {
  element: HTMLElement;
  private registerLink:HTMLAnchorElement;
  private isRegistered:boolean;
  private isGame:boolean;
  private container:HTMLElement;
  private startGameLink:HTMLAnchorElement;
  private stopGameLink:HTMLAnchorElement;
  private avatar:HTMLImageElement;

  constructor(isRegistered = false) {
    this.element = Helper.createElement('section', s.user_panel);
    this.isRegistered = isRegistered;
    this.isGame = false;

    this.registerLink = document.createElement('a');
    this.registerLink.textContent = 'Register new player';
    this.registerLink.classList.add(s.button);
    this.registerLink.href = '#registration';
    // this.registerLink.onclick = handler.register;

    this.container = Helper.createElement('div', s.container);
    this.startGameLink = document.createElement('a');
    this.startGameLink.classList.add(s.button);
    this.startGameLink.textContent = 'Start game';
    this.startGameLink.href = '#game';

    this.stopGameLink = document.createElement('a');
    this.stopGameLink.classList.add(s.button);
    this.stopGameLink.textContent = 'Stop game';
    this.stopGameLink.href = '#about';

    this.avatar = new Image(40, 40);
    this.avatar.classList.add(s.userImage);
    this.avatar.src = defaultUserImage;
    this.avatar.alt = 'User image';

    this.container.append(this.startGameLink, this.avatar);

    this.checkRegistration();
  }

  private checkRegistration(): void {
    if (this.isRegistered) {
      this.element.children.length
        ? this.element.children[0].replaceWith(this.container)
        : this.element.appendChild(this.container);
    } else {
      this.element.children.length
        ? this.element.children[0].replaceWith(this.registerLink)
        : this.element.appendChild(this.registerLink);
    }
  }

  registerUser(userData:IUserData) {
    if(userData.userImage) {
      this.avatar.src = userData.userImage;
    }
    this.isRegistered = true;
    this.checkRegistration();
  }

  setIsGame(isGame = true) {
    if (isGame) {
      this.container.children[0].replaceWith(this.stopGameLink);
    } else {
      this.container.children[0].replaceWith(this.startGameLink);
    }
  }
}

export default UserPanel;
