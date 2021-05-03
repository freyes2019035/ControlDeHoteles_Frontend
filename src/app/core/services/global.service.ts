import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  setIdentity(identity){
    localStorage.setItem('identity', JSON.stringify(identity))
  }
  setToken(token){
    localStorage.setItem('token', token);
  }
  getToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token')
    }else{
      return 'we dont found a token'
    }
  }
}
