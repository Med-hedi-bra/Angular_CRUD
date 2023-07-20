import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductFilter } from '../product.filter';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];
  filter = new ProductFilter();
  constructor(public ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getAll().subscribe((data: Product[]) => {
      this.products = data;
      console.log(this.products);
      
    })
 
  }
  search(): void {
    this.ProductService.getAllFilter(this.filter).subscribe((data:Product[])=>{
      this.products = data;
    })
  }

  deleteProduct(id: number) {
    this.ProductService.delete(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log('Product deleted successfully!');
    })
  }

}