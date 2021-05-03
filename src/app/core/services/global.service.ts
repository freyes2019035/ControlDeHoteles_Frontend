import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  setIdentity(identity){
    localStorage.setItem('identity', JSON.stringify(identity))
  }
  getIdentity(){
    if(localStorage.getItem('identity')){
      return localStorage.getItem('identity');
    }else{
      return false;
    }
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