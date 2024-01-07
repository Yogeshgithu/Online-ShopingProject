import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productdata: undefined | product;
  productQuntity: number = 1;
  removeCart = false;
  cartdata: product | undefined
  constructor(private activeroute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {

    let productID = this.activeroute.snapshot.paramMap.get('productId');
    productID && this.product.getProduct(productID).subscribe((result) => {
      this.productdata = result;

      let cartvalue = localStorage.getItem('localCart');
      if (productID && cartvalue) {
        let item = JSON.parse(cartvalue);
        item = item.filter((item: product) => productID == item.id.toString())
        if (item.length) {
          this.removeCart = true
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {

          let item = result.filter((item: product) => productID?.toString() === item.productId?.toString());

          if (item.length) {
            this.cartdata = item[0];
            this.removeCart = true;

          }

        })
      }
    })
  }
  HandleQuntity(val: string) {
    if (this.productQuntity < 20 && val === 'max') {
      this.productQuntity += 1;
    } else if (this.productQuntity > 1 && val === 'min') {
      this.productQuntity -= 1;

    }
  }

  // Add TO cart product its for direct db stroe data without local storege
  AddtoCart() {
    if (this.productdata) {
      this.productdata.quantity = this.productQuntity;
      if (!localStorage.getItem('user')) {
        this.product.localAddtoCart(this.productdata);
        this.removeCart = true
      } else {

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id

        let cartdata: cart = {
          ...this.productdata,
          userId,
          productId: this.productdata.id,

        }

        delete cartdata.id;
        this.product.addtocart(cartdata).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }
  RemovetoCart(productID: number) {
    if (!localStorage.getItem('user')) {
      this.product.Removeitemcart(productID); // for button its remove product and showing add cart button
      this.removeCart = false;

    } else {

      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id
      this.cartdata && this.product.removeTocartdatabase(this.cartdata.id)
        .subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
          }
        })
      this.removeCart = false;
    }

  }

}
