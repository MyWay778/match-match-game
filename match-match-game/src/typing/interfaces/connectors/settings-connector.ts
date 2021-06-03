import TCategories from '../../types/categories';
import TDifficulty from '../../types/difficulty';
import ISettings from '../components/settings';
import IConnector from './connector';

interface ISettingsConnector extends IConnector<ISettings> {
  setCardCategory: (category: TCategories) => void;
  setGameDifficulty: (difficulty: TDifficulty) => void;
  connect: (settings: ISettings) => void;
}

export default ISettingsConnector;
