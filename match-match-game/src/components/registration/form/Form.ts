import Helper from "../../common/Helper"
import s from './form.scss';
import defaultAvatar from '../../../assets/images/avatar.webp';
import FirstName from "./input/input";
import Input from "./input/input";

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

    //containers
    const firstContainer = Helper.createElement('div', s.firstContainer);
    const secondContainer = Helper.createElement('div', s.secondContainer);

    //firstName
    this.firstName = new Input('First Name');

    //lastName
    this.lastName = new Input('LastName');


    //email
    this.email = new Input('E-mail', 'email');
    
    //assembling first container
    firstContainer.append(this.firstName.element, this.lastName.element, this.email.element);
    
    //avatar
    this.avatar = new Image();
    this.avatar.src = defaultAvatar;
    
    //buttons
    this.addBtn = document.createElement('button');
    this.addBtn.innerText = "Add";

    this.cancelBtn = document.createElement('button');
    this.cancelBtn.innerText = 'Cancel'

    //assembling second container
    secondContainer.append(this.avatar, this.addBtn, this.cancelBtn);
    this.element.append(firstContainer, secondContainer);
  }
}

export default Form;