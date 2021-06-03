import IUser from '../user';

interface IForm {
  addCancelHandler(handler: () => void): void;
  addNewUserHandler(handler: (newUser: IUser) => void): void;
}

export default IForm;
