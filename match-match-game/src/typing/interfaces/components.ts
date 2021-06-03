import IAbout from './components/about';
import IGame from './components/game';
import IHeader from './components/header';
import IRegistration from './components/registration';
import IScore from './components/score';
import ISettings from './components/settings';

interface IComponents {
  header: IHeader;
  about: IAbout;
  registration?: IRegistration;
  game?: IGame;
  score?: IScore;
  settings?: ISettings;
}

export default IComponents;
