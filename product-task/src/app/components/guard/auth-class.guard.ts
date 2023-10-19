import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthClassGuard implements CanActivate {
  constructor(private authUser:UserService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {if (this.authUser.isLogged()) {
      return true;
    }
    else{
      return false
    }

  }

}
