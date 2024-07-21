import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor() {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.userRoleSubject.next(storedRole);
    }
  }

  setUserRole(role: string) {
    this.userRoleSubject.next(role);
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }
}