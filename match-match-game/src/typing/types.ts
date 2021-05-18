import About from "../components/about/About"
import Registration from "../components/registration/Registration"
import BaseComponent from "../shared/components/base-component/BaseComponent";


export type validate = {
  require: boolean,
  pattern: RegExp,
}

export type TComponent = Registration | About | BaseComponent;