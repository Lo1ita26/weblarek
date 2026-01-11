import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface IGalleryData {
    catalog: HTMLElement[];
  }

export class Gallery extends Component<IGalleryData> {
    constructor () {
        const container = ensureElement<HTMLElement>('main');
        super(container);
        this.catalog = [];
    }

    set catalog(items: HTMLElement[]){
        this.container.replaceChildren(...items);
    }
}