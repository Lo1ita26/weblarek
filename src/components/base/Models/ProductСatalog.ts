import { IProduct } from "../../../types"; 

class ProductCatalog {
    private products: IProduct[];
    private selectedCard: IProduct | null;
    constructor() {
        this.products = [];
        this.selectedCard = null
    }

    getProductsList(): IProduct[] { // получить массив товаров
        return [...this.products]
    }

    setSelectedCard(product: IProduct): void {  // сохранить выбранную карточку товара
        this.selectedCard = product
    }

    getSelectedCard(): IProduct | null {  // получить выбранную карточку
        return this.selectedCard
    }

    setProducts(newProducts: IProduct[]): void {  // сохранить массив тораров
        this.products = [...newProducts]
    }
}
