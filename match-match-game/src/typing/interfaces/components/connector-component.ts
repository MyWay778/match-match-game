import IConnector from "../connectors/connector";

interface IConnectorComponent {
  connect(connector: IConnector): void;
}

export default IConnectorComponent;