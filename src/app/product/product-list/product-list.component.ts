import { SetSelectedProduct } from './../shared/store/actions/product.action';
import { takeUntil, filter } from 'rxjs/operators';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { getAllProducts } from '../shared/store/selectors/product.selector';
import { IProductState } from '../shared/store/states/product.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product.model';
import { Router } from '@angular/router';
import { DeleteProduct } from '../shared/store/actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends ClearObservable implements OnInit {
  products:IProduct[] = [];

  constructor(private store: Store<IProductState>, private router: Router) {
    super();
   }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.store.select(getAllProducts).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.products = data;
    });
  }

  doEdit(item: IProduct){
    this.store.dispatch(SetSelectedProduct({payload: item}));
    this.router.navigateByUrl(`/product/update/${item.id}`);
  }

  doDelete(item: IProduct){
    this.store.dispatch(DeleteProduct({payload: item.id}));
  }

  doView(item){
    this.store.dispatch(SetSelectedProduct({payload: item}));
    this.router.navigateByUrl(`/product/view/${item.id}`);
  }

}
