import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  addProductMessage: String | undefined;
  productdata: undefined | product
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productdata = result;
    })
  }

  updated(data: product) {
    if (this.productdata) {
      data.id = this.productdata.id
    }
    this.product.doUpdate(data).subscribe((result) => {
      if (result) {
        this.addProductMessage = ' Product updated successfully';
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined
    }, 3000);
  }
}
