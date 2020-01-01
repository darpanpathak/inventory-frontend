import { CanActivateProduct } from './shared/product.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'product',
    pathMatch: 'full'
  },
  {
    path: "auth",
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: "product",
    loadChildren: './product/product.module#ProductModule',
    canActivate:[CanActivateProduct]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
