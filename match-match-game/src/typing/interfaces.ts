import About from 'src/components/about/about';
import Registration from 'src/components/registration/registration';
import Settings from 'src/components/settings/settings';
import Game from '../components/game/game';
import Header from '../components/header/header';
import Score from '../components/score/score';
import BaseComponent from '../shared/components/base-component/base-component';

export interface IUserData {
  userImage: string | null;
}

export interface IGameResult {
  mistakes: number;
  time: number;
}

// export interface IGameConnector {
//   gameEndHandler: (result: IGameResult) => void;
// }

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  image: null;
}

export interface IUserDB {
  name: string,
  email: string,
  score: number,
  id?: number
} 

// export interface IRegistrationConnector {
//   closeHandler: () => void;
//   registerUser: (newUser: IUser) => void;
// }

export interface IComponent {
  name: string;
  component: null | BaseComponent;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConnector {}

export interface ISubscriber extends IConnector{
  update: (newRoute: string) => void;
}

export interface IHeadConnector extends IConnector {
  openRegister: () => void;
  connect: (header: Header) => void;
}

export type IUserPanelConnector = IHeadConnector

export interface IRegistrationConnector extends IConnector {
  closeHandler: () => void;
  registerUser: (newUser: IUser) => void;
}
export interface IGameConnector extends IConnector {
  gameEndHandler: (result: IGameResult) => void;
  connect: (game: Game) => void;
}
export interface IScoreConnector extends IConnector {
  getData: () => Promise<IUserDB[]>;
  connect: (score: Score) => void;
}

export interface IScoreEntry {
  user: null | string;
  email: null | string;
  score: number;
}

export interface IState {
  name: null | string;
  email: null | string;
  score: null | number;
  bestScores: IUserDB[];
  gameSettings: {
    difficult: string;
  };
}


export interface IComponents {
  header: null | Header,
  about: null | About,
  registration: null | Registration,
  game: null | Game,
  score: null | Score,
  settings: null | Settings
}

export interface IConnectors {
  router: ISubscriber;
  header: IHeadConnector;
  registration: IRegistrationConnector;
  game: IGameConnector;
  score: IScoreConnector;
}

export type TConnectors = IHeadConnector & IRegistrationConnector & IGameConnector & IScoreConnector;