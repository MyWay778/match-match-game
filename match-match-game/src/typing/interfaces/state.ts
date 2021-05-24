import ISettingsValue from "./settings-value";
import IUserDB from "./user-db";

interface IState {
  name: null | string;
  email: null | string;
  score: null | number;
  bestScores: IUserDB[];
  gameSettings: ISettingsValue
}

export default IState;