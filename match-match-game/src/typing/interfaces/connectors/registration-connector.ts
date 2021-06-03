import TConnectArguments from '../../types/connect-arguments';
import IUser from '../user';
import IConnector from './connector';

interface IRegistrationConnector extends IConnector<TConnectArguments> {
  closeHandler: () => void;
  registerUser: (newUser: IUser) => void;
}

export default IRegistrationConnector;
