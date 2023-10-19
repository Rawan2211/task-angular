import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/user/model/iuser';
import { UserService } from 'src/app/user/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  RegisterForm!: FormGroup ;
  LoginForm!:FormGroup;
  userList:Iuser[] =[];
  user:Iuser[] =[];;
  showRegisterForm:boolean=true;
  showLoginForm:boolean=false;



constructor(private route:ActivatedRoute,private router:Router,private userService:UserService,private _snackBar: MatSnackBar){

}

  createRegisterForm(){
    this.RegisterForm = new FormGroup({
      id:new FormControl(''),
    email: new FormControl(''),
    password:new FormControl('')
  });
  }
  showLogin(){
    this.showRegisterForm=false;
    this.showLoginForm=true;
  }
  showRegister(){
    this.showRegisterForm=true;
    this.showLoginForm=false;
  }
  createLoginForm(){
    this.LoginForm = new FormGroup({
    email: new FormControl(''),
    password:new FormControl('')
  });
  }

  ngOnInit(){
    this.createRegisterForm();
    this.createLoginForm();
    this.getAllUsers();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  addUser(){
    this.userService.postUsers(this.RegisterForm.value)
    .subscribe(_=>{
    this.RegisterForm.reset();
    this.showLogin();
    this.openSnackBar('User Registered Successfully', 'OK');
  })
  }
  logoutUser(){
    localStorage.removeItem('token');

  }
  getAllUsers(){

    this.userService.getUsers().subscribe(data=>{
      this.user= data;
  })

  }

  checkRegisteredUser(email:any){
    console.log(email);
    for (let i = 0; i < this.user.length; i++) {
        if (email==this.user[i].email) {
          localStorage.setItem('token','1234');
          this.router.navigate(['productAngular']);
          this.openSnackBar('User Login Successfully', 'OK');
        }
        else {
          this.showRegister();
          this.openSnackBar('Must Register First', 'OK');

        }

    }

  }

  }



