import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.priceDetails();
  }

  removeCart(cartId: number | undefined) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
    cartId && this.cartData && this.product.removeToCart(cartId)
      .subscribe((result) => {
        this.priceDetails();
        this.product.getCartList(userId);
      })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  priceDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.tax = price * 0.18;
      this.priceSummary.discount = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + (price * 0.18) + 100 - (price / 10);
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }

    })
  }
}
