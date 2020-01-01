import { IProductState } from './../states/product.state';
import { initialProductState } from '../states/product.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as productActions from '../actions/product.action';

export const intialState = initialProductState;

const reducer = createReducer(
    intialState,
    on(productActions.GetProductSuccess, (state: IProductState, {payload}) => {
        return {...state, products: payload.data, error: null}
    }),
    on(productActions.UpdateProductSuccess, (state: IProductState, {payload}) => {
        const tempProducts = state.products;
        const category = state.categories.find(x => x.id == payload.data.category);
        const index = tempProducts.findIndex(x=>x.id = payload.data.id);
        payload.data.categoryName = category.category;
        tempProducts[index] = payload.data;

        return { ...state, products: tempProducts, error : null};
    }),
    on(productActions.ErrorProductAction, (state: IProductState, error: Error) => {
        return { ...state, error, product: null};
    }),
    on(productActions.SetSelectedProduct, (state: IProductState, {payload}) => {
        return { ...state, selectedProduct: payload,};
    }),
    on(productActions.GetCategoriesSuccess, (state: IProductState, { payload }) => {
        return { ...state, categories: payload.data};
    })

)

export function ProductReducer(state: IProductState | undefined, action: Action){
    return reducer(state, action);
}