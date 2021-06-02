import ConnectorComponent from '../../shared/components/base-component/connector-component';
import IRegistration from '../../typing/interfaces/components/registration';
import IRegistrationConnector from '../../typing/interfaces/connectors/registration-connector';
import Helper from '../common/helper';
import Form from './form/form';
import './registration.scss';

class Registration extends ConnectorComponent<IRegistrationConnector> implements IRegistration {
  private readonly background: HTMLElement;
  form: Form;

  constructor(parent: HTMLElement) {
    super('aside', 'registration', parent);
    this.background = Helper.createElement('div', 'registration__background');

    const modal = Helper.createElement('div', 'registration-modal');
    const title = Helper.createTextElement(
      'h2',
      'registration-modal__title',
      'Register new Player'
    );
    this.form = new Form();

    modal.append(title, this.form.element);
    this.element.append(this.background, modal);
  }

  connect(connector: IRegistrationConnector): void {
    this.background.onclick = connector.closeHandler;
    this.form.addCancelHandler(connector.closeHandler);
    this.form.addNewUserHandler(connector.registerUser);
  }
}

export default Registration;
