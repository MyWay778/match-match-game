import IUserData from '../user-data';
import IBaseComponent from './base-component';

interface IHeader extends IBaseComponent {
  registerUser(userData: IUserData): void;
  makeActiveLink(linkNumber: number): void;
  setIsGame(isGame: boolean): void;
}

export default IHeader;
