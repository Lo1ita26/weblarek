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
const catalogCards: ProductCatalog  = new ProductCatalog(event);
const api = new Api(API_URL);
const apiWebLarek: ApiWebLarek = new ApiWebLarek(api);
const galleryItem = ensureElement<HTMLElement>('main');
const gallery = new Gallery(galleryItem);
const shoppingCartModel = new ShoppingCart(event);
const modalItem = ensureElement<HTMLFormElement>('#modal-container');
const modal = new Modal(modalItem, event);
const shoppingCartTemplate = document.getElementById('basket') as HTMLTemplateElement; //темплейт корзины
const cardInCartTemplate = document.getElementById('card-basket') as HTMLTemplateElement; //темплейт картчек товаров в корзине
const shoppingCartView = new ShoppingCartView(cloneTemplate(shoppingCartTemplate), event);
const headerItem = ensureElement<HTMLElement>('.header');
const header =  new Header(headerItem, event);
const buyerData: BuyerData =  new BuyerData(event);
const formOrderElement = ensureElement<HTMLTemplateElement>('#order');
const formOrder: FormOrder = new FormOrder(cloneTemplate(formOrderElement), event);
const formContactElement = ensureElement<HTMLTemplateElement>('#contacts');
const formContact: FormContact = new FormContact(cloneTemplate(formContactElement), event) ;
const successElement = ensureElement<HTMLTemplateElement>('#success');
const success: Success = new Success(cloneTemplate(successElement), event);

// Загрузка каталога на страницу
loadCatalog();

function loadCatalog() {
  apiWebLarek.getProducts()
  .then((data) => {
    data.items.map((item) => (item.image = CDN_URL + item.image));
    catalogCards.setProductsList(data.items)
  })
}

// Изменения в каталоге
event.on(pageEvents.catalog, () => {
  const templateCardCatalog = document.getElementById('card-catalog') as HTMLTemplateElement;
  const cardsItem = catalogCards.getProductsList().map((selectedCard) => {
    const card = new CardCatalog (cloneTemplate(templateCardCatalog), {
      onClick: () => {
        catalogCards.setSelectedCard(selectedCard)
      }
    })
    console.log(selectedCard)
    return card.render(selectedCard)
  })
  gallery.catalog = cardsItem
})

// Открытие модального окна с информацией о товаре
function openCard() {
  const selectedCard = catalogCards.getSelectedCard();
  if (!selectedCard) return;
  const cardTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
  const card = new CardPreview(cloneTemplate(cardTemplate), {
    onClick: () => {
      const availability: boolean = shoppingCartModel.hasItem(selectedCard.id);
      if (availability) {
        shoppingCartModel.removeItem(selectedCard.id);
      }
      else {
        shoppingCartModel.addItem(selectedCard)
      }
      card.availability = !availability;
      modal.content = card.render();
    }
  })
  if (selectedCard.price === null) {
    card.setdisabledButton(true)
  }
  modal.content = card.render(selectedCard);
  modal.open();
}

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
    const cardTemplate = new CardShoppingCart(cloneTemplate(cardInCartTemplate), {
      onDelete: () => event.emit(pageEvents.cardDelete, product),
    })
    cardTemplate.indexSet(index + 1);
    return cardTemplate.render(product);
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
  validateFormOrder();
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
  if (data.field === 'payment') {
    formOrder.payment = data.value
  }
  validateFormOrder();
})

// Валидация формы способа оплаты
function validateFormOrder() {
  const error = buyerData.validateData();
  const block = 'payment' in error || 'address' in error;
  formOrder.disabledSubmitButton = block;
}

// Открытие формы (контакты)
function openFormContact () {
  const buyer = buyerData.getAllData();
  validateFormContact();
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
  validateFormContact();
})

// Валидация формы контакты
function validateFormContact() {
  const error = buyerData.validateData();
  const block = 'email' in error || 'phone' in error;
  formContact.disabledSubmitButton = block;
}

// Открытие окна с успешным заказом
function openSuccess(total: number): void {
  success.totalCost = total;
  modal.content = success.render();
}

event.on(pageEvents.submit, () => {
  const total = shoppingCartModel.getTotalCost();
  openSuccess(total)
})

event.on(pageEvents.success, () => {
  modal.close()
})