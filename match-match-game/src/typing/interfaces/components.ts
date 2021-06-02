import IAbout from "./components/about";
import IGame from "./components/game";
import IHeader from "./components/header";
import IRegistration from "./components/registration";
import IScore from "./components/score";
import ISettings from "./components/settings";

interface IComponents {
  header: null | IHeader;
  about: null | IAbout;
  registration: null | IRegistration;
  game: null | IGame;
  score: null | IScore;
  settings: null | ISettings;
}

export default IComponents;