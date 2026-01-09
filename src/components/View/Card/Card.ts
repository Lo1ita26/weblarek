import { Component } from "../../base/Component";
import { ensureElement } from "../../../utils/utils";

export abstract class Card<T> extends Component<T> {
    protected titleEl: HTMLElement | null;
    protected priceEl: HTMLElement | null;

    constructor (container: HTMLElement) {
        super(container);
        this.titleEl = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceEl = ensureElement<HTMLElement>('.card__price', this.container);
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