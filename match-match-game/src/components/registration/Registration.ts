import Helper from '../common/Helper';
import Form from './form/Form';
import s from './registration.scss';

class Registration {
  element: HTMLElement

  constructor( private connector:any ) {
    this.element = Helper.createElement('aside', s.registration);

    const background = Helper.createElement('div', s.background);
    background.onclick = connector.closeHandler;

    const modal = Helper.createElement('div', s.modal);
    const title =  Helper.createTextElement('h2', s.title, 'Register new Player');
    const form = new Form();

    form.addCancelHandler(connector.closeHandler);
    form.addNewUserHandler(connector.registerUser);

    modal.append(title, form.element);

    this.element.append(background, modal);
  }
}

export default Registration;