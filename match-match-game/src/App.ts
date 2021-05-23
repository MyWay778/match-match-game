import Router, { IRoute } from "./lib/router";
import Controller from "./app/controller";
import Header from "./components/header/header";
import About from "./components/about/about";
import Store from "./app/store";
import RenderManager from "./app/render-manager";
import { IComponents } from "./typing/interfaces";

const routes:IRoute[] = [
  {name: 'about', hash: '#about'},
  {name: 'score', hash: '#score'},
  {name: 'game', hash: '#game'},

]

const redirect: IRoute = routes[0];

export const renderPosition = {
  header: 0,
  main: 1,
  aside: 2
}

class App {
  controller: Controller
  store: Store;
  components: IComponents
  router: Router

  constructor(private root:HTMLElement) {

    this.components = {
      header: new Header(root),
      about: new About(root),
      registration: null,
      game: null,
      score: null
    }
     
    this.store = new Store();
    const renderManager = new RenderManager(root, this.components, [this.components.header]);
    this.controller = new Controller(renderManager, this.store); 

    // renderManager.connect(this.controller.connector);
    this.router = new Router(routes, this.controller.connector.router, redirect);
    
  }
}

export default App;