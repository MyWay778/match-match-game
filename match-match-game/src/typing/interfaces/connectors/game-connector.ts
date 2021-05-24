import IGame from "../components/game";
import IGameResult from "../game-result";
import IConnector from "./connector";

interface IGameConnector extends IConnector {
  gameEndHandler: (result: IGameResult) => void;
  connect: (game: IGame) => void;
}

export default IGameConnector;