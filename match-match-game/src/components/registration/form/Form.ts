import Helper from '../../common/helper';
import './form.scss';
import defaultAvatar from '../../../assets/images/avatar.webp';
import Input from './input/input';
import { IUser } from '../../../typing/interfaces';

const validationCreation =
  (
    input: Input,
    validate: (isValid: boolean) => void,
    isEmail = false
  ): ((value: string) => void) =>
    (value: string): void => {
      if (value === ' ') {
        input.setValue('');
        validate(false);
        return;
      }

      if (/^\d+$/g.test(value)) {
        input.invalid('Not only numbers!');
        validate(false);
        return;
      }

      if (value.length < 3) {
        input.invalid('Min 3 characters!');
        validate(false);
        return;
      }

      if (!isEmail) {
        const incorrectChar = value.match(/[~!@#$%*()_—+=|:;"'`<>,.?/^]/g);
        if (incorrectChar) {
          input.invalid(`Incorrect character: ${incorrectChar.toString()}`);
          validate(false);
          return;
        }
      }
      if (
        isEmail &&
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
      ) {
        input.invalid(`Incorrect email address!`);
        validate(false);
        return;
      }
      input.valid();
      validate(true);
    };

class Form {
  element: HTMLFormElement;
  firstName: Input;
  lastName: Input;
  email: Input;
  avatar: HTMLImageElement;
  addBtn: HTMLButtonElement;
  cancelBtn: HTMLButtonElement;

  constructor() {
    this.element = document.createElement('form');
    this.element.classList.add('register-form');

    // containers
    const firstContainer = Helper.createElement(
      'div',
      'register-form__first-container'
    );
    const secondContainer = Helper.createElement(
      'div',
      'register-form__second-container'
    );

    this.firstName = new Input('First Name', 'text', {
      maxLength: 30,
    });
    this.firstName.oninput(validationCreation(this.firstName, this.validate));

    this.lastName = new Input('LastName', 'text', {
      maxLength: 30,
    });
    this.lastName.oninput(validationCreation(this.lastName, this.validate));

    this.email = new Input('E-mail', 'email', {
      maxLength: 30,
    });
    const isEmail = true;
    this.email.oninput(validationCreation(this.email, this.validate, isEmail));

    // assembling first container
    firstContainer.append(
      this.firstName.element,
      this.lastName.element,
      this.email.element
    );

    // avatar
    this.avatar = new Image();
    this.avatar.src = defaultAvatar;

    // buttons
    const btnContainer = Helper.createElement(
      'div',
      'register-form__button-container'
    );
    this.addBtn = document.createElement('button');
    this.addBtn.classList.add(
      'register__button',
      'register__button_add',
      'register__button_disabled'
    );
    this.addBtn.type = 'submit';
    this.addBtn.innerText = 'Add';
    this.addBtn.disabled = true;

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.classList.add('register__button', 'register__button_cancel');
    this.cancelBtn.innerText = 'Cancel';
    btnContainer.append(this.addBtn, this.cancelBtn);

    // assembling second container
    secondContainer.append(this.avatar, btnContainer);
    this.element.append(firstContainer, secondContainer);
  }

  addCancelHandler(handler: () => void): void {
    this.cancelBtn.onclick = handler;
  }

  addNewUserHandler(handler: (newUser: IUser) => void): void {
    this.element.addEventListener('submit', () => {
      const newUser: IUser = {
        firstName: this.firstName.getValue(),
        lastName: this.lastName.getValue(),
        email: this.email.getValue(),
        image: null,
      };
      handler(newUser);
    });
  }

  private validate = (isValid: boolean): void => {
    console.log('validate');

    if (!isValid) {
      if (!this.addBtn.disabled) {
        this.addBtn.disabled = true;
      }
      if (!this.addBtn.classList.contains('register__button_disabled')) {
        this.addBtn.classList.add('register__button_disabled');
      }
    } else if (
      this.firstName.checkValid() &&
      this.lastName.checkValid() &&
      this.email.checkValid()
    ) {
      this.addBtn.disabled = false;
      this.addBtn.classList.remove('register__button_disabled');
    }
  };
}

export default Form;
