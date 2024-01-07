import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, loge } from '../data.type';
import { BehaviorSubject } from 'rxjs';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginerror=new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {                                  //without reuturn data we get data here help oberve 
    let result = this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body)) //its storage data in browser localstorage
      this.router.navigate(['seller-data']);
      console.log("result", result);
    })

  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-data']);   //when it data present in browser and we refresh then without login then go priveous page
      // that time call reloadSeller()
    }
  }
  logingdata(data: loge) {
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((resulte: any) => {
        console.log(resulte)
        if (resulte && resulte.body && resulte.body.length) {
          localStorage.setItem('seller', JSON.stringify(resulte.body)) //its storage data in browser localstorage
          this.router.navigate(['seller-data']);
          console.log("seller logged successfully");
        } else {
          console.log("seller logged failes");
           this.isLoginerror.emit(true);
        }                                            //match query and  get data
      }); 
  }




}
