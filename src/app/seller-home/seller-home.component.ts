import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | Product[];
  productMessage:undefined | string;
  trashIcon=faTrash;
  editIcon=faEdit;
  constructor(private product:ProductsService) { }
  
  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){
    this.product.deleteProduct(id)
    .subscribe((result)=>{
      if(result){
        this.productMessage="Product deleted successfully"
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage='';
    }, 3000)
  }
  list(){
    this.product.productList()
    .subscribe((result)=>{
      this.productList=result;
    })
  }
}
