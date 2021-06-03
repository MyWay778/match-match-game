import IUserDB from '../user-db';
import IBaseComponent from './base-component';

interface IScore extends IBaseComponent {
  setData(data: IUserDB[]): void;
}

export default IScore;
