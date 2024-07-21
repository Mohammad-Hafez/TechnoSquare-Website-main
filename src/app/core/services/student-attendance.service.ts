import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { API_BASE_URL } from '../../api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getStudentAttendance(id:string): Observable<any> {
    const apiUrl = `${API_BASE_URL}/student_attendance/${id}`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });

    return this.http.get<any>(apiUrl, { headers });
  }

}
