import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SendStudentCommentService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  sendComment(session:string | undefined, resD:any): Observable<any> {
    const apiUrl = `${API_BASE_URL}/student_comment/${session}`;
    const userToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userToken}`,
    });
    return this.http.post<any>(
      apiUrl,
      { user_id: resD.user_id, comment: resD.comment },
      { headers }
    );
  }
}
