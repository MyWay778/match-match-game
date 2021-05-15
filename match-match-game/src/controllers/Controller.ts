import App from "../App";


export interface IUser {
  firstName: string,
  lastName: string,
  email: string
}

class Controller {
  connector: any

  constructor(private app: App) {
    this.connector = {
      update: this.updateRoute,
      registration: {
        closeHandler: this.closeRegistration,
        registerUser: this.registerUser
      }
    };
  }
  
  updateRoute = (newRoute:string):void => {
    if (newRoute === 'about') {
      console.log('about');

    } else if (newRoute === 'registration') {
      console.log('show reg');
      this.app.showRegistration();
    }
  }

  closeRegistration = ():void => {
    this.app.closeRegistration();
    window.history.pushState(null, 'about', '#about');
  }

  registerUser = (newUser: IUser ):void => {
    console.log(newUser);
    this.closeRegistration();
  }
}

export default Controller;