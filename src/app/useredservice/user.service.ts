import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp, loge } from '../data.type';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoginerror=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router:Router) { }

 usersignup(user:SignUp){
    this.http.post('http://localhost:3000/user',user,{observe:'response'}).subscribe((result)=>
    {
      if(result){
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/']);}
    })
 }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']); 
    }

  }

  userlogin(data:loge){
    this.http.get<SignUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
    { observe: 'response' }).subscribe((result)=>{
      if (result && result.body?.length ) {
        localStorage.setItem('user', JSON.stringify(result.body[0])) //its storage data in browser localstorage
        this.router.navigate(['/']);
        this.isLoginerror.emit(false);
       }else{
        this.isLoginerror.emit(true);
       }

    } )
  }
}

