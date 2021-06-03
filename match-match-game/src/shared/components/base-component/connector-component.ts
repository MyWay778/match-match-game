import TConnectorsOr from '../../../typing/types/connectors-or';
import BaseComponent from './base-component';

class ConnectorComponent<T extends TConnectorsOr> extends BaseComponent {
  connector?: T;

  connect(connector: T): void {
    this.connector = connector;
  }
}

export default ConnectorComponent;
