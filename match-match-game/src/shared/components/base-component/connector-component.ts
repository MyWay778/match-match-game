import TConnectorsOr from "../../../typing/types/connectors-or";
import BaseComponent from "./base-component";

class ConnectorComponent<T extends TConnectorsOr> extends BaseComponent {
  connector: null | T;

  constructor(tagName: keyof HTMLElementTagNameMap, className: string, parent?: HTMLElement) {
    super(tagName, className, parent);
    this.connector = null;
  }

  connect(connector: T): void {
    this.connector = connector;
  }
}

export default ConnectorComponent;