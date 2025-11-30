import { IBuyer, ValidationError } from "../../types";

export class BuyerData {
    data: IBuyer = {
        payment: '',
        address: '',
        phone: '',
        email: ''
    };

    saveField(field: keyof IBuyer, value: string): boolean {  // Сохраняет данные покупателя
        this.data[field] = value;
        return this.validateField(field, value);
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