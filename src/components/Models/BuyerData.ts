import { IBuyer, TPayment, ValidationError } from "../../types";
import { IEvents } from "../base/Events";

export class BuyerData {
    data: IBuyer = {
        payment: '' as TPayment,
        address: '',
        phone: '',
        email: ''
    };

    constructor(protected events: IEvents) {
        this.events = events;
    }

    // Сохраняет данные покупателя
    saveField(field: keyof IBuyer, value: TPayment): boolean {
        this.data[field] = value;
        return this.validateField(field, value);
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
    
    //проверяет валидность поля
    validateField(field: keyof IBuyer, value: string): boolean {
        return value !== '';
    }

    validateData(): ValidationError {
        const errors: ValidationError = {};
        
        if (this.data.payment === '') {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (this.data.address === '') {
            errors.address = 'Укажите адрес';
        }
        if (this.data.phone === '') {
            errors.phone = 'Укажите телефон';
        }
        if (this.data.email === '') {
            errors.email = 'Укажите емэйл';
        }

        return errors;
    }
}