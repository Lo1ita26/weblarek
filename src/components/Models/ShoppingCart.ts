import { IProduct } from "../../types"; 
import { IEvents } from "../base/Events";
import { pageEvents } from "../base/pageEvents";

export class ShoppingCart {
    items: IProduct[] = []; //массив товаров в корзине

    constructor(protected events: IEvents) {
        this.events = events
    }

    addItem(product: IProduct): void { //добавить товар в корзину
        this.items.push(product);
        this.events.emit(pageEvents.changedCart)
    }

    removeItem(id: string): boolean { //удалить товар из корзины
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    getItemCount(): number  { //получить количество товаров в корзине
        return this.items.length;
    }

    getItemsList(): IProduct[] {  //список всех товаров в корзине
        return [...this.items];
    }

    getTotalCost(): number {   //общая стоимость 
        return this.items.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }

    hasItem(id: string): boolean {  //проверка наличия тоавра в корзине
        return this.items.some(item => item.id === id);
    }
}