import ISettingsValue from '../settings-value';
import IBaseComponent from './base-component';

interface ISettings extends IBaseComponent {
  setValues(settings: ISettingsValue): void;
}

export default ISettings;
