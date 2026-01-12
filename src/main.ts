// Импорты
import "./scss/styles.scss";
import { ApiWebLarek } from "./components/Api/apiWebLarek.ts";
import { EventEmitter } from "./components/base/Events.ts";
import { pageEvents } from "./components/base/pageEvents.ts";
import { ProductCatalog } from "./components/Models/ProductСatalog.ts";
import { CardCatalog } from "./components/View/Card/CardCatalog.ts";
import { cloneTemplate, ensureElement } from "./utils/utils.ts";
import { Gallery } from "./components/View/Gallery.ts";
import { API_URL, CDN_URL } from "./utils/constants.ts";
import { Api } from "./components/base/Api.ts";
import { ShoppingCart } from "./components/Models/ShoppingCart.ts";
import { CardPreview } from "./components/View/Card/CardPreview.ts";
import { Modal } from "./components/View/Modal.ts";
import { ShoppingCartView } from "./components/View/ShoppingCartView.ts";
import { CardShoppingCart } from "./components/View/Card/CardShoppingCart.ts";
import { Header } from "./components/View/Header.ts";
import { BuyerData } from "./components/Models/BuyerData.ts";
import { FormOrder } from "./components/View/Forms/FormOrder.ts";
import { FormContact } from "./components/View/Forms/FormContact.ts";
import { Success } from "./components/View/Success.ts";
import { IBuyer, IProduct, TPayment } from "./types/index.ts";

// Константы
const event = new EventEmitter();
const catalogCards = new ProductCatalog(event);
const api = new Api(API_URL);
const apiWebLarek = new ApiWebLarek(api);
const gallery = new Gallery();
const shoppingCartModel = new ShoppingCart(event);
const modal = new Modal(event);
const shoppingCartTemplate = ensureElement<HTMLTemplateElement>('#basket');//темплейт корзины
const cardInCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');//темплейт картчек товаров в корзине
const shoppingCartView = new ShoppingCartView(cloneTemplate(shoppingCartTemplate), event);
const header =  new Header(event);
const buyerData =  new BuyerData(event);
const formOrderElement = ensureElement<HTMLTemplateElement>('#order');
const formOrder = new FormOrder(cloneTemplate(formOrderElement), event);
const formContactElement = ensureElement<HTMLTemplateElement>('#contacts');
const formContact = new FormContact(cloneTemplate(formContactElement), event) ;
const successElement = ensureElement<HTMLTemplateElement>('#success');
const success = new Success(cloneTemplate(successElement), event);
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const preview = new CardPreview(cloneTemplate(cardTemplate), event);

function loadCatalog() {
  apiWebLarek.getProducts()
  .then((data) => {
    data.items.map((item) => (item.image = CDN_URL + item.image));
    catalogCards.setProductsList(data.items)
  })
  .catch((error) => console.log("Ошибка", error));
}

// Загрузка каталога на страницу
loadCatalog();

// Изменения в каталоге
event.on(pageEvents.catalog, () => {
  const productCards = catalogCards.getProductsList().map((selectedCard) => {
    const card = new CardCatalog (cloneTemplate(templateCardCatalog), {
      onClick: () => {
        catalogCards.setSelectedCard(selectedCard)
      }
    })
    console.log(selectedCard)
    return card.render(selectedCard)
  })
  gallery.catalog = productCards
})

// Открытие модального окна с информацией о товаре
function openCard() {
  const selectedCard = catalogCards.getSelectedCard();
  if (!selectedCard) return;
  const availability: boolean = shoppingCartModel.hasItem(selectedCard.id);
  preview.buttonText = availability;
  preview.setdisabledButton(selectedCard.price === null)
  modal.content = preview.render(selectedCard);
  modal.open();
}

event.on(pageEvents.toggle, () => {
  const selectedCard = catalogCards.getSelectedCard();
  if (!selectedCard) return;
  const availability: boolean = shoppingCartModel.hasItem(selectedCard.id);
      if (availability) {
        shoppingCartModel.removeItem(selectedCard.id);
      }
      else {
        shoppingCartModel.addItem(selectedCard)
      }
      modal.close()
})

event.on<IProduct>(pageEvents.cardSelect, () => {
  openCard()
})

event.on(pageEvents.modal, () => {
  modal.close()
})

// Открытие корзины
function openShoppingCart() {
  modal.content = shoppingCartView.render();
  modal.open();
}

event.on(pageEvents.basketOpen, () => {
  openShoppingCart()
})

// Обновление корзины
function updateShoppingCart() {
  const totalCost = shoppingCartModel.getTotalCost();
  const itemCount = shoppingCartModel.getItemCount();
  const itemsList = shoppingCartModel.getItemsList().map((product, index) => {
    const card = new CardShoppingCart(cloneTemplate(cardInCartTemplate), {
      onDelete: () => event.emit(pageEvents.cardDelete, product),
    })
    card.indexSet(index + 1);
    return card.render(product);
  })
  shoppingCartView.basket = itemsList;
  if (shoppingCartModel.getItemCount() === 0) {
    shoppingCartView.buttonDisabled = true;
  } else {
    shoppingCartView.buttonDisabled = false
  }
  shoppingCartView.total = totalCost;
  header.counter = itemCount;
}

event.on(pageEvents.changedCart, () => updateShoppingCart())

event.on<IProduct>(pageEvents.cardDelete, (item) => {
  shoppingCartModel.removeItem(item.id)
})

// Открытие формы заказа (способ оплаты)
function openFormOrder() {
  const buyer = buyerData.getAllData();
  modal.content = formOrder.render({
    payment: buyer.payment,
    address: buyer.address
  })
}

event.on(pageEvents.cart, () => {
  openFormOrder()
})

event.on<{field: keyof IBuyer, value: TPayment}>(pageEvents.order, (data) => {
  buyerData.saveField(data.field, data.value);
})

event.on(pageEvents.orderUpdate, () => {
  const buyer = buyerData.getAllData();
  const errors = buyerData.validateData();
  formOrder.payment = buyer.payment
  formOrder.address = buyer.address
  formOrder.setErrors(errors)
})

// Открытие формы (контакты)
function openFormContact () {
  const buyer = buyerData.getAllData();
  modal.content = formContact.render({
    email: buyer.email,
    phone: buyer.phone
  })
}

event.on(pageEvents.contactForm, () => {
  openFormContact()
})

event.on<{field: keyof IBuyer, value: TPayment | string}>(pageEvents.emailForm, (data) => {
  buyerData.saveField(data.field, data.value);
})

event.on(pageEvents.contactUpdate, () => {
  const buyer = buyerData.getAllData();
  const errors = buyerData.validateData();
  formContact.emailSet = buyer.email
  formContact.phoneSet = buyer.phone
  formContact.setErrors(errors)
})

// Открытие окна с успешным заказом
function openSuccess(total: number): void {
  success.totalCost = total;
  modal.content = success.render();
}

event.on(pageEvents.submit, () => {
  const total = shoppingCartModel.getTotalCost();
  const items = shoppingCartModel.getItemsList().map(i => i.id);
  const buyer = buyerData.getAllData();
  apiWebLarek.postOrder({total, items, ...buyer})
  .then(({total}) => {
  openSuccess(total);
  shoppingCartModel.clearShoppingCart();
  buyerData.clearData();
  })
  .catch(error => {
    console.log('Ошибка при отправке заказа', error)
  })
})

event.on(pageEvents.success, () => {
  modal.close();
})