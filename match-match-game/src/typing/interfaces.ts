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

// export interface IRegistrationConnector {
//   closeHandler: () => void;
//   registerUser: (newUser: IUser) => void;
// }

export interface IComponent {
  name: string;
  component: null | BaseComponent;
}

export interface ISubscriber {
  update: (newRoute: string) => void;
}

// tslint:disable-next-line
export interface IConnector {}

export interface IHeadConnector extends IConnector {
  openRegister: () => void;
  connect: (header: Header) => void;
}
export interface IUserPanelConnector extends IHeadConnector {}

export interface IRegistrationConnector extends IConnector {
  closeHandler: () => void;
  registerUser: (newUser: IUser) => void;
}
export interface IGameConnector extends IConnector {
  gameEndHandler: (result: IGameResult) => void;
  connect: (game: Game) => void;
}
export interface IScoreConnector extends IConnector {
  getData: () => Promise<any>;
  connect: (score: Score) => void;
}

export interface IScoreEntry {
  user: null | IUser;
  score: number;
}

export interface IState {
  user: null | IUser;
  score: null | number;
  bestScores: IScoreEntry[];
  gameSettings: {
    difficult: string;
  };
}
