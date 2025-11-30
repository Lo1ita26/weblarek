import { IApi, IProduct } from "../../types";
import { IResponseProduct, IOrderRequest, IResponseOrder } from "../../types";

export class ApiWebLarek {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api
    }

    async getProducts(): Promise <IProduct[]> {
        const data = await this.api.get<IResponseProduct>('/product/');
        return data.items;
    }

    async postOrder(data: IOrderRequest): Promise<IResponseOrder> {
        const response = await this.api.post<IResponseOrder>('/order/', data);
        return response;
    }
}