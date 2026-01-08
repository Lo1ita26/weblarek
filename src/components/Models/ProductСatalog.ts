import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { pageEvents } from "../base/pageEvents";

export class ProductCatalog {
    private products: IProduct[] = [];
    private selectedCard: IProduct | null = null;
    
    constructor(protected events: IEvents) {
        }

    // получить массив товаров
    getProductsList(): IProduct[] {
        return [...this.products];
    }

    // сохранить массив тораров
    setProductsList(newProducts: IProduct[]): void {
        this.products = [...newProducts];
        this.events?.emit(pageEvents.catalog);
        this.events?.emit(pageEvents.selectCatalog)
    }

    // получить выбранную карточку
    getSelectedCard(): IProduct | null {
        return this.selectedCard
    }

    // Получить выбранную карточку по id
    getSelectedCardById(id: string): IProduct | undefined {
        return this.products.find((d) => d.id === id)
    }

    // сохранить выбранную карточку товара
    setSelectedCard(product: IProduct): void {
        this.selectedCard = product;
        this.events.emit(pageEvents.cardSelect)
    }
}
