import IBaseComponent from "./components/base-component";

interface IComponent {
  name: string;
  component: null | IBaseComponent;
}

export default IComponent;