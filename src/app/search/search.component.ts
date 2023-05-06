import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../data-type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined|Product[];
  
  constructor(private activeRoute: ActivatedRoute, private product:ProductsService) {
   }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProducts(query)
    .subscribe((result)=>{
      this.searchResult = result;
    })
  }

}
