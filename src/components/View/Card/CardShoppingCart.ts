import { IProduct } from "../../../types";
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
    this.index = this.container.querySelector('.basket__item-index') as HTMLElement;
    this.deleteButton = this.container.querySelector('.basket__item-delete') as HTMLButtonElement;
    if (actions?.onDelete) {
        this.deleteButton.addEventListener('click', actions.onDelete)

    }
}

indexSet(value: number): void {
    this.index.textContent = String(value);
}
}