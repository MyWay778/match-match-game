import { IConnector } from './../../../typing/interfaces';
import BaseComponent from "./BaseComponent";

class ConnectorComponent extends BaseComponent {
  constructor(tagName: keyof HTMLElementTagNameMap, className: string, parent?: HTMLElement) {
    super(tagName, className, parent)
  }

  connect(connector: IConnector):void {

  }
}

export default ConnectorComponent;