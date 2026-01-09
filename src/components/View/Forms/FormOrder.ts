import { IEvents } from "../../base/Events";
import { pageEvents } from "../../base/pageEvents";
import { Form } from "./Form";

export interface IOrderForm {
    payment: string;
    address: string; 
}

export class FormOrder extends Form<IOrderForm>{
    protected paymentButton: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement | null;
    protected nextButton: HTMLButtonElement | null;

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.paymentButton = container.querySelectorAll('.button_alt');
        this.nextButton = container.querySelector('.order__button');
        this.addressInput = container.querySelector('input[name="address"]');
        this.addressInput?.addEventListener ('input', () => {
            this.events.emit(pageEvents.order, {value: this.addressInput?.value, field: 'address'});
        })
        this.paymentButton.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit(pageEvents.order, { field: 'payment', value: button.name });
                this.payment = button.name;
            });
        });
        this.nextButton?.addEventListener('click', () => {
            this.events?.emit(pageEvents.contactForm);
          });
    }

    set payment(method: string) {
        this.paymentButton.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === method)
        })
    }

}
