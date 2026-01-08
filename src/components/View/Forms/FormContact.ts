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

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.emailInput = this.container.querySelector('input[name="email"]') as HTMLInputElement;
        this.emailInput.addEventListener ('input', () => {
            this.events.emit(pageEvents.emailForm, {field: 'email', value: this.emailInput.value})
        })
        this.phoneInput = this.container.querySelector('input[name="phone"]') as HTMLInputElement;
        this.phoneInput.addEventListener ('input', () => {
            this.events.emit(pageEvents.emailForm, {field: 'phone', value: this.phoneInput.value})
        })
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(pageEvents.submit);
          });
    }

    set emailSet(value: string) {
        this.emailInput.value = value;
    }

    set phoneSet(value: string) {
        this.phoneInput.value = value;
    }
}