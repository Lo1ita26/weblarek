import { IProduct } from "../../../types";
import { Card } from "./Card";

export type TCardShoppingCart = Pick<IProduct, 'title' | 'price'>;

export interface IActionsWithShoppingCart {
    onDelete?: () => void;
  }

export class CardShoppingCart extends Card <TCardShoppingCart> {
protected index: HTMLElement | null;
protected deleteButton: HTMLButtonElement | null;

constructor (container: HTMLElement, actions?: IActionsWithShoppingCart) {
    super(container);
    this.index = this.container.querySelector('.basket__item-index');
    this.deleteButton = this.container.querySelector('.basket__item-delete');
    if (actions?.onDelete) {
        this.deleteButton?.addEventListener('click', actions.onDelete)

    }
}

indexSet(value: number): void {
    if (!this.index) return;
    this.index.textContent = String(value);
}
}