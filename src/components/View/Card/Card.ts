import { Component } from "../../base/Component";

export abstract class Card<T> extends Component<T> {
    protected titleEl: HTMLElement | null;
    protected priceEl: HTMLElement | null;

    constructor (container: HTMLElement) {
        super(container);
        this.titleEl = container.querySelector('.card__title');
        this.priceEl = container.querySelector('.card__price');
    }

    set title(value: string) {
        if (this.titleEl) {
            this.titleEl.textContent = value;
        }
    }

    set price(value: number | null) {
        if (this.priceEl) {
            this.priceEl.textContent = value === null ? 'Бесценно' : `${value} синапсов`
        }
    }
}