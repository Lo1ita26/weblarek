import { IApi, IResponseProduct, IOrderRequest, IResponseOrder } from "../../types";

export class ApiWebLarek {
    private api: IApi;
    constructor(api: IApi) {
        this.api = api
    }

    async getProducts(): Promise<IResponseProduct> {
        return await this.api.get('/product/');
    }

    async postOrder(data: IOrderRequest): Promise<IResponseOrder> {
        const response = await this.api.post<IResponseOrder>('/order/', data);
        return response;
    }
}