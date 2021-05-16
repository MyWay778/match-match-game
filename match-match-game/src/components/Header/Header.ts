import { IUserData } from '../../typing/interfaces';
import s from './Header.scss';
import Logo from './logo/Logo';
import NavMenu from './nav-menu/NavMenu';
import UserPanel from './user-panel/UserPanel';

const user = {
  registered: true,
  unregistered: false
}

class Header {
  public element: HTMLElement;
  private userPanel: UserPanel;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add(s.header);

    const container = document.createElement('div');
    container.classList.add(s.container);

    const logo = new Logo();
    const navMenu = new NavMenu();
    this.userPanel = new UserPanel(user.unregistered);

    container.appendChild(logo.element);
    container.appendChild(navMenu.element);
    container.appendChild(this.userPanel.element);

    this.element.appendChild(container);
  }

  registerUser(userData: IUserData) {
    this.userPanel.registerUser(userData);
  }
  
  setIsGame(isGame = true) {
    this.userPanel.setIsGame(isGame);
  }
}


export default Header;
