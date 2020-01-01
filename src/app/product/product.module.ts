import { ProductEffects } from './shared/store/effects/product.effect';
import { ProductReducer } from './shared/store/reducers/product.reducer';
import { ProductService } from './shared/product.service';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductResolver } from './shared/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: { data: ProductResolver },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductListComponent
      },
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'update/:id',
        component: ProductFormComponent
      },
      {
        path: 'view/:id',
        component: ProductViewComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductViewComponent, ProductFormComponent],
  imports: [
    CommonModule,
    NavbarModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature("productModule", ProductReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService, ProductResolver]
})
export class ProductModule { }
