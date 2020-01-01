import { IAPIResponse } from './../../../../shared/classes/api-response';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { Action } from '@ngrx/store';
import * as userActions from '../actions/user.action';

@Injectable()
export class UserEffects {
    constructor(
        private _actions$: Actions,
        public router: Router,
        private toasterService: ToastrService,
        private authService: AuthService
    ) { }

    login$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.LoginUser),
            mergeMap(action =>
                this.authService.login(action.payload).pipe(
                    map((resp: IAPIResponse) => {
                        return userActions.LoginUserSuccess({ payload: resp });
                    }),
                    catchError((error: Error) => {
                        return of(userActions.ErrorUserAction(error));
                    })
                )
            )
        )
    )

    loginSuccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.LoginUserSuccess),
            tap((respo) => {
                this.toasterService.success(respo.payload.message);
                localStorage.setItem("access_token", respo.payload.data.token);
                this.router.navigateByUrl("/product/list");
            })

        ), { dispatch: false }
    )

    signup$: Observable<Action> = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.SignupUser),
            mergeMap(action =>
                this.authService.signup(action.payload).pipe(
                    map((resp: IAPIResponse) => {
                        return userActions.SignupUserSuccess({ payload: resp });
                    }),
                    catchError((error: Error) => {
                        return of(userActions.ErrorUserAction(error));
                    })
                )
            )
        )
    )

    signupSuccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.SignupUserSuccess),
            tap((respo) => {
                this.toasterService.success(respo.payload.message);
                this.router.navigateByUrl("/auth/login");
            })

        ), { dispatch: false }
    )

    error$ = createEffect(() =>
        this._actions$.pipe(
            ofType(userActions.ErrorUserAction),
            tap((respo) => {
                this.toasterService.error(respo.message);
            })
        ), { dispatch: false }
    )
}