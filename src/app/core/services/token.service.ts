import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants/constansts';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() { 
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean){
    this.isAuthentication.next(status);
  }

  setToken(token: string){
    this.updateToken(true);
    localStorage.setItem(constants.TECHNO_TOKEN,token);
  }
  
  getToken():string | null{
    return localStorage.getItem(constants.TECHNO_TOKEN) || null;
  }

  removeToken(){
    this.updateToken(false);
    return localStorage.removeItem(constants.TECHNO_TOKEN)
  }
}
