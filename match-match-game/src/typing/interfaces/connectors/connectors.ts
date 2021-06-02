import IGameConnector from "./game-connector";
import IHeadConnector from "./header-connector";
import IRegistrationConnector from "./registration-connector";
import IScoreConnector from "./score-connector";
import ISettingsConnector from "./settings-connector";
import ISubscriber from "./subscriber";

interface IConnectors {
  router: ISubscriber;
  header: IHeadConnector;
  registration: IRegistrationConnector;
  game: IGameConnector;
  score: IScoreConnector;
  settings: ISettingsConnector;
}

export default IConnectors;