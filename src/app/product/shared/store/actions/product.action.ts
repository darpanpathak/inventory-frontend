import { IAPIResponse } from './../../../../shared/classes/api-response';
import { IProduct } from './../../models/product.model';
import { createAction, props } from '@ngrx/store';

export const GetProducts = createAction('[PRODUCT] - Get Products');
export const GetProductSuccess = createAction('[PRODUCT] - Get Product Success', props<{payload: IAPIResponse}>());

export const CreateProduct = createAction('[PRODUCT] - Create Product', props<{payload: IProduct}>());
export const CreateProductSuccess = createAction('[PRODUCT] - Create Product Success', props<{payload: IAPIResponse}>());

export const UpdateProduct = createAction('[PRODUCT] - Update Product', props<{payload: IProduct}>());
export const UpdateProductSuccess = createAction('[PRODUCT] - Update Product Success', props<{payload: IAPIResponse}>());


export const DeleteProduct = createAction('[PRODUCT] - Delete Product', props<{payload: number}>());
export const DeleteProductSuccess = createAction('[PRODUCT] - Delete Product Success', props<{payload: IAPIResponse}>());

export const SetSelectedProduct = createAction('[PRODUCT] - Set Selected Product', props<{payload : IProduct}>());

export const GetCategories = createAction('[CATEGORY] - Get Category');
export const GetCategoriesSuccess = createAction('[CATEGORY] - Get Category Success', props<{payload: IAPIResponse}>());

export const ErrorProductAction = createAction('[PRODUCT] - Error Occured', props<Error>());