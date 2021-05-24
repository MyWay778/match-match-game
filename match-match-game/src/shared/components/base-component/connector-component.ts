import IConnector from "../../../typing/interfaces/connectors/connector";
import BaseComponent from "./base-component";

class ConnectorComponent extends BaseComponent {
  connector: null | IConnector;

  constructor(tagName: keyof HTMLElementTagNameMap, className: string, parent?: HTMLElement) {
    super(tagName, className, parent);
    this.connector = null;
  }

  connect(connector: IConnector): void {
    this.connector = connector;
  }
}

export default ConnectorComponent;