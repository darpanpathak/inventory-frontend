import { IProductState } from './../states/product.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const productState = createFeatureSelector<IProductState>("productModule");

export const getAllProducts = createSelector(
    productState,
    (state: IProductState) => {
        return state.products
    });

export const getAllCategories = createSelector(
    productState,
    (state: IProductState) => {
        return state.categories
    });

export const productError = createSelector(
    productState,
    (state: IProductState) => state.error
)

export const selectedProduct = createSelector(
    productState,
    (state: IProductState) => state.selectedProduct
)