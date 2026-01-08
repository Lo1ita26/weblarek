import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { Card } from "./Card";

export type TCardPreview = Pick<IProduct, 'description' | 'image' | 'category'>;
type categoryKey = keyof typeof categoryMap;

export interface ICardPreview{
    onClick?: () => void;
}

export class CardPreview extends Card <TCardPreview> {
    protected descriptionEl: HTMLElement;
    protected buttonEl: HTMLButtonElement;
    protected imageEl: HTMLImageElement; 
    protected categoryEl: HTMLElement;

    constructor (container: HTMLElement, protected actions: ICardPreview) {
        super(container);
        this.descriptionEl = this.container.querySelector('.card__text') as HTMLElement;
        this.buttonEl = this.container.querySelector('.card__button') as HTMLButtonElement;
        this.imageEl = this.container.querySelector('.card__image') as HTMLImageElement;
        this.categoryEl = this.container.querySelector('.card__category') as HTMLElement;

        this.buttonEl.addEventListener('click', () => {
            this.actions.onClick?.();
    })
}

set description(value: string) {
    this.descriptionEl.textContent = value;
}

set category(value: string) {
        this.categoryEl.textContent = value;
        for (const key in categoryMap) {
            this.categoryEl.classList.toggle(categoryMap[key as categoryKey], key === value);
        }
    }

set image(value: string) {
    this.imageEl.src = value;
}

set availability(value: boolean) {
  this.buttonEl.textContent = value ? 'Удалить из корзины' : 'В корзину';
}

setdisabledButton(value: boolean): void {
  if (value) {
    this.buttonEl.textContent = 'Недоступно';
    this.buttonEl.disabled = true;
  } else {
    this.buttonEl.textContent = 'В корзину';
    this.buttonEl.disabled = false;
  }
}}
