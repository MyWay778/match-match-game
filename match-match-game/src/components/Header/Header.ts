import s from './Header.scss';
import Logo from './logo/Logo';
import NavMenu from './nav-menu/NavMenu';
import UserPanel from './user-panel/UserPanel';

class Header {
  public element: HTMLElement;

  constructor() {
    this.element = document.createElement('header');
    this.element.classList.add(s.header);

    const container = document.createElement('div');
    container.classList.add(s.container);

    const logo = new Logo();
    const navMenu = new NavMenu();
    const userPanel = new UserPanel(true);

    container.appendChild(logo.element);
    container.appendChild(navMenu.element);
    container.appendChild(userPanel.element);

    this.element.appendChild(container);
  }
}


export default Header;
