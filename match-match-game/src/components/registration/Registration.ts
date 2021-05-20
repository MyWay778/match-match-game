import BaseComponent from '../../shared/components/base-component/base-component';
import ConnectorComponent from '../../shared/components/base-component/connector-component';
import { IRegistrationConnector } from '../../typing/interfaces';
import Helper from '../common/helper';
import Form from './form/form';
import s from './registration.scss';

class Registration extends ConnectorComponent{
  element: HTMLElement
  background: HTMLElement
  form: Form

  constructor(parent: HTMLElement) {
    super('aside', s.registration, parent);
    this.element = Helper.createElement('aside', s.registration);

    this.background = Helper.createElement('div', s.background);
    

    const modal = Helper.createElement('div', s.modal);
    const title =  Helper.createTextElement('h2', s.title, 'Register new Player');
    this.form = new Form();

    

    modal.append(title, this.form.element);
    this.element.append(this.background, modal);
  }

  connect(connector: IRegistrationConnector) {
    this.background.onclick = connector.closeHandler;
    this.form.addCancelHandler(connector.closeHandler);
    this.form.addNewUserHandler(connector.registerUser);
  }
}

export default Registration;