import "./scss/styles.scss";

import { apiProducts } from "./utils/data.ts"
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";
import { ProductCatalog } from "./components/Models/ProductСatalog.ts";
import { ShoppingCart } from "./components/Models/ShoppingCart.ts";
import { BuyerData } from "./components/Models/BuyerData.ts";
import { ApiWebLarek } from "./components/Api/apiWebLarek.ts";

const productsModel = new ProductCatalog();
productsModel.setProductsList(apiProducts.items);  //проверка метода сохранения массива товаров
console.log(`Массив товаров из каталога: `, productsModel.getProductsList());  //проверка метода получения массива товаров
const elementProductsList = productsModel.getProductsList()[3];
productsModel.setSelectedCard(elementProductsList);
console.log(`Товар из каталога: `, productsModel.getSelectedCard());

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

const buyer = new BuyerData;
buyer.saveField('phone', '326471');
console.log(`Данные пользователя: `, buyer.getAllData());
console.log(buyer.clearData());
console.log(`Данные пользователя после очистки: `, buyer.getAllData());

const api = new Api(API_URL);
const apiLarek = new ApiWebLarek(api);
apiLarek.getProducts().then(products=>{console.log(products)})