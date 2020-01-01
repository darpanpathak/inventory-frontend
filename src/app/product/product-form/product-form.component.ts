import { ICategory } from './../shared/models/product.model';
import { selectedProduct, getAllProducts, getAllCategories } from './../shared/store/selectors/product.selector';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { takeUntil, filter } from 'rxjs/operators';
import { CreateProduct, UpdateProduct, SetSelectedProduct } from './../shared/store/actions/product.action';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProductState } from '../shared/store/states/product.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends ClearObservable implements OnInit {

  form: FormGroup;
  categories : ICategory[] = [];

  constructor(private fb: FormBuilder,
    private toasterService: ToastrService,
    private store: Store<IProductState>,
    private router: ActivatedRoute) { 
      super();
    }

  ngOnInit() {
    this.initForm();

    this.router.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if(params.id){
        this.getProductInfo(params.id);
      }
    });
    
    this.store.select(getAllCategories)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) =>{
      this.categories = data;
    });

  }

  getProductInfo(id){
    this.store.select(selectedProduct).pipe(
      takeUntil(this.destroy$)
    ).subscribe(product => {
      if(!product){
        this.initSelectedProduct(id);
      }
      this.form.patchValue({...product});
    })   
  }

  initSelectedProduct(id){
    this.store.select(getAllProducts).pipe(
      takeUntil(this.destroy$),
      filter(data => !!data)
    ).subscribe(products => {
      const product = products.find(x=>x.id == id);
      this.store.dispatch(SetSelectedProduct({payload : product}));
    })   
  }

  initForm() {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      category: [null, Validators.required],
      description: [null]
    });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }
  get price(): AbstractControl {
    return this.form.get('price');
  }
  get category(): AbstractControl {
    return this.form.get('category');
  }

  doAddProduct(form: FormGroup) {
    if (form.valid) {
      const values = this.form.value;

      if (values.id > 0) {
        //update product
        this.store.dispatch(UpdateProduct({payload: values}));
      }
      else {
        //create product
        delete values.id;
        this.store.dispatch(CreateProduct({payload: values}));
      }
    }
    else {
      this.toasterService.warning("Form is invalid");
    }
  }

  doReset() {
    this.initForm();
  }

}
