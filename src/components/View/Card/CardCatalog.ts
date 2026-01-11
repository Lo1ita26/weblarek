import { IProduct, IActionsWithCard } from "../../../types"
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card"

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;
type categoryKey = keyof typeof categoryMap;

export class CardCatalog extends Card<TCardCatalog> {
    protected imageEl: HTMLImageElement;
    protected categoryEl: HTMLElement;

    constructor (container: HTMLElement, actions?: IActionsWithCard) {
        super(container);
        this.categoryEl = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', this.container)
        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
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
}
