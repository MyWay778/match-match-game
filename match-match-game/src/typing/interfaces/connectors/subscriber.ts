import IConnector from "./connector";

interface ISubscriber extends IConnector {
  update: (newRoute: string) => void;
}

export default ISubscriber;