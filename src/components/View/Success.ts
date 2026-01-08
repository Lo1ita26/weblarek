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

        this.descriptionSuccess = this.container.querySelector('.order-success__description') as HTMLElement;
        this.closeButton = this.container.querySelector('.order-success__close') as HTMLButtonElement;
        this.closeButton.addEventListener('click', () => {
            this.events.emit(pageEvents.success);
        });
    }

    set totalCost(value: number) {
        this.descriptionSuccess.textContent =  `Списано ${value} синапсов`;
    }
}