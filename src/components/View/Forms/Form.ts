import { Component } from "../../base/Component";

export abstract class Form<T> extends Component<T> {
    errors: HTMLElement;
    submitButton: HTMLButtonElement;

    constructor  (protected form: HTMLFormElement) {
        super(form);
        this.errors = form.querySelector('.form__errors') as HTMLElement;
        this.submitButton = form.querySelector('.button[type="submit"]') as HTMLButtonElement;
    }

    set disabledSubmitButton(state: boolean) {
        this.submitButton.disabled = state;
    }
}