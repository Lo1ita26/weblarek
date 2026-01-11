import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events";
import { pageEvents } from "../base/pageEvents";

interface IModal {
    content: HTMLElement
}

export class Modal extends Component<IModal> {
    contentModel: HTMLElement;
    closeButtonModel: HTMLButtonElement;

    constructor (protected events: IEvents) {
        const container = ensureElement<HTMLFormElement>('#modal-container');
        super(container);

        this.contentModel = ensureElement<HTMLElement>('.modal__content', this.container);
        this.closeButtonModel = ensureElement<HTMLButtonElement>('.modal__close', this.container);

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