import TCategories from "../../types/categories";
import TDifficulty from "../../types/difficulty";
import IGameResult from "../game-result";
import ISettingsValue from "../settings-value";
import IUser from "../user";
import IUserDB from "../user-db";

interface IStore {
  saveUser(user: IUser): void;
  isUserRegister(): boolean;
  saveResult(result: IGameResult): void;
  getBestScore(): Promise<IUserDB[]>;
  setGameDifficulty(difficulty: TDifficulty): void;
  setCardCategory(category: TCategories): void;
  getSettings(): ISettingsValue;
}

export default IStore;