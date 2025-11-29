import "./scss/styles.scss";

import { IProduct } from "./types"; 
import { IBuyer } from "./types";
import { ValidationError } from "./components/base/Models/BuyerData"
import { apiProducts } from "./utils/data.ts"
import { IApi } from "./types";
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";

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

    setProductsList(newProducts: IProduct[]): void {  // сохранить массив товаров
        this.products = [...newProducts]
    }

    getSelectedCard(): IProduct | null {  // получить выбранную карточку торвара
        return this.selectedCard
    }

    setSelectedCard(product: IProduct): void {  // сохранить выбранную карточку товара
        this.selectedCard = product
    }
}

const productsModel = new ProductCatalog();
productsModel.setProductsList(apiProducts.items);  //проверка метода сохранения массива товаров
console.log(`Массив товаров из каталога: `, productsModel.getProductsList());  //проверка метода получения массива товаров
const elementProductsList = productsModel.getProductsList()[3];
productsModel.setSelectedCard(elementProductsList);
console.log(`Товар из каталога: `, productsModel.getSelectedCard());

class ShoppingCart {
    items: IProduct[]; //массив товаров в корзине

    constructor() {
        this.items = [];
    }

    addItem(product: IProduct): void { //добавить товар в корзину
        this.items.push(product);
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

    hasItem(id: string): boolean {  //проверка наличия товара в корзине
        return this.items.some(item => item.id === id);
    }
}

const cart = new ShoppingCart();
console.log(`Список товаров: `, cart.getItemsList());
cart.addItem(apiProducts.items[0]);
cart.addItem(apiProducts.items[3]);
console.log(`Список товаров: `, cart.getItemsList());
cart.removeItem(apiProducts.items[3].id);
console.log(`Список товаров: `, cart.getItemsList());
console.log(`Количество товаров в корзине: `, cart.getItemCount());
console.log(`Общая стоимость: `, cart.getTotalCost());
console.log(`Проверка наличия товара в корзине: `, cart.hasItem(apiProducts.items[2].id));

class BuyerData {
    data: IBuyer = {
        payment: '',
        address: '',
        phone: '',
        email: ''
    };

    saveField(field: keyof IBuyer, value: string): boolean {  // Сохраняет данные покупателя
        if (!this.validateField(field, value)) {
            return false;
        }
        this.data[field] = value;
        return true;
    }

    getAllData(): IBuyer {  //получает данные
        return {...this.data};
    }

    clearData(): void {  //очищает данные 
        this.data = {
            payment: '',
            address: '',
            phone: '',
            email: ''
        };
    }

    validateField(field: keyof IBuyer, value: string): boolean {  //проверяет валидность поля
        return value !== '';
    }

    validateData(): ValidationError {
        const errors: ValidationError = {};
        
        if (this.data.payment === '') {
            errors.payment = 'Не выбран тип оплаты';
        }
        if (this.data.address === '') {
            errors.address = 'Укажите адрес';
        }
        if (this.data.phone === '') {
            errors.phone = 'Укажите телефон';
        }
        if (this.data.email === '') {
            errors.email = 'Укажите email';
        }

        return errors;
    }
}

const buyer = new BuyerData;
buyer.saveField('phone', '326471');
console.log(`Данные пользователя: `, buyer.getAllData());
console.log(buyer.clearData());
console.log(`Данные пользователя после очистки: `, buyer.getAllData());

class ApiWebLarek {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api
    }
    getProducts(): Promise <IProduct[]> {
    return this.api.get<IProduct[]>('/product/')
    }
    postOrder(data: object) {
    this.api.post('/order/', data)
    }
}

const api = new Api(API_URL);
const apiLarek = new ApiWebLarek(api);


apiLarek.getProducts().then(products=>{console.log(products)})