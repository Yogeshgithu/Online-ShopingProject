import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResulted:undefined|product[];

  constructor(private activeroute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let query=this.activeroute.snapshot.paramMap.get('query');
    query && this.product.searchproductdata(query).subscribe((result)=>
    {
        this.searchResulted=result;
    })
  }

}
