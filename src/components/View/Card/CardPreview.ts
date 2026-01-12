import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { Card } from "./Card";
import { ensureElement } from "../../../utils/utils";
import { pageEvents } from "../../base/pageEvents";
import { IEvents } from "../../base/Events";

export type TCardPreview = Pick<IProduct, 'description' | 'image' | 'category'>;
type categoryKey = keyof typeof categoryMap;

export class CardPreview extends Card <TCardPreview> {
    protected descriptionEl: HTMLElement;
    protected buttonEl: HTMLButtonElement;
    protected imageEl: HTMLImageElement; 
    protected categoryEl: HTMLElement;

    constructor (container: HTMLElement, protected events: IEvents) {
        super(container);
        this.descriptionEl = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonEl = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);

        this.buttonEl.addEventListener('click', () => {
            this.events.emit(pageEvents.toggle);
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

set buttonText(value: boolean) {
  this.buttonEl.textContent = value ? 'Удалить из корзины' : 'В корзину';
}

setdisabledButton(value: boolean): void {
  if (value) {
    this.buttonEl.textContent = 'Недоступно';
    this.buttonEl.disabled = true;
  } else {
    this.buttonEl.disabled = false;
  }
}
}
