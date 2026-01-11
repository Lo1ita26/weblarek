import { ValidationError } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { pageEvents } from "../../base/pageEvents";
import { Form } from "./Form"

export interface IContactForm {
    email: string;
    phone: string; 
}

export class FormContact extends Form<IContactForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected errorsEl: HTMLElement;
    protected payButton: HTMLButtonElement;

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.emailInput.addEventListener ('input', () => {
            this.events.emit(pageEvents.emailForm, {field: 'email', value: this.emailInput.value})
        })
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
        this.phoneInput.addEventListener ('input', () => {
            this.events.emit(pageEvents.emailForm, {field: 'phone', value: this.phoneInput.value})
        })
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(pageEvents.submit);
          });
        this.errorsEl = ensureElement<HTMLElement>('.form__errors', this.container);
        this.payButton = ensureElement<HTMLButtonElement>('.button', this.container);
    }

    set emailSet(value: string) {
        this.emailInput.value = value;
    }

    set phoneSet(value: string) {
        this.phoneInput.value = value;
    }

    setErrors(errors: ValidationError): void {
            const errorMessage = errors.email || errors.phone
            if (errorMessage) {
            this.errorsEl.textContent = errorMessage
            this.payButton.disabled = true
        } else {
            this.errorsEl.textContent = ''
            this.payButton.disabled = false
        }}
}