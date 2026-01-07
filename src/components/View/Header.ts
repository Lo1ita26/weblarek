import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { pageEvents } from "../base/pageEvents";

export interface IHeaderData {
    counter: number;
  }

export class Header extends Component<IHeaderData> {
    protected ShoppingCartButton: HTMLButtonElement;
    protected counterElement: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.ShoppingCartButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
        this.ShoppingCartButton.addEventListener('click', () => {
            this.events.emit(pageEvents.basketOpen)
        });
        this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    }

    set counter(value: number) {
        this.counterElement.textContent = String(value);
    }
}