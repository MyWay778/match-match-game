import TConnectArguments from "../../types/connect-arguments";
import IConnector from "./connector";

interface ISubscriber extends IConnector<TConnectArguments> {
  update: (newRoute: string) => void;
}

export default ISubscriber;