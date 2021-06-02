import IHeader from "../components/header";
import IConnector from "./connector";

interface IHeadConnector extends IConnector<IHeader> {
  openRegister: () => void;
  connect: (header: IHeader) => void;
}

export default IHeadConnector;