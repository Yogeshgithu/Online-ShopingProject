import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts:undefined|product[]

  constructor(private product:ProductService) { }
  
  ngOnInit(): void {
    this.product.Topproduct().subscribe((result)=>
    {
      this.popularProducts=result;
    })
    
  }
}
