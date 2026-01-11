import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class Form<T> extends Component<T> {
    errors: HTMLElement;
    submitButton: HTMLButtonElement;

    constructor  (protected form: HTMLFormElement) {
        super(form);
        this.errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
    }

    set disabledSubmitButton(state: boolean) {
        this.submitButton.disabled = state;
    }
}