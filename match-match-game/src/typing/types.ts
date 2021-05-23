import About from "../components/about/about"
import Registration from "../components/registration/registration"
import BaseComponent from "../shared/components/base-component/base-component";


export type TValidate = {
  require: boolean,
  pattern: RegExp,
}

export type TComponent = Registration | About | BaseComponent;

export type TDifficulty = '6' | '8' | '18';

export type TCategories = 'animal' | 'cars';

export type TSettings = TDifficulty | TCategories;