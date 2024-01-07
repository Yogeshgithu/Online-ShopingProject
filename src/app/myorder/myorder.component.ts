import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data.type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  orderdata:order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
    
  }
  CancleOrder(orderId:number|undefined){
  orderId && this.product.CancleOrder(orderId).subscribe((result)=>{
    this.getOrderList();
   
  })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderdata=result;
    })
  }

}
