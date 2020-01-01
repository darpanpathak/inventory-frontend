import { IAPIResponse } from './../../../../shared/classes/api-response';
import { catchError, map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from './../../product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as productActions from '../actions/product.action';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

    constructor(
        private _actions$: Actions,
        private toasterService: ToastrService,
        private productService: ProductService,
        private router: Router
    ) { }

    getProduct$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.GetProducts),
            mergeMap(() => {
                return this.productService.getProducts().pipe(
                    map((resp: IAPIResponse) => {
                        return productActions.GetProductSuccess({ payload: resp });
                    }),
                    catchError((error) => {
                        return of(productActions.ErrorProductAction(error));
                    })
                )
            })
        )
    )

    createProduct$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.CreateProduct),
            mergeMap((action) => {
                return this.productService.createProduct(action.payload).pipe(
                    map((resp: IAPIResponse) => {
                        return productActions.CreateProductSuccess({ payload: resp });
                    }),
                    catchError((error) => {
                        return of(productActions.ErrorProductAction(error));
                    })
                )
            })
        )
    )

    createProductSuccess$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.CreateProductSuccess),
            map((resp) => {
                this.toasterService.success(resp.payload.message);
                this.router.navigateByUrl('/product/list');
                return productActions.GetProducts();
            })
        )
    )

    updateProduct$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.UpdateProduct),
            mergeMap((action) => {
                const id = action.payload.id;
                return this.productService.updateProduct(action.payload, id).pipe(
                    map((resp: IAPIResponse) => {
                        return productActions.UpdateProductSuccess({ payload: resp });
                    }),
                    catchError((error) => {
                        return of(productActions.ErrorProductAction(error));
                    })
                )
            })
        )
    )

    updateProductSuccess$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.UpdateProductSuccess),
            tap((resp) => {
                this.toasterService.success(resp.payload.message);
                this.router.navigateByUrl('/product/list');
            })
        ), { dispatch: false }
    )

    deleteProduct$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.DeleteProduct),
            mergeMap((action) => {
                return this.productService.deleteProduct(action.payload).pipe(
                    map((resp: IAPIResponse) => {
                        return productActions.DeleteProductSuccess({ payload: resp });
                    }),
                    catchError((error) => {
                        return of(productActions.ErrorProductAction(error));
                    })
                )
            })
        )
    )

    deleteProductSuccess$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.DeleteProductSuccess),
            map((resp) => {
                this.toasterService.success(resp.payload.message);
                return productActions.GetProducts();
            })
        )
    )

    getCategory$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
        ofType(productActions.GetCategories),
        mergeMap(() => {
            return this.productService.getCategorries().pipe(
                map((resp: IAPIResponse) => {
                    return productActions.GetCategoriesSuccess({ payload: resp });
                }),
                catchError((error) => {
                    return of(productActions.ErrorProductAction(error));
                })
            )
        })
    )
)

    error$ = createEffect(() =>
        this._actions$.pipe(
            ofType(productActions.ErrorProductAction),
            tap((respo) => {
                this.toasterService.error(respo.message);
            })
        ), { dispatch: false }
    )

}