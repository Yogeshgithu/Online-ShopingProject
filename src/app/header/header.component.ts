import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  CountCart = 0;
  SearchResult: undefined | product[];
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {


          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        } else if (localStorage.getItem('user')) {
          let userstore = localStorage.getItem('user');
          let userdata = userstore && JSON.parse(userstore);
          this.userName = userdata.name;
          this.menuType = 'user';
          this.product.getCartList(userdata.id);
        } else {

          this.menuType = 'default';
        }
      }

    });

    let cartDatas = localStorage.getItem('localCart')

    if (cartDatas) {
      this.CountCart = JSON.parse(cartDatas).length;
    } this.product.cartData.subscribe((item) => {
      this.CountCart = item.length;
    })


  }
  logout(): void {
    localStorage.removeItem('seller');    //seller logout fuction
    this.route.navigate(['/']);
  }
  // user logout function
  UserLogout(): void {
    localStorage.removeItem('user');
    this.route.navigate(['/login']);
    this.product.cartData.emit([]);

  }

  SearchProduct(query: KeyboardEvent) {

    if (query) {
      const element = query.target as HTMLTextAreaElement;
      this.product.searchproductdata(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.SearchResult = result;
      })
    }

  }

  hideSearch() {
    this.SearchResult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
  Submitsearch(val: string) {
    this.route.navigate([`search/${val}`]);
  }
}
