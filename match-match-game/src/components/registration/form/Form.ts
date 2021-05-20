import Helper from "../../common/helper"
import s from './form.scss';
import defaultAvatar from '../../../assets/images/avatar.webp';
import Input from "./input/input";
import { IUser } from "../../../typing/interfaces";

class Form { 
  element: HTMLFormElement
  firstName: Input
  lastName: Input
  email: Input
  avatar: HTMLImageElement
  addBtn: HTMLButtonElement
  cancelBtn: HTMLButtonElement

  constructor() {
    this.element = document.createElement('form');
    this.element.classList.add(s.form);

    // containers
    const firstContainer = Helper.createElement('div', s.firstContainer);
    const secondContainer = Helper.createElement('div', s.secondContainer);

    this.firstName = new Input('First Name', 'text', {required: true, pattern: "^[a-zA-Z,'.\\-\\s]*$", maxLength: 30});
    this.lastName = new Input('LastName', 'text', {required: true, pattern: "^[a-zA-Z,'.\\-\\s]*$", maxLength: 30});
    this.email = new Input('E-mail', 'email', {required: true, pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", maxLength: 30});
    
    // assembling first container
    firstContainer.append(this.firstName.element, this.lastName.element, this.email.element);
    
    // avatar
    this.avatar = new Image();
    this.avatar.src = defaultAvatar;
    
    // buttons
    const btnContainer = Helper.createElement('div', s.btnContainer);
    this.addBtn = document.createElement('button');
    this.addBtn.classList.add(s.button, s.addBtn);
    this.addBtn.type = "submit"; 
    this.addBtn.innerText = "Add";

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.classList.add(s.button, s.cancelBtn);
    this.cancelBtn.innerText = 'Cancel'
    btnContainer.append(this.addBtn, this.cancelBtn);

    // assembling second container
    secondContainer.append(this.avatar, btnContainer);
    this.element.append(firstContainer, secondContainer);
  }

  addCancelHandler( handler:() => void ) {
    this.cancelBtn.onclick = handler;
  }

  addNewUserHandler(handler:(newUser: IUser) => void) {

    this.element.addEventListener('submit', ()=> {
      const newUser: IUser = {
        firstName: this.firstName.getValue(),
        lastName: this.lastName.getValue(),
        email: this.email.getValue(),
        image: null
      }
      handler(newUser);
    });
  }
}

export default Form;