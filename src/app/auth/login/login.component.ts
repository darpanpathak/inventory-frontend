import { ILogin } from './../shared/models/user.model';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUserState } from '../shared/store/states/user.state';
import * as userActions from '../shared/store/actions/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ClearObservable implements OnInit {
  form: FormGroup;
  
  constructor(
    private fb:FormBuilder,
    private toaster : ToastrService,
    private store: Store<IUserState>,
    private router: Router
  ) {
    super()
   }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): AbstractControl{
    return this.form.get('email');
  }

  get password(): AbstractControl{
    return this.form.get('password');
  }

  doSignIn(form: FormGroup){
    if(form.valid){
      this.store.dispatch(userActions.LoginUser({payload : form.value as ILogin}));
    }
    else{
      this.toaster.error("Invalid form");
    }
  
  }

}
