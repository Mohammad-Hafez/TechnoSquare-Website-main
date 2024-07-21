import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SetStudentGradeService {

  constructor(private http: HttpClient , private tokenService: TokenService) { }

  setGrade(course:number | undefined, resD:FormData): Observable<any> {
    const apiUrl = `${API_BASE_URL}/student_grade/${course}`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });
    return this.http.post<any>(apiUrl, resD ,{ headers });  
  }
}
