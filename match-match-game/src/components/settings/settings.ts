import ConnectorComponent from '../../shared/components/base-component/connector-component';
import Helper from '../common/helper';
import SelectSetting from './select-setting/select-setting';
import './settings.scss';

class Settings extends ConnectorComponent {
  constructor(root: HTMLElement) {
    super('main', 'game-settings', root);
    const container = Helper.createElement('div', 'game-settings__container');

    const gameCardsSetting = new SelectSetting(
      'Game cards',
      'game-setting-cards'
    );
    gameCardsSetting.addItem('Animals', 'animals');
    gameCardsSetting.addItem('Cars', 'cars');

    const gameDifficultySetting = new SelectSetting(
      'Difficulty',
      'game-setting-difficulty'
    );
    gameDifficultySetting.addItem('3X4', '3x4');
    gameDifficultySetting.addItem('4X4', '4x4');
    gameDifficultySetting.addItem('6X6', '6x6');

    container.append(gameCardsSetting.element, gameDifficultySetting.element);
    this.element.append(container);
  }
}

export default Settings;
