import { ValidationError } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { pageEvents } from "../../base/pageEvents";
import { Form } from "./Form";

export interface IOrderForm {
    payment: string;
    address: string; 
}

export class FormOrder extends Form<IOrderForm>{
    protected paymentButtons: HTMLButtonElement[];
    protected addressInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;
    protected errorsEl: HTMLElement;

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.nextButton = ensureElement<HTMLButtonElement>('.order__button', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        this.addressInput?.addEventListener ('input', () => {
            this.events.emit(pageEvents.order, {value: this.addressInput?.value, field: 'address'});
        })
        this.paymentButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit(pageEvents.order, { field: 'payment', value: button.name });
                this.payment = button.name;
            });
        });
        this.nextButton?.addEventListener('click', () => {
            this.events?.emit(pageEvents.contactForm);
          });
        this.errorsEl = ensureElement<HTMLElement>('.form__errors', this.container);
    }

    set payment(method: string) {
        this.paymentButtons.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === method)
        })
    }

    set address(value: string) {
        this.addressInput.value = value
    }

    setErrors(errors: ValidationError): void {
        const errorMessage = errors.payment || errors.address
        if (errorMessage) {
        this.errorsEl.textContent = errorMessage
        this.nextButton.disabled = true
    } else {
        this.errorsEl.textContent = ''
        this.nextButton.disabled = false
    }}
}
