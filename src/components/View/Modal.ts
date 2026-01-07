import { Component } from "../base/Component"
import { IEvents } from "../base/Events";
import { pageEvents } from "../base/pageEvents";

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal> {
    contentModel: HTMLElement;
    closeButtonModel: HTMLButtonElement;

    constructor (container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.contentModel = this.container.querySelector('.modal__content') as HTMLElement;
        this.closeButtonModel = this.container.querySelector('.modal__close') as HTMLButtonElement;

        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.events.emit(pageEvents.modal, this.container)
            }
        })
        this.closeButtonModel.addEventListener('click', () => {
            this.events.emit(pageEvents.modal)
        })
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
    }

    set content(content: HTMLElement) {
        this.contentModel.replaceChildren(content)
    }
}