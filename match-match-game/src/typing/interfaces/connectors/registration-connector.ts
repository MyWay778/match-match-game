import IUser from "../user";
import IConnector from "./connector";

interface IRegistrationConnector extends IConnector {
  closeHandler: () => void;
  registerUser: (newUser: IUser) => void;
}

export default IRegistrationConnector;