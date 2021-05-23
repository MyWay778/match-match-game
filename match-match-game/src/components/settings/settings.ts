import { ISettings, ISettingsConnector } from '../../typing/interfaces';
import ConnectorComponent from '../../shared/components/base-component/connector-component';
import Helper from '../common/helper';
import SelectSetting from './select-setting/select-setting';
import './settings.scss';

class Settings extends ConnectorComponent {
  connector: null | ISettingsConnector = null;
  private readonly gameCardsSetting: SelectSetting;
  private readonly gameDifficultySetting: SelectSetting;
  private settings: ISettings | null = null;

  constructor(root: HTMLElement) {
    super('main', 'game-settings', root);
    const container = Helper.createElement('div', 'game-settings__container');

    this.gameCardsSetting = new SelectSetting(
      'Game cards',
      'game-setting-cards'
    );
    this.gameCardsSetting.addItem('Animals', 'animals');
    this.gameCardsSetting.addItem('Cars', 'cars');

    this.gameDifficultySetting = new SelectSetting(
      'Difficulty',
      'game-setting-difficulty'
    );
    this.gameDifficultySetting.addItem('3X4', '6');
    this.gameDifficultySetting.addItem('4X4', '8');
    this.gameDifficultySetting.addItem('6X6', '18');

    container.append(this.gameCardsSetting.element, this.gameDifficultySetting.element);
    this.element.append(container);
  }

  connect(connector: ISettingsConnector): void {
    this.connector = connector;
    this.connector.connect(this);

    this.gameCardsSetting.getValue(this.connector.setCardCategory);
    this.gameDifficultySetting.getValue(this.connector.setGameDifficulty);
  }

  setValues = (settings: ISettings): void => {
    this.gameCardsSetting.select(settings.categories);
    this.gameDifficultySetting.select(settings.difficulty);
  }
}

export default Settings;
