import ISettingsValue from "./settings-value";
import IUserDB from "./user-db";

interface IState {
  name: null | string;
  email: null | string;
  image: null | File;
  score: null | number;
  bestScores: IUserDB[];
  gameSettings: ISettingsValue
}

export default IState;