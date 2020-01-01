import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateProduct implements CanActivate {
  constructor(private router: Router, private jwtHelper : JwtHelperService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    
    const token = localStorage.getItem('access_token');
    if(token){
        if(!this.jwtHelper.isTokenExpired(token)){
            return true;
        }
    }

    this.router.navigate(["auth", "login"]);

  }
}
