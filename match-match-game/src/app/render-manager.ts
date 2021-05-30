import Game from '../components/game/game';
import Header from '../components/header/header';
import Registration from '../components/registration/registration';
import Score from '../components/score/score';
import Settings from '../components/settings/settings';
import ConnectorComponent from '../shared/components/base-component/connector-component';
import IRenderManager from '../typing/interfaces/app/renderManager';
import IComponents from '../typing/interfaces/components';
import IBaseComponent from '../typing/interfaces/components/base-component';
import TConnectors from '../typing/types/connectors';
import TConnectorsOr from '../typing/types/connectors-or';
import TRenderPosition from '../typing/types/render-position';
import ComponentFactory from './component-factory';

class RenderManager implements IRenderManager {
  private connector: null | TConnectorsOr = null;
  private readonly factory: ComponentFactory;

  constructor(
    private readonly root: HTMLElement,
    private readonly components: IComponents,
    private readonly renderList: Array<IBaseComponent | null>
  ) {
    this.factory = new ComponentFactory();
    this.renderList.forEach((component) => {
      if (component?.checkParent()) {
        component.render();
      }
    });
  }

  connect(connector: TConnectorsOr): void {
    this.connector = connector;
    this.renderList.forEach((component) => {
      if (component instanceof ConnectorComponent) {
        const componentKeys = Object.keys(this.components);
        componentKeys.forEach((key: string) => {
          if (!this.connector) {
            return;
          }
          const suitableConnector = this.connector[key as keyof TConnectorsOr];
          if (suitableConnector) {
            component.connect(suitableConnector);
          }
        });
      }
    });
  }

  addComponent(
    componentName: keyof IComponents,
    renderPosition: TRenderPosition
  ): void {
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
    const component = this.factory.getInstance(componentName, this.root);

    if (component instanceof Header) {
      this.components.header = component;
    } else if (component instanceof Game) {
      this.components.game = component;
    } else if (component instanceof Score) {
      this.components.score = component;
    } else if (component instanceof Settings) {
      this.components.settings = component;
    } else if (component instanceof Registration) {
      this.components.registration = component;
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
