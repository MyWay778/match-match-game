import ConnectorComponent from '../../shared/components/base-component/ConnectorComponent';
import { IHeadConnector, IUserData } from '../../typing/interfaces';
import s from './Header.scss';
import Logo from './logo/Logo';
import NavMenu from './nav-menu/NavMenu';
import UserPanel from './user-panel/UserPanel';

const user = {
  registered: true,
  unregistered: false
}

class Header extends ConnectorComponent {
  private userPanel: UserPanel;
  private navMenu: NavMenu;

  constructor(parent: HTMLElement) {
    super('header', s.header, parent);

    const container = document.createElement('div');
    container.classList.add(s.container);

    const logo = new Logo();
    this.navMenu = new NavMenu();
    this.userPanel = new UserPanel(user.unregistered);

    container.appendChild(logo.element);
    container.appendChild(this.navMenu.element);
    container.appendChild(this.userPanel.element);

    this.element.appendChild(container);
  }

  connect(connector: IHeadConnector){
    connector.connect(this);
    this.userPanel.connect(connector);
  }

  registerUser = (userData: IUserData) =>  {
    console.log('Header, register')
    this.userPanel.registerUser(userData);
  }
  
  makeActiveLink = (linkNumber: number) => {
    this.navMenu.makeActive(linkNumber);
  }

  setIsGame(isGame = true) {
    this.userPanel.setIsGame(isGame);
  }
}


export default Header;
