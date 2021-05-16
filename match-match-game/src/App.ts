import Router, { IRoute } from "./lib/Router";

import Controller from "./controllers/Controller";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Registration from "./components/registration/Registration";
import Game from "./components/game/Game";
import { IUserData } from "./typing/interfaces";


const routes:IRoute[] = [
  {name: 'about', hash: '#about'},
  {name: 'registration', hash: '#registration'},
  {name: 'score', hash: '#score'},
  {name: 'game', hash: '#game'},

]

class App {
  routerController:any;
  headerController:any;
  renderList: any;
  controller:any

  header: Header;
  about: About;
  game: null | Game;
  registration: null | Registration;

  constructor(private root:HTMLElement) {

    this.controller = new Controller(this); 
    new Router(routes, this.controller.connector);

    this.header = new Header();
    this.about = new About();
    this.registration = null;
    this.game = null;

    this.renderList = [this.header.element, this.about.element];
  }

  launch() {
    this.root.append(...this.renderList);
  }

  showRegistration() {
    this.registration = new Registration(this.controller.connector.registration);
    this.root.appendChild(this.registration.element);
  }

  closeRegistration() {
    if (this.registration) {
      this.registration.element.remove();
      this.registration = null;
    }
  }

  provideToHeaderNewUser(userData: IUserData) {
    this.header.registerUser(userData);
  }

  showGame() {
    this.game = new Game();
    this.about.element.replaceWith(this.game.element);
    this.header.setIsGame();
    this.game.initGame();
  }

  showAbout() {
    if (this.root.children[1] !== this.about.element) {
      this.root.children[1].replaceWith(this.about.element);
      this.header.setIsGame(false);
    }
  }
}

export default App;