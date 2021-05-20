import { IConnector } from '../../../typing/interfaces';
import BaseComponent from "./base-component";

class ConnectorComponent extends BaseComponent {
  constructor(tagName: keyof HTMLElementTagNameMap, className: string, parent?: HTMLElement) {
    super(tagName, className, parent)
  }

  connect(connector: IConnector):void {

  }
}

export default ConnectorComponent;