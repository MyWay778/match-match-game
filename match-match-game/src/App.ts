import Router, { IRoute } from './lib/router';
import Controller from './app/controller';
import Header from './components/header/header';
import About from './components/about/about';
import Store from './app/store';
import RenderManager from './app/render-manager';
import IComponents from './typing/interfaces/components';

const routes: IRoute[] = [
  { name: 'about', hash: '#about' },
  { name: 'score', hash: '#score' },
  { name: 'game', hash: '#game' },
  { name: 'settings', hash: '#settings' },
];

const redirect: IRoute = routes[0];

class App {
  private controller?: Controller;
  private store?: Store;
  private components: IComponents;
  private router?: Router;

  constructor(private readonly root: HTMLElement) {
    this.components = {
      header: new Header(root),
      about: new About(root),
    };
  }

  init(): void {
    this.store = new Store();
    const renderManager = new RenderManager(this.root, this.components, [
      this.components.header,
    ]);
    this.controller = new Controller(renderManager, this.store);

    this.router = new Router(
      routes,
      this.controller.connector.router,
      redirect
    );
  }
}

export default App;
