import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router'
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  
  constructor(private seller:SellerService, private router:Router) { }
  showLogin = true;
  authError:string='';
  ngOnInit(): void {
      this.seller.reloadSeller();
  }

  signUp(data:SignUp):void{
    this.seller.sellerSignUp(data);
  }

  login(data:SignUp):void{
    this.authError = "";
    this.seller.sellerLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Please enter valid credential";
      }
    })
  }
  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
  
}
