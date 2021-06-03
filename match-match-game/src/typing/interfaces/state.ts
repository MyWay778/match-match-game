import ISettingsValue from './settings-value';
import IUserDB from './user-db';

interface IState {
  name?: string;
  email?: string;
  image?: File;
  score?: number;
  bestScores: IUserDB[];
  gameSettings: ISettingsValue;
}

export default IState;
