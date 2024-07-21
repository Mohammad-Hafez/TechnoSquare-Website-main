import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorImageService {

  constructor(private http: HttpClient , private tokenService: TokenService) { }

  uploadImage(img:any): Observable<any>{
    const apiUrl = `${API_BASE_URL}/instructor_image`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });
    return this.http.post<any>(apiUrl, img ,{ headers });  

  }
}
