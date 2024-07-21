import { SessionFeedbackService } from './../../../../core/services/session-feedback.service';
import { GetSessionsService } from './../../../../core/services/get-sessions.service';
import { SetStudentGradeService } from './../../../../core/services/set-student-grade.service';
import { SendStudentCommentService } from './../../../../core/services/send-student-comment.service';
import { AgeCalculatorService } from './../../../../core/services/calc-age.service';
import { CourseStudentsService } from './../../../../core/services/course-students.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Student } from '../../../../core/models/student';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { StudentsAttendanceService } from '../../../../core/services/students-attendance.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Session } from '../../../../core/models/session';
import { SelectedStudent } from '../../../../core/models/selectedStudent';

@Component({
  selector: 'app-course-students',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RouterLink,
    ButtonModule,
    FormsModule,
    DialogModule,
    ToastModule,
    InputTextareaModule,
  ],
  templateUrl: './course-students.component.html',
  styleUrls: [
    './course-students.component.css',
    '../../dashboard.component.css',
  ],
  providers: [MessageService],
})
export class CourseStudentsComponent implements OnInit {
  @Input() id?: number;

  students: Student[] = [];
  selectedStudents: SelectedStudent[] = [];
  selectedSession: string = '';
  selectedFeedbackSession: string = '';
  selectedCommentSession: string = '';
  commentVisible: boolean = false;
  gradeVisible: boolean = false;
  feedbackVisible: boolean = false;
  feedback: string = '';
  comment: string = '';
  grade: string = '';
  sessions: Session[] = [];
  firstSelectableSessionIndex: number | null = null;
  allSessionsHaveAttendance: boolean = false;
  rowDataForComment: any;
  rowDataForGrade: any;

  constructor(
    private courseStudentsService: CourseStudentsService,
    private ageCalculatorService: AgeCalculatorService,
    private studentsAttendanceService: StudentsAttendanceService,
    private sendStudentCommentService: SendStudentCommentService,
    private sessionFeedbackService:SessionFeedbackService,
    private setStudentGradeService: SetStudentGradeService,
    private getSessionsService: GetSessionsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchSessions();
  }

  // *NOTE - Get all students for specific course
  fetchStudents(): void {
    this.courseStudentsService.getCourseStudents(this.id).subscribe({
      next: (res) => {
        this.students = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  fetchSessions(): void {
    this.getSessionsService.getSessions(this.id).subscribe({
      next: (res) => {
        this.sessions = res.data;
        this.setFirstSelectableSessionIndex();
        this.checkAllSessionsAttendance();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  setFirstSelectableSessionIndex() {
    this.firstSelectableSessionIndex = this.sessions.findIndex(
      (session) => session.students_attendance === 0
    );
  }

  checkAllSessionsAttendance() {
    this.allSessionsHaveAttendance = this.sessions.every(
      (session) => session.students_attendance === 1
    );
  }

  // *NOTE - Calc the Age from Birth date
  calculateAge(dateOfBirth: string): number {
    return this.ageCalculatorService.calculateAge(dateOfBirth);
  }

  // *NOTE - Submit the Attendence for all students
  onSubmitAttendance() {
    const selectedStudentsData = this.selectedStudents.map((student) =>
      student.id.toString()
    );
    this.studentsAttendanceService
      .setAttendance(this.selectedSession, selectedStudentsData)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Attendance submitted successfully',
          });
          this.selectedSession = '';
          this.selectedStudents = [];
          this.fetchSessions();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to submit attendance',
          });
          console.error(err);
        },
      });
  }

  // *NOTE - Submit Comment to Student
  onSubmitComment(students: number[], comment: string) {
    let userIdArray = Array.isArray(students) ? students : [students];
    let resD = {
      user_id: userIdArray,
      comment: comment,
    };
    this.sendStudentCommentService
      .sendComment(this.selectedCommentSession, resD)
      .subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Comment Sent successfully',
          });
          this.selectedCommentSession = '';
          this.comment = '';
          this.commentVisible = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to Send Comment',
          });
          console.error(err);
        },
      });
  }

    // *NOTE - Submit Session Feedback
    onSubmitFeedback(feedback: string) {
      this.sessionFeedbackService
      .sendFeedback(this.selectedFeedbackSession, feedback)
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Feedback Sent successfully',
            });
            this.selectedFeedbackSession = '';
            this.feedback = '';
            this.feedbackVisible = false;
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to Send feedback',
            });
            console.error(err);
          },
        });
    }
  

  // *NOTE - Sunmit Comment to Student
  onSubmitGrades(student: number, grade: string) {
    let formData = new FormData();
    formData.append('user_id', student.toString());
    formData.append('grade', grade);
    this.setStudentGradeService.setGrade(this.id, formData).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Grade Set successfully',
        });
        this.gradeVisible = false;
        this.comment = '';
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to Send Comment',
        });
        console.error(err);
      },
    });
  }

  // *NOTE - Show Dialogs for grades & Comments
  showCommentDialog(rowData: any) {
    this.rowDataForComment = rowData; // Store the rowData
    this.commentVisible = true;
  }
  showFeedbackDialog(){
    this.feedbackVisible = true;
  }
  clearTextarea() {
    this.comment = '';
    this.selectedCommentSession = '';
  }
  showGradeDialog(data: any) {
    this.rowDataForGrade = data;
    this.gradeVisible = true;
  }
  clearGrade() {
    this.grade = '';
  }
  clearFeedback() {
    this.feedback = '';
    this.selectedFeedbackSession = '';
  }

}
