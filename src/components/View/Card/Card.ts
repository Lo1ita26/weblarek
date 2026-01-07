import { Component } from "../../base/Component";

export abstract class Card<T> extends Component<T> {
    protected title: HTMLElement | null;
    protected price: HTMLElement | null;

    constructor (container: HTMLElement) {
        super(container);
        this.title = container.querySelector('.card__title');
        this.price = container.querySelector('.card__price');
    }

    set titleSet(value: string) {
        if (this.title) {
            this.title.textContent = value;
        }
    }

    set priceSet(value: number | null) {
        if (this.price) {
            this.price.textContent = value === null ? 'Бесценно' : `${value} синапсов`
        }
    }
}