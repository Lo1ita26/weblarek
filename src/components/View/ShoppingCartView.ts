import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { pageEvents } from '../base/pageEvents';

interface IShoppingCart {
  products: HTMLElement[];
  total: number;
}

export class ShoppingCartView extends Component<IShoppingCart> {
  protected titleShoppingCart: HTMLElement;
  protected listShoppingCart: HTMLElement;
  protected priceShoppingCart: HTMLElement;
  protected buttonShoppingCart: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.titleShoppingCart = this.container.querySelector('.modal__title') as HTMLElement;
    this.listShoppingCart = this.container.querySelector('.basket__list') as HTMLElement;
    this.priceShoppingCart = this.container.querySelector('.basket__price') as HTMLElement;
    this.buttonShoppingCart = this.container.querySelector('.basket__button') as HTMLButtonElement;
    this.buttonShoppingCart.addEventListener('click', () => {
      this.events?.emit(pageEvents.cart);
    });
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
      this.buttonText = 'Оформить';
      this.buttonDisabled = false;
      this.listShoppingCart.replaceChildren(...items);
    } else {
      const emptyCart = document.createElement('p');
      this.buttonText = 'Оформить';
      emptyCart.textContent = 'Корзина пуста';
      this.buttonDisabled = true;
      this.listShoppingCart.replaceChildren(emptyCart);
    }
        
  };
};