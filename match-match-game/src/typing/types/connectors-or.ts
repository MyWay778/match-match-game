import IGameConnector from '../interfaces/connectors/game-connector';
import IHeadConnector from '../interfaces/connectors/header-connector';
import IRegistrationConnector from '../interfaces/connectors/registration-connector';
import IScoreConnector from '../interfaces/connectors/score-connector';
import ISettingsConnector from '../interfaces/connectors/settings-connector';

type TConnectorsOr =
  | IHeadConnector
  | IRegistrationConnector
  | IGameConnector
  | IScoreConnector
  | ISettingsConnector;

export default TConnectorsOr;
