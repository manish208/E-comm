import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string ;
  constructor(private route:ActivatedRoute, private product:ProductsService, private router:Router) { }

  ngOnInit(): void {
    let productID = this.route.snapshot.paramMap.get('id')
    productID != null && this.product.getProduct(productID)
    .subscribe((data)=>{
      this.productData=data;
    })
  }
  updateProd(data:Product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data)
    .subscribe((result)=>{
      if(result){
        this.productMessage = "Product updated sucessfully"
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined;
      this.router.navigate(['seller-home'])
    }, 3000)
  }
}
