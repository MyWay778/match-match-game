import Helper from '../../common/Helper';
import s from './user-panel.scss';
import defaultUserImage from '../../../assets/images/avatar.webp';

class UserPanel {
  element: HTMLElement;
  private registerLink: HTMLAnchorElement;
  private isRegistered: boolean;
  private container: HTMLElement;
  private startGameLink: HTMLAnchorElement;
  private stopGameLink: HTMLAnchorElement;
  private avatar: HTMLImageElement;

  constructor(isRegistered: boolean = false) {
    this.element = Helper.createElement('section', s.user_panel);
    this.isRegistered = isRegistered;

    this.registerLink = document.createElement('a');
    this.registerLink.textContent = 'Register new player';
    this.registerLink.classList.add(s.register_link);
    this.registerLink.href = '#registration';

    this.container = Helper.createElement('div', s.container);
    this.startGameLink = document.createElement('a');
    this.startGameLink.classList.add(s.startBtn);
    this.startGameLink.textContent = 'Start game';
    this.startGameLink.href = '#game';

    this.stopGameLink = document.createElement('a');
    this.stopGameLink.classList.add(s.stopBtn);
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
}

export default UserPanel;
