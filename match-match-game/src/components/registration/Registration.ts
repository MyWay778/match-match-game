import Helper from '../common/Helper';
import Form from './form/Form';
import s from './registration.scss';

class Registration {
  element: HTMLElement

  constructor() {
    this.element = Helper.createElement('aside', s.registration);
    const background = Helper.createElement('div', s.background);
    const modal = Helper.createElement('div', s.modal);
    const title =  Helper.createTextElement('h2', s.title, 'Register new Player');
    const form = new Form();

    modal.append(title, form.element);

    this.element.append(background, modal);
  }
}

export default Registration;