import Game from '../components/game/Game';
import Header from '../components/header/Header';
import Score from '../components/score/Score';
import BaseComponent from '../shared/components/base-component/BaseComponent';

export interface IUserData {
  userImage: string | null;
}

export interface IGameResult {
  mistakes: number;
  time: number;
}

export interface IGameConnector {
  gameEndHandler: (result: IGameResult) => void;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  image: null;
}

export interface IRegistrationConnector {
  closeHandler: () => void;
  registerUser: (newUser: IUser) => void;
}

export interface IComponent {
  name: string;
  component: null | BaseComponent;
}

export interface ISubscriber {
  update: (newRoute: string) => void;
}

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
