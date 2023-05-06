import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = '';

  searchProd:undefined|Product[];
  
  userName:string="";
  cartItems=0;

  constructor(private route:Router, private product:ProductsService) { }

  
  ngOnInit(): void {
    
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType="seller";
          }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType="user";
            this.product.getCartList(userData.id);
          } else{
          this.menuType="default";
          }
        }
      });

      let cartData = localStorage.getItem('localCart');
      if(cartData){
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((items)=>{
        this.cartItems=items.length;
      })
  }

  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value)
      .subscribe((result)=>{
        if(result.length>5){
          result.length=5;
        }
        this.searchProd = result;
      })
    }
  }
  hideSearch(){
    this.searchProd=undefined;
  }
  redirectDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

  submitSearch(val:string){
    this.route.navigate([`search/${val}`]);
  }
}
