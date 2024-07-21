import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorProfileService {

  constructor(private http: HttpClient , private tokenService: TokenService) { }

  getInstructorData(): Observable<any> {
    
    const apiUrl = `${API_BASE_URL}/instructor_profile`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.get<any>(apiUrl,{ headers });  
  }
  }