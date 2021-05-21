import ConnectorComponent from '../../shared/components/base-component/connector-component';
import { IHeadConnector, IUserData } from '../../typing/interfaces';
import './header.scss';
import Logo from './logo/logo';
import NavMenu from './nav-menu/nav-menu';
import UserPanel from './user-panel/user-panel';

const user = {
  registered: true,
  unregistered: false
}

class Header extends ConnectorComponent {
  private userPanel: UserPanel;
  private navMenu: NavMenu;

  constructor(parent: HTMLElement) {
    super('header', "header", parent);

    const container = document.createElement('div');
    container.classList.add('header__container');

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
