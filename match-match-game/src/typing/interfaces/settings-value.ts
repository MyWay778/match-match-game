import TCategories from "../types/categories";
import TDifficulty from "../types/difficulty";

interface ISettingsValue {
  difficulty: TDifficulty,
  categories: TCategories
}

export default ISettingsValue;