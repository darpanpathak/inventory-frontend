import { selectedProduct, getAllProducts } from './../shared/store/selectors/product.selector';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { takeUntil, filter } from 'rxjs/operators';
import { CreateProduct, UpdateProduct, SetSelectedProduct } from './../shared/store/actions/product.action';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProductState } from '../shared/store/states/product.state';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from '../shared/models/product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent extends ClearObservable implements OnInit {

  product: IProduct;

  constructor(private store: Store<IProductState>,
    private router: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.router.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.getProductInfo(params.id);
      }
    })
  }

  getProductInfo(id) {
    this.store.select(selectedProduct).pipe(
      takeUntil(this.destroy$)
    ).subscribe(product => {
      if (!product) {
        this.initSelectedProduct(id);
      }
      else {
        this.product = product;
      }
    })
  }

  initSelectedProduct(id) {
    this.store.select(getAllProducts).pipe(
      takeUntil(this.destroy$),
      filter(data => !!data)
    ).subscribe(products => {
      const product = products.find(x => x.id == id);
      this.store.dispatch(SetSelectedProduct({ payload: product }));
    })
  }


}
