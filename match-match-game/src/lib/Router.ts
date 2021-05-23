import { ISubscriber } from "../typing/interfaces";

export interface IRoute {
  name: string,
  hash: string
}

class Router {
  private routes:IRoute[];
  private currentHash: string | null;
  private subscriber: any;
  private readonly redirect: IRoute;

  constructor(routes:IRoute[], subscriber: ISubscriber, redirect: IRoute) {
    this.routes = routes; 
    this.currentHash = null;
    this.subscriber = subscriber;
    this.redirect = redirect;

    this.hashChange = this.hashChange.bind(this);

    window.addEventListener('hashchange', this.hashChange);
    window.addEventListener('DOMContentLoaded', this.hashChange);
  }

  hashChange():void {
    const { hash } = window.location;
    if (hash !== this.currentHash) {
      const newRoute = this.routes.find(route => route.hash.match(hash));
      if (newRoute) {
        this.subscriber.update(newRoute.name);
        this.currentHash = newRoute.hash;
      } else {
        window.location.hash = this.redirect.hash;
        this.subscriber.update(this.redirect.name);
        this.currentHash = this.redirect.hash;
      }
    }
  }
}

export default Router;