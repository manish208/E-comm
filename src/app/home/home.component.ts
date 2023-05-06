import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProd: undefined | Product[];
  trendyProd: undefined | Product[];
  constructor(private product:ProductsService) { }

  ngOnInit(): void {
    this.product.popularProducts()
    .subscribe((data)=>{
      this.popularProd=data;
    })
    this.product.trendyProducts()
    .subscribe((data)=>{
      this.trendyProd=data;
    })
  }
}
