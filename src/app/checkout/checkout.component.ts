import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { JsonpClientBackend } from '@angular/common/http';
import { cart, order } from '../data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 
  totalPrice:number|undefined
  cartdata:cart[]|undefined
  orderSMS:string|undefined
  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{

      let price = 0;
      this.cartdata=result
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
  
        }
        
      });
      this.totalPrice=price+(price/10)+100-(price/10);
     
    })

  
  }

  orderNow(data:order){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order ={
        ...data,
        totalPrice:this.totalPrice,
        userId,
       
        
      }

      this.cartdata?.forEach((item)=>{
        setTimeout(()=>{
          this.product.deleteCartItem(item.id);
        },600)
         
      })
      this.product.orderNow(orderData).subscribe((result)=>{  //
        if(result){
          this.orderSMS="Your order has been placed";
          setTimeout(()=>{
            this.router.navigate(['/myorder']);
            this.orderSMS=undefined;
          })
        }

      })
    }
 
  }
}
