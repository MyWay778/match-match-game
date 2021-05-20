import Registration from "../components/registration/registration";
import ConnectorComponent from "../shared/components/base-component/connector-component";
import Game from '../components/game/game';
import Score from '../components/score/score';
import BaseComponent from "src/shared/components/base-component/base-component";


// const componentList = {
//   registration: Registration
// }
// new componentList['registration'](document.createElement('div'));
// const componentFactory = (componentName: string, componentList: any, root: HTMLElement) => {
//   return new componentList[componentName](root);
// }
// const registrationInstance  = componentFactory('registration', componentList, document.createElement('div'));


class RenderManager {
  connector: null | any;

  constructor(private readonly root: HTMLElement, private readonly components: any, private readonly renderList: any[]) {
    this.renderList.forEach(component => {
      component.checkParent() && component.render();
    })
  }
  connect(connector: any) {
    this.connector = connector;

    // this.components.find(component => {
    //   this.connectComponent(component)
    // })

    this.renderList.forEach( component => {
       if(component instanceof ConnectorComponent) {
        for (let key in this.components) {
          const suitableConnector = this.connector[key];
          if (suitableConnector) {
            component.connect(suitableConnector);
          }
        }
       }
    })
  }

  addComponent(componentName: string, renderPosition: number) {
    const component = this.components[componentName];
   if (this.renderList[renderPosition] !== component) {
    this.renderList[renderPosition] = component;
    component.checkParent() && component.render()
   }
  }

  placeComponent(componentName: string, renderPosition: number) {
    
    const target = this.components[componentName];
    if (this.renderList[renderPosition]) {
      this.renderList[renderPosition].element.replaceWith(target.element);
      this.renderList[renderPosition] = target;
      
    } else {
      target.checkParent() && target.render();
      this.renderList[renderPosition] = target;
    }
    console.log(this)
  }

  createComponent(componentName: string) {
    if (componentName === 'registration') {
      const component: any =  new Registration(this.root); // any
      this.components['registration'] = component;

    } else if (componentName === 'game') {
      const component: any =  new Game(this.root); // any
      this.components['game'] = component;

    } else if (componentName === 'score') {
      const component: any =  new Score(this.root); // any
      this.components['score'] = component;
    }
  }

  removeComponent(componentName: string) {
    console.log(this);
    const target = this.components[componentName];
    const removeComponent = this.renderList.find(component => component === target);
    removeComponent.element.remove();
    console.log(this);
  }

  connectComponent(componentName: string, connector: any) {
    const target = this.components[componentName];

    if (target && target instanceof ConnectorComponent) {
      target.connect(connector);
    }
  }

  // showAbout() {
  //   if (this.root.children[1] !== this.about.element) {
  //     this.root.children[1].replaceWith(this.about.element);
  //     this.header.setIsGame(false);
  //   }
  // }
}

export default RenderManager;