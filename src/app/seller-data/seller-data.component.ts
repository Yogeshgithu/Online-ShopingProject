import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';


@Component({
  selector: 'app-seller-data',
  templateUrl: './seller-data.component.html',
  styleUrls: ['./seller-data.component.css']
})
export class SellerDataComponent implements OnInit {
  addProductMessage: string | undefined;
  productListed:undefined|product[];

  constructor(private producte:ProductService) { }

  ngOnInit(): void {
   this.List(); //delete API call because we not call that resion we call ngOnInit method
  }
  deleteProduct(id:number)
  {
   
    this.producte.deleted(id).subscribe((result)=>{
      this.addProductMessage="product deleted successfully";
      this.List();              //without refresh page deleted here that reasion create metrhod
    });
    setTimeout(()=>{
      this.addProductMessage=undefined
    },3000);
  }

  List(){

    this.producte.productList().subscribe((result)=>{
      console.log(result);
      this.productListed=result;
    })
  }

}
