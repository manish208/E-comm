import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductsService) { }

  ngOnInit(): void {
  }
  addNewProduct(data: Product) {
    this.product.addProduct(data)
      .subscribe((result) => {
        if (result) {
          this.addProductMessage = "Product Added Successfully"
        }
        setTimeout(() => this.addProductMessage = undefined, 3000)
      });
  }
}
