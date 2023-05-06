import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private route:Router) { }

  userSignUp(user:SignUp){
    this.http.post('http://localhost:3000/users', user, {observe:'response'})
    .subscribe((result)=>{
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/']);
      }
    })
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      // this.isUserLoggedIn.next(true);
      this.route.navigate(['/']);
    }
  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'})
    .subscribe((result)=>{
      if(result && result.body?.length){
        this.isLoginError.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }else{
        this.isLoginError.emit(true);
      }
    })
  }
}
