
export interface IUserData {
  userImage: string | null
}

export interface IGameResult {
  mistakes: number
  time: number
}

export interface IGameConnector {
  gameEndHandler: (result: IGameResult) => void
}

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  image: null
}

export interface IRegistrationConnector {
  closeHandler: () => void,
  registerUser: (newUser: IUser) => void;
}