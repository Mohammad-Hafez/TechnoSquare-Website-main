import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();
  private userImageSubject = new BehaviorSubject<string>('');
  userImage$ = this.userImageSubject.asObservable();

  constructor() {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.userNameSubject.next(storedName);
    }

    const storedImage = localStorage.getItem('userImage');
    if (storedImage) {
      this.userImageSubject.next(storedImage);
    }
  }

  setUserName(name: string) {
    this.userNameSubject.next(name);
    localStorage.setItem('userName', name);
  }

  getUserName(): string {
    return this.userNameSubject.value;
  }

  setUserImage(image: string) {
    this.userImageSubject.next(image);
    localStorage.setItem('userImage', image);
  }

  getUserImage(): string {
    return this.userImageSubject.value;
  }
}
