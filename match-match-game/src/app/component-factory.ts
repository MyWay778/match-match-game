import About from '../components/about/about';
import Game from '../components/game/game';
import Header from '../components/header/header';
import Registration from '../components/registration/registration';
import Score from '../components/score/score';
import Settings from '../components/settings/settings';
import IAbout from '../typing/interfaces/components/about';
import IGame from '../typing/interfaces/components/game';
import IHeader from '../typing/interfaces/components/header';
import IRegistration from '../typing/interfaces/components/registration';
import IScore from '../typing/interfaces/components/score';
import ISettings from '../typing/interfaces/components/settings';

interface IComponentList {
  registration: new (parent: HTMLElement) => Registration;
  game: new (parent: HTMLElement) => Game;
  score: new (parent: HTMLElement) => Score;
  settings: new (parent: HTMLElement) => Settings;
  header: new (parent: HTMLElement) => Header;
  about: new (parent: HTMLElement) => About;
}

export type TComponentListKeys = keyof IComponentList;
type TFactoryInstances =
  | IRegistration
  | IGame
  | IScore
  | ISettings
  | IHeader
  | IAbout;

class ComponentFactory {
  componentList: IComponentList;

  constructor() {
    this.componentList = {
      registration: Registration,
      game: Game,
      score: Score,
      settings: Settings,
      header: Header,
      about: About,
    };
  }

  getInstance(
    componentName: TComponentListKeys,
    root: HTMLElement
  ): TFactoryInstances {
    return new this.componentList[componentName](root) || null;
  }
}

export default ComponentFactory;
