import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsAttendanceService {

  constructor(private http: HttpClient , private tokenService: TokenService) { }

  setAttendance(id: string | undefined , resD:any): Observable<any> {
    const apiUrl = `${API_BASE_URL}/students_attendance/${id}`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    return this.http.post<any>(apiUrl,{"student_ids": resD},{ headers });  
  }

}
