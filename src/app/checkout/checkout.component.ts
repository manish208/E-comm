import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg:string|undefined;
  constructor(private product:ProductsService, private router:Router) { }
  
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData=result;
      result.forEach((item) => {
        if(item.quantity){
        price = price + (+item.price * item.quantity);
        }
      });
      this.totalPrice = price+(price * 0.18)+ 100 - (price/10);
      console.warn(price);
    })
  }

  orderNow(data:Order){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData: Order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 1000);
      })

      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMsg="Your order placed successfully"

          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined;
          }, 3000);
        }
      })
    }
    
  }
}
