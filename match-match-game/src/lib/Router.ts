export interface IRoute {
  name: string,
  hash: string
}
export interface ISubscriber {
  update: (newRoute: string) => void
}


class Router {
  private routes:IRoute[];
  private currentHash: string | null;
  private subscriber:any

  constructor(routes:IRoute[], subscriber: ISubscriber) {
    this.routes = routes; 
    this.currentHash = null;
    this.subscriber = subscriber;

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
      }
    }
  }
}

export default Router;