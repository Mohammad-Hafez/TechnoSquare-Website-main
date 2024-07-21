import { Component, Input, OnInit } from '@angular/core';
import { GetSessionsService } from '../../../../core/services/get-sessions.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Session } from '../../../../core/models/session';
import { GetStudentCommentsService } from '../../../../core/services/get-student-comments.service';
import { StudentAttendanceService } from '../../../../core/services/student-attendance.service';

@Component({
  selector: 'app-student-comments',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './student-comments.component.html',
  styleUrls: ['./student-comments.component.css']
})
export class StudentCommentsComponent implements OnInit {
  @Input() id?: number;
  sessions: Session[] = [];
  comments: { [key: string]: string } = {};
  attendance: { [key: string]: string } = {};

  constructor(
    private getSessionsService: GetSessionsService,
    private studentAttendanceService: StudentAttendanceService,
    private getStudentCommentsService: GetStudentCommentsService
  ) {}

  ngOnInit(): void {
    this.fetchSessions();
  }

  fetchSessions(): void {
    this.getSessionsService.getSessions(this.id).subscribe({
      next: (res) => {
        this.sessions = res.data;
        this.sessions.forEach(session => {
          this.fetchComments(session.id);
          this.fetchAttendance(session.id);
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchComments(sessionId?: number): void {
    if (sessionId !== undefined) {
      this.getStudentCommentsService.getStudentComments(sessionId.toString()).subscribe({
        next: (res) => {
          this.comments[sessionId] = res.comment[0]?.comment || 'No comments';
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getComment(sessionId?: number): string {
    return sessionId !== undefined ? this.comments[sessionId] || 'Loading...' : 'No ID';
  }

  fetchAttendance(sessionId?: number): void {
    if (sessionId !== undefined) {
      this.studentAttendanceService.getStudentAttendance(sessionId.toString()).subscribe({
        next: (res) => {
          this.attendance[sessionId] = res.attendance[0].attendance ? "True" : "False";
          console.log(res.attendance[0].attendance);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  getAttendance(sessionId?: number): string {
    return sessionId !== undefined ? this.attendance[sessionId] || 'Loading...' : 'No ID';
  }

}
