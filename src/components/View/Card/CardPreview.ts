import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { Card } from "./Card";

export type TCardPreview = Pick<IProduct, 'description' | 'image' | 'category'>;
type categoryKey = keyof typeof categoryMap;

export interface ICardPreview{
    onClick?: () => void;
}

export class CardPreview extends Card <TCardPreview> {
    protected description: HTMLElement;
    protected button: HTMLButtonElement;
    protected image: HTMLImageElement; 
    protected category: HTMLElement;

    constructor (container: HTMLElement, protected actions: ICardPreview) {
        super(container);
        this.description = this.container.querySelector('.card__text') as HTMLElement;
        this.button = this.container.querySelector('.card__button') as HTMLButtonElement;
        this.image = this.container.querySelector('.card__image') as HTMLImageElement;
        this.category = this.container.querySelector('.card__category') as HTMLElement;

        this.button.addEventListener('click', () => {
            this.actions.onClick?.();
    })
}

set descriptionSet(value: string) {
    this.description.textContent = value;
}

set categorySet(value: string) {
        this.category.textContent = value;
        for (const key in categoryMap) {
            this.category.classList.toggle(categoryMap[key as categoryKey], key === value);
        }
    }

set imageSet(value: string) {
    this.image.src = value;
}

set availability(value: boolean) {
  this.button.textContent = value ? 'Удалить из корзины' : 'В корзину';
}

setdisabledButton(value: boolean): void {
  if (this.button.disabled) {
    return
  } if (value) {
    this.button.textContent = 'Недоступно';
  } else {
    this.button.textContent = 'В корзину';
  }
}
}
