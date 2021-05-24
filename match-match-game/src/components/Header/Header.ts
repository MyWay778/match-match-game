import ConnectorComponent from '../../shared/components/base-component/connector-component';
import IHeader from '../../typing/interfaces/components/header';
import IHeadConnector from '../../typing/interfaces/connectors/header-connector';


import IUserData from '../../typing/interfaces/user-data';
import './header.scss';
import Logo from './logo/logo';
import NavMenu from './nav-menu/nav-menu';
import UserPanel from './user-panel/user-panel';

const user = {
  registered: true,
  unregistered: false
}

class Header extends ConnectorComponent implements IHeader {
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

  connect(connector: IHeadConnector): void{
    connector?.connect(this);
    this.userPanel.connect(connector);
  }

  registerUser = (userData: IUserData): void =>  {
    this.userPanel.registerUser(userData);
  }
  
  makeActiveLink = (linkNumber: number): void => {
    this.navMenu.makeActive(linkNumber);
  }

  setIsGame(isGame = true): void {
    this.userPanel.setIsGame(isGame);
  }
}


export default Header;
