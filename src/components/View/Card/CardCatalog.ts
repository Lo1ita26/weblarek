import { IProduct, IActionsWithCard } from "../../../types"
import { categoryMap } from "../../../utils/constants";
import { Card } from "./Card"

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;
type categoryKey = keyof typeof categoryMap;

export class CardCatalog extends Card<TCardCatalog> {
    protected image: HTMLImageElement;
    protected category: HTMLElement;

    constructor (container: HTMLElement, actions?: IActionsWithCard) {
        super(container);
        this.category = container.querySelector('card__category') as HTMLElement;
        this.image = container.querySelector('.card__image') as HTMLImageElement;
        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
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
}
