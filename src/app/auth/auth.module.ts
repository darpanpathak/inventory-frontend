import { UserReducer } from './shared/store/reducers/user.reducer';
import { AuthService } from './shared/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './shared/store/effects/user.effect';


const routes : Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path : 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component : SignUpComponent
      }
    ]
  }
  
]

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature("AuthModule",{user: UserReducer}),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [AuthService]
})
export class AuthModule { }
