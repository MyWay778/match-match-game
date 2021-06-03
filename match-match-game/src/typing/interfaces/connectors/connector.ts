import TConnectArguments from '../../types/connect-arguments';

interface IConnector<T extends TConnectArguments> {
  connect?: (component: T) => void;
}

export default IConnector;
