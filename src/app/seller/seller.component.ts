import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, loge } from '../data.type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  isShows = false;
  isautherror: string = '';
  constructor(private seller: SellerService, private router: Router) { }


  ngOnInit(): void {
    this.seller.reloadSeller(); //when it data present in browser and we refresh then without login then go priveous page
    // that time call reloadSeller() 
  }

  SignUp(item: SignUp): void {
    console.log(item);
    this.seller.userSignUp(item);
  }
  onOpen() {
    this.isShows = true;
  }
  onOpenSignup() {
    this.isShows = false
  }
  Loging(item: loge): void {   
    this.isautherror = '';
    this.seller.logingdata(item);
    this.seller.isLoginerror.subscribe((isError) => { //its return data from server error that take and check
      if (isError) {
        this.isautherror = 'Email or password is not correct';
      }
    })
  }
}
