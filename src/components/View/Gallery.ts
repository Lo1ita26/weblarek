import { Component } from "../base/Component";

export interface IGalleryData {
    catalog: HTMLElement[];
  }

export class Gallery extends Component<IGalleryData> {
    constructor (protected container: HTMLElement) {
        super(container);
        this.catalog = [];
    }

    set catalog(items: HTMLElement[]){
        this.container.replaceChildren(...items);
    }
}