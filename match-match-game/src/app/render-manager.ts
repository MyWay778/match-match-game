// const componentList = {
//   registration: Registration
// }
// new componentList['registration'](document.createElement('div'));
// const componentFactory = (componentName: string, componentList: any, root: HTMLElement) => {
//   return new componentList[componentName](root);
// }
// const registrationInstance  = componentFactory('registration', componentList, document.createElement('div'));

import Game from "../components/game/game";
import Registration from "../components/registration/registration";
import Score from "../components/score/score";
import Settings from "../components/settings/settings";
import ConnectorComponent from "../shared/components/base-component/connector-component";
import IRenderManager from "../typing/interfaces/app/renderManager";
import IComponents from "../typing/interfaces/components";
import IBaseComponent from "../typing/interfaces/components/base-component";
import IGame from "../typing/interfaces/components/game";
import IRegistration from "../typing/interfaces/components/registration";
import IScore from "../typing/interfaces/components/score";
import ISettings from "../typing/interfaces/components/settings";
import IConnector from "../typing/interfaces/connectors/connector";
import TConnectors from "../typing/types/connectors";

class RenderManager implements IRenderManager {
  private connector: null | IConnector = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly components: IComponents,
    private readonly renderList: Array<IBaseComponent | null>
  ) {
    this.renderList.forEach((component) => {
      if (component?.checkParent()) {
        component.render();
      }
    });
  }

  connect(connector: IConnector): void {
    this.connector = connector;
    this.renderList.forEach((component) => {
      if (component instanceof ConnectorComponent) {
        const componentKeys = Object.keys(this.components);

        componentKeys.forEach((key: string) => {
          if (this.connector) {
            const suitableConnector = this.connector[key as keyof IConnector];
            if (suitableConnector) {
              component.connect(suitableConnector);
            }
          }
        });
      }
    });
  }

  addComponent(componentName: keyof IComponents, renderPosition: number): void {
    const component = this.components[componentName];
    if (this.renderList[renderPosition] !== component) {
      this.renderList[renderPosition] = component;
      if (component?.checkParent()) {
        component.render();
      }
    }
  }

  placeComponent(
    componentName: keyof IComponents,
    renderPosition: number
  ): void {
    const target = this.components[componentName];
    if (this.renderList[renderPosition] && target) {
      this.renderList[renderPosition]?.element.replaceWith(target?.element);
      this.renderList[renderPosition] = target;
    } else {
      if (target?.checkParent()) {
        target.render();
      }
      this.renderList[renderPosition] = target;
    }
  }

  createComponent(componentName: keyof IComponents): void {
    if (componentName === 'registration') {
      const component: IRegistration = new Registration(this.root);
      this.components.registration = component;
    } else if (componentName === 'game') {
      const component: IGame = new Game(this.root);
      this.components.game = component;
    } else if (componentName === 'score') {
      const component: IScore = new Score(this.root);
      this.components.score = component;
    } else if (componentName === 'settings') {
      const component: ISettings = new Settings(this.root);
      this.components.settings = component;
    }
  }

  removeComponent(componentName: keyof IComponents): void {
    const target = this.components[componentName];
    const removeComponent = this.renderList.find(
      (component) => component === target
    );
    removeComponent?.element.remove();
  }

  connectComponent(
    componentName: keyof IComponents,
    connector: TConnectors
  ): void {
    const target = this.components[componentName];
    if (target && target instanceof ConnectorComponent) {
      target?.connect(connector);
    }
  }
}

export default RenderManager;
