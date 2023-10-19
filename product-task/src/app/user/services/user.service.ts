import { HttpClient , HttpHeaders, HttpInterceptor, withInterceptors} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Iuser } from '../model/iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:Iuser[];
  constructor(public http : HttpClient) {
    this.user=[];
  }


  postUsers(data : any){
    return this.http.post<any>("http://localhost:3000/users",data)
    .pipe(map((res:any)=>{
    return res;
    }))
  }

  getUsers(){

    return this.http.get<any>("http://localhost:3000/users")
    .pipe(map((res:any)=>{
      return res;
    }))
  }



  isLogged(){
    return (localStorage.getItem('token'))? true:false;
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
