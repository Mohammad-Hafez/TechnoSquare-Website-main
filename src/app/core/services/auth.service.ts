import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserLogin, UserLoginResponse } from '../models/auth';
import { apiEndpoint } from '../constants/constansts';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenSrevice: TokenService, private http: HttpClient) { }

  onStudentLogin(data: UserLogin) {
    return this.http
      .post<UserLoginResponse>(`${apiEndpoint.AuthEndpoint.student_login}` , data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenSrevice.setToken(response.access_token)
          }
          return response;
        })
      )
  }

  onInstructorLogin(data: UserLogin) {
    return this.http
      .post<UserLoginResponse>(`${apiEndpoint.AuthEndpoint.instructor_login}`, data)
        .pipe(
          map((response) => {
            if (response) {
              this.tokenSrevice.setToken(response.access_token);
            }
            return response;
          })
      )
  }

  onStudentLogout() {
    const headers = new HttpHeaders({
      'Content-type':'application/json',
      Authorization : `Bearer ${this.tokenSrevice.getToken()}`
    })
    this.http.post(`${apiEndpoint.AuthEndpoint.student_logout}`,{}, { headers }).subscribe({
      next: (response) => {
        this.tokenSrevice.removeToken();
        localStorage.removeItem('userRole')
      },
    });
  }

  onInstructorLogout() {
    const headers = new HttpHeaders({
      'Content-type':'application/json',
      Authorization : `Bearer ${this.tokenSrevice.getToken()}`
    })
    return this.http.post(`${apiEndpoint.AuthEndpoint.instructor_logout}`,{}, { headers }).subscribe({
      next: (response) => {
        this.tokenSrevice.removeToken();
        return response;
      },
    });

  }

}
