import IBaseComponent from "./base-component";
import IForm from "./form";

interface IRegistration extends IBaseComponent {
  form: IForm;
}

export default IRegistration;