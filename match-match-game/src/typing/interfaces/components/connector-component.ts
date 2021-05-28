import TConnectArguments from "../../types/connect-arguments";
import IConnector from "../connectors/connector";

interface IConnectorComponent<T extends IConnector<TConnectArguments>> {
  connect(connector: T): void;
}

export default IConnectorComponent;