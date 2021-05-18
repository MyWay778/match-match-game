import Router, { IRoute } from "./lib/Router";
import Controller from "./controllers/Controller";
import Header from "./components/header/Header";
import About from "./components/about/About";
import Store from "./store/Store";
import RenderManager from "./app/RenderManager";

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
  controller:any
  store: Store;
  components: any

  constructor(private root:HTMLElement) {

    this.components = {
      header: new Header(root),
      about: new About(root)
    }
     
    this.store = new Store();
    const renderManager = new RenderManager(root, this.components, [this.components.header]);
    this.controller = new Controller(renderManager, this.store); 

    renderManager.connect(this.controller.connector);
    new Router(routes, this.controller.connector.router, redirect);
    
  }
}

export default App;