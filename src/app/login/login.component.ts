import { Component, OnInit } from '@angular/core';
import { SignUp, cart, loge, product } from '../data.type';
import { UserService } from '../useredservice/user.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isShowsLogin:boolean = true;
  isautherror: string = '';
  user:string='';
  constructor(private userservice: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }
  //regitser form
  SignUp(data: SignUp) {

    this.userservice.usersignup(data);

  }
  onOpenSignup(){
    this.isShowsLogin=false;

  }


  /*its user login fuction */

  UserLoging(Userdata: loge) {
    this.userservice.userlogin(Userdata);
    this.userservice.isLoginerror.subscribe((result) => {
      if (result) {
        this.isautherror = "please enter valid user details";
      } else {
        console.log("its loging ")
        this.localCartToRemoteCart();
      }
    })

  }

 
  onOpenLogin(){
 this.isShowsLogin=true;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    console.log(userId);
    if (data) {
      let cartDataList: product[] = JSON.parse(data);


      cartDataList.forEach((product: product, index) => {
        let cartdata: cart = {
          ...product,
          productId: product.id,
          userId,
          quantity: undefined
        };

        delete cartdata.id;
        setTimeout(() => {
          console.log("data stored");
          this.product.addtocart(cartdata).subscribe((result) => {
            if (result) {
              console.log("Item store in DB")
            }

          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
            console.log("data is removed");
          }
        }, 500);

      });


    }
    setTimeout(()=>{
      
      this.product.getCartList(userId);

    },2000)
    
    

  }


}
