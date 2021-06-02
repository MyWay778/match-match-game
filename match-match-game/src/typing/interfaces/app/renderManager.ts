import TConnectors from '../../types/connectors';
import IComponents from '../components';

interface IRenderManager {
  placeComponent(
    componentName: keyof IComponents,
    renderPosition: number
  ): void;
  createComponent(componentName: keyof IComponents): void;
  removeComponent(componentName: keyof IComponents): void;
  connectComponent(
    componentName: keyof IComponents,
    connector: TConnectors
  ): void;
  addComponent(componentName: keyof IComponents, renderPosition: number): void;
}

export default IRenderManager;
