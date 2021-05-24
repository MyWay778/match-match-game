import IScore from "../components/score";
import IUserDB from "../user-db";
import IConnector from "./connector";

interface IScoreConnector extends IConnector {
  getData: () => Promise<IUserDB[]>;
  connect: (score: IScore) => void;
}

export default IScoreConnector;