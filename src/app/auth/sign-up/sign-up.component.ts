import { IAPIResponse } from './../../shared/classes/api-response';
import { AuthService } from './../shared/auth.service';
import { ClearObservable } from './../../shared/classes/clear-observable';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {takeUntil} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends ClearObservable implements OnInit {
  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private toaster : ToastrService,
    private authService: AuthService,
    private router: Router
    ) { 
      super(); 
    }

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fullname() : AbstractControl{
    return this.form.get('fullName');
  }

  get email(): AbstractControl{
    return this.form.get('email');
  }

  get password(): AbstractControl{
    return this.form.get('password');
  }

  doSignup(form: FormGroup){
    if(form.valid){
      this.authService.signup(form.value).pipe(takeUntil(this.destroy$))
      .subscribe((response: IAPIResponse) => {
        this.toaster.success(response.message);
        this.router.navigate(['/auth','login']);
      }, (err) => { 
        this.toaster.error(err.error.message);
      })
    }
    else{
      this.toaster.error("Invalid form");
    }
  }

}
