import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api.config';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/courses`);
  }

  getSelectedCourse(id: number | undefined): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/courses/${id}`);
  }
}
