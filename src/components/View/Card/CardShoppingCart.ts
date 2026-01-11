import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

export type TCardShoppingCart = Pick<IProduct, 'title' | 'price'>;

export interface IActionsWithShoppingCart {
    onDelete?: () => void;
  }

export class CardShoppingCart extends Card <TCardShoppingCart> {
protected index: HTMLElement;
protected deleteButton: HTMLButtonElement;

constructor (container: HTMLElement, actions?: IActionsWithShoppingCart) {
    super(container);
    this.index = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    if (actions?.onDelete) {
        this.deleteButton?.addEventListener('click', actions.onDelete)

    }
}

indexSet(value: number): void {
    if (!this.index) return;
    this.index.textContent = String(value);
}
}