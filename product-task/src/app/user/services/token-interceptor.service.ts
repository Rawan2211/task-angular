import { Injectable,Injector } from '@angular/core';
import{HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector : Injector) { }

  intercept(req:any, next:any){
    let userService = this.injector.get(UserService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization:`${userService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);

  }
}
