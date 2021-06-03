import defaultAvatar from '../../../../assets/images/avatar.webp';
import BaseComponent from '../../../../shared/components/base-component/base-component';
import './image-uploader.scss';

class ImageUploader extends BaseComponent {
  private readonly input: HTMLInputElement;
  private readonly image: HTMLImageElement;
  private readonly label: HTMLLabelElement;
  private readonly labelError: HTMLLabelElement;

  constructor() {
    super('div', 'register-image-uploader');

    this.input = document.createElement('input');
    this.initInput();

    this.image = new Image();
    this.initImage();

    this.label = document.createElement('label');
    this.initLabel();

    this.labelError = document.createElement('label');
    this.labelError.classList.add('register-image-uploader__label-error');

    this.initElement();
    this.onInput();
  }

  getValue(): File | undefined {
    const value = this.input.files;
    if (value) {
      return value[0];
    }
    return undefined;
  }

  private onInput(): void {
    this.input.oninput = () => {
      const files = this.input?.files;

      if (files) {
        for (let i = 0; i < files?.length; i++) {
          if (!files[i].type.includes('image')) {
            this.labelError.textContent = 'Invalid image file format';
            return;
          }

          this.labelError.textContent = '';
          const url = window.URL.createObjectURL(files[i]);
          if (url) {
            this.image.src = url;
            break;
          }
        }
      }
    };
  }

  private initElement() {
    this.element.append(this.label, this.input, this.labelError);
  }

  private initLabel() {
    this.label.classList.add('register-image-uploader__label');
    this.label.htmlFor = 'register-image-uploader__input';
    this.label.append(this.image);
  }

  private initImage(): void {
    this.image.src = defaultAvatar;
    this.image.classList.add('register-image-uploader__image');
  }

  private initInput(): void {
    this.input.type = 'file';
    this.input.id = 'register-image-uploader__input';
    this.input.classList.add('register-image-uploader__input');
    this.input.accept = 'image/*';
  }
}

export default ImageUploader;
