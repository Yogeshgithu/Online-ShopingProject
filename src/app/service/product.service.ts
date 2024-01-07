import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();


  constructor(private http: HttpClient) { }


  addProducted(data: product) {
    return this.http.post('http://localhost:3000/product', data);
    console.log("service called");

  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/product');
  }
  deleted(dt: number) {
    return this.http.delete(`http://localhost:3000/product/${dt}`)
  }

  getProduct(IDdata: string) {
    return this.http.get<product>(`http://localhost:3000/product/${IDdata}`);
  }

  doUpdate(producting: product) {
    return this.http.put(`http://localhost:3000/product/${producting.id}`, producting)
  }
  Topproduct() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=12');
  }
  searchproductdata(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }

  //  add to cart logic

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');// when in localstorege data is present in jsonstringfy form
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);//we use convert jsonstringfy data into javascript obj we use
      cartData.push(data); //whatever come data cliend side this data push
      localStorage.setItem('localCart', JSON.stringify(cartData)); //repatitly push data(javascript obj) in browser in jsonstringfy form
      this.cartData.emit(cartData);

    }

  }
  Removeitemcart(dataid: number) {
    let cartData = localStorage.getItem('localCart'); //for local sotrage data is remove if data want to remove
    if (cartData) {
      let item: product[] = JSON.parse(cartData);
      item = item.filter((item: product) => dataid !== item.id)
      localStorage.setItem('localCart', JSON.stringify(item
      ));
      this.cartData.emit(item);
     
    }

  }
  addtocart(cartdata: cart) {

    return this.http.post('http://localhost:3000/cart', cartdata)
  }


  getCartList(userId: number) {

    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
          
        }

      })
  }


  removeTocartdatabase(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart(){
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/order',data);
  }

  orderList(){
    let userstore = localStorage.getItem('user');
    let userData = userstore && JSON.parse(userstore);
    return this.http.get<order[]>('http://localhost:3000/order?userId=' + userData.id)
  }
deleteCartItem(cartId:any){

  return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((result)=>{
    if(result){
      this.cartData.emit([]);
    }

  })

}

CancleOrder(orderId:number){
  return this.http.delete('http://localhost:3000/order/'+orderId);
}
  
}
