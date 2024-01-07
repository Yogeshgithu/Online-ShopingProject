import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }

  ProductSubmit(item: product): void {
    console.log(item);
    this.product.addProducted(item).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = "Product is successfully added"
      }
      setTimeout(() => this.addProductMessage = undefined, 3000)
    })
  }

}
