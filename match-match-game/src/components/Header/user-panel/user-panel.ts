import Helper from '../../common/helper';
import './user-panel.scss';
import defaultUserImage from '../../../assets/images/avatar.webp';

import ConnectorComponent from '../../../shared/components/base-component/connector-component';
import IUserPanelConnector from '../../../typing/interfaces/connectors/user-panel-connector';
import IUserData from '../../../typing/interfaces/user-data';


class UserPanel extends ConnectorComponent<IUserPanelConnector> {
  private registerButton: HTMLButtonElement;
  private isRegistered: boolean;
  private container: HTMLElement;
  private startGameLink: HTMLAnchorElement;
  private stopGameLink: HTMLAnchorElement;
  private avatar: HTMLImageElement;

  constructor(isRegistered = false) {
    super('section', 'user-panel');
    this.isRegistered = isRegistered;

    this.registerButton = document.createElement('button');
    this.registerButton.textContent = 'Register new player';
    this.registerButton.classList.add('user-panel__button');

    this.container = Helper.createElement('div', 'user-panel__container');
    this.startGameLink = document.createElement('a');
    this.startGameLink.classList.add('user-panel__link');
    this.startGameLink.textContent = 'Start game';
    this.startGameLink.href = '#game';

    this.stopGameLink = document.createElement('a');
    this.stopGameLink.classList.add('user-panel__link');
    this.stopGameLink.textContent = 'Stop game';
    this.stopGameLink.href = '#about';

    this.avatar = new Image(40, 40);
    this.avatar.classList.add('user-panel__user-image');
    this.avatar.src = defaultUserImage;
    this.avatar.alt = 'User image';

    this.container.append(this.startGameLink, this.avatar);

    this.checkRegistration();
  }

  connect(connector: IUserPanelConnector): void {
    this.registerButton.onclick = connector.openRegister;
  }

  private checkRegistration(): void {
    if (this.isRegistered) {
      if (this.element.children.length) {
        this.element.children[0].replaceWith(this.container);
      } else {
        this.element.appendChild(this.container);
      }
    } else if (this.element.children.length) {
      this.element.children[0].replaceWith(this.registerButton);
    } else {
      this.element.appendChild(this.registerButton);
    }
  }

  registerUser(userData: IUserData): void {
    if (userData.userImage) {
      this.avatar.src = userData.userImage;
    }
    this.isRegistered = true;
    this.checkRegistration();
  }

  setIsGame(isGame = true): void {
    if (isGame) {
      this.container.children[0].replaceWith(this.stopGameLink);
    } else {
      this.container.children[0].replaceWith(this.startGameLink);
    }
  }
}

export default UserPanel;
