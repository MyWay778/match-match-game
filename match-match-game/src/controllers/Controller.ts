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
      this.app.showAbout();

    } else if (newRoute === 'registration') {
      this.app.showRegistration();

    } else if (newRoute === 'game') {
      this.app.showGame();
    }
  }

  closeRegistration = ():void => {
    this.app.closeRegistration();
    window.location.hash = '#about';
  }

  registerUser = (newUser: IUser ):void => {
    this.closeRegistration();
    this.app.provideToHeaderNewUser({userImage: null});
  }
}

export default Controller;