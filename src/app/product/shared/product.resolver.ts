import { GetProducts, SetSelectedProduct, GetCategories } from './store/actions/product.action';
import { takeUntil, tap } from 'rxjs/operators';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { getAllProducts, getAllCategories } from './store/selectors/product.selector';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IProductState } from './store/states/product.state';
import { combineLatest } from 'rxjs';

@Injectable()
export class ProductResolver extends ClearObservable implements Resolve<any> {
  constructor(private store: Store<IProductState>) { super(); }

  resolve(route: ActivatedRouteSnapshot) {

    combineLatest([
      this.store.select(getAllProducts),
      this.store.select(getAllCategories)
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([products, categories]) => {

      if (!products) {
        this.store.dispatch(GetProducts());
      }

      if (!categories) {
        this.store.dispatch(GetCategories());
      }

    })



  }
}