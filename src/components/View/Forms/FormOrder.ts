import { IEvents } from "../../base/Events";
import { pageEvents } from "../../base/pageEvents";
import { Form } from "./Form";

export interface IOrderForm {
    payment: string;
    address: string; 
}

export class FormOrder extends Form<IOrderForm>{
    protected paymentButton: NodeListOf<HTMLButtonElement>;
    protected addressInput: HTMLInputElement;

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);
        this.paymentButton = container.querySelectorAll('.button_alt');
        this.addressInput = container.querySelector('input[name="address"]') as HTMLInputElement;
        this.paymentButton.forEach((button) => {
            button.addEventListener('click', () => {
                this.events.emit(pageEvents.order, { field: 'payment', value: button.name });
                this.events.emit(pageEvents.buyer);
            });
        });
    }

    set payment(method: string) {
        this.paymentButton.forEach((button) => {
            button.classList.toggle('button_alt-active', button.name === method)
        })
    }
}
