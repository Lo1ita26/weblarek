import { IBuyer, TPayment, ValidationError } from "../../types";
import { IEvents } from "../base/Events";

export class BuyerData {
    private data: IBuyer = {
        payment: '',
        email: '',
        phone: '',
        address: '',
    };

    constructor(protected events: IEvents) {
        this.events = events;
    }

    // Сохраняет данные покупателя
    saveField(field: keyof IBuyer, value: TPayment | string) {
        if (field === 'payment') {
          this.data[field] = value as TPayment;
        } else {
          this.data[field] = value;
        }
      }

    //получает данные
    getAllData(): IBuyer {
        return {...this.data};
    }

    //очищает данные 
    clearData(): void {
        this.data = {
            payment: '',
            address: '',
            phone: '',
            email: ''
        };
    }

    validateData(): ValidationError {
        const errors: ValidationError = {};
        
        if (!this.data.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.data.address) {
            errors.address = 'Укажите адрес';
        }
        if (!this.data.phone) {
            errors.phone = 'Укажите телефон';
        }
        if (!this.data.email) {
            errors.email = 'Укажите email';
        }

        return errors;
    }
}