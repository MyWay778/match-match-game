import IGame from '../interfaces/components/game';
import IHeader from '../interfaces/components/header';
import IScore from '../interfaces/components/score';
import ISettings from '../interfaces/components/settings';

type TConnectArguments = IHeader | IGame | IScore | ISettings;

export default TConnectArguments;
