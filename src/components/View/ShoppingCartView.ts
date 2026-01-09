import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { pageEvents } from '../base/pageEvents';

interface IShoppingCart {
  products: HTMLElement[];
  total: number;
}

export class ShoppingCartView extends Component<IShoppingCart> {
  protected titleShoppingCart: HTMLElement | null;
  protected listShoppingCart: HTMLElement;
  protected priceShoppingCart: HTMLElement;
  protected buttonShoppingCart: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.titleShoppingCart = ensureElement<HTMLElement>('.modal__title', this.container);
    this.listShoppingCart = ensureElement<HTMLElement>('.basket__list', this.container);
    this.priceShoppingCart = ensureElement<HTMLElement>('.basket__price', this.container);
    this.buttonShoppingCart = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.buttonShoppingCart.addEventListener('click', () => {
      this.events?.emit(pageEvents.cart);
    });
    this.basket = [];
  };

  set total(value: number) {
    this.priceShoppingCart.textContent = `${value} синапсов`;
  };

  set buttonText(value: string) {
    this.buttonShoppingCart.textContent = String(value);
  };

  set buttonDisabled(value: boolean) {
    this.buttonShoppingCart.disabled = value;
  };

  set basket(items: HTMLElement[]) {
    if (items.length > 0) {
      this.buttonDisabled = false;
      this.listShoppingCart.replaceChildren(...items);
    } else {
      this.buttonDisabled = true;
      this.listShoppingCart.replaceChildren();
    }
        
  };
};