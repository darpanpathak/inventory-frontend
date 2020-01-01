import { IProduct, ICategory } from './../../models/product.model';


export interface IProductState{
    products : IProduct[],
    selectedProduct: IProduct,
    categories: ICategory[],
    error : Error
}

export const initialProductState : IProductState = {
    products : null,
    selectedProduct: null,
    categories: null,
    error : null
};

