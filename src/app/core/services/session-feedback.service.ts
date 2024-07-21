import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SessionFeedbackService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  sendFeedback(session:string | undefined, resD:string): Observable<any> {
    const apiUrl = `${API_BASE_URL}/session_comment/${session}`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });
    return this.http.post<any>(
      apiUrl,
      { comment: resD },
      { headers }
    );
  }
}
