import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { ProductsService } from '../services/products.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UsersService, private product:ProductsService) { }

  ngOnInit(): void {
    this.user.reloadUser();
  }
  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Please enter valid user details";
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 500);
        
      }
    })
  }

  localCartToRemoteCart() {
      let data = localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      let userId:number = user && JSON.parse(user).id;
      
    if (data) {
      let cartDataList: Product[]= JSON.parse(data);
      cartDataList.forEach((product:Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData)
        .subscribe((result)=>{
          if(result){
            
          }
        });
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
