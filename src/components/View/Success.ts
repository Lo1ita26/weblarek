import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { pageEvents } from "../base/pageEvents";

export interface ISuccess {
    title: string;
    description: string;
}

export class Success extends Component<ISuccess> {
    protected descriptionSuccess: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.descriptionSuccess = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.closeButton.addEventListener('click', () => {
            this.events.emit(pageEvents.success);
        });
    }

    set totalCost(value: number) {
        this.descriptionSuccess.textContent =  `Списано ${value} синапсов`;
    }
}