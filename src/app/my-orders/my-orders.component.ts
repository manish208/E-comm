import { Component, OnInit } from '@angular/core';
import { Order } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData:Order[] | undefined;
  constructor(private product:ProductsService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData = result;
    })
  }

  cancelOrder(orderId:number|undefined){
     orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

}
