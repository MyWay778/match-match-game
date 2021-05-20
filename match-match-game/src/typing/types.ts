import About from "../components/about/about"
import Registration from "../components/registration/registration"
import BaseComponent from "../shared/components/base-component/base-component";


export type validate = {
  require: boolean,
  pattern: RegExp,
}

export type TComponent = Registration | About | BaseComponent;