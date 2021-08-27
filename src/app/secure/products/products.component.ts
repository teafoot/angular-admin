import { Component, OnInit } from '@angular/core';
import {Product} from "../../interfaces/product";
import {ProductService} from "../../services/product.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number;
  // page = 1;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.productService.all(page).subscribe(res => {
        this.products = res.data;
        this.lastPage = res.meta.last_page;

        // load image
        this.products.map(product => {
          if (!product.image.startsWith("http")) // if it's not an image link from the internet, it was an uploaded image
            product.image = `${environment.api}/uploads/${product.image}`;
        });
      }
    );
  }

  // load(): void {
  //   this.productService.all(this.page).subscribe(res => {
  //       this.products = res.data;
  //       this.lastPage = res.meta.last_page;
  //
  //       this.products.map(product => {
  //         product.image = `${environment.api}/uploads/${product.image}`;
  //       });
  //     }
  //   );
  // }

  // next(): void {
  //   if (this.page === this.lastPage) {
  //     return;
  //   }
  //   this.page++;
  //   this.load();
  // }
  //
  // prev(): void {
  //   if (this.page === 1) {
  //     return;
  //   }
  //   this.page--;
  //   this.load();
  // }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.productService
        .delete(id)
        .subscribe(() => this.products = this.products.filter(product => product.id !== id));
    }
  }
}
