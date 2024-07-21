import { Component } from '@angular/core';
import { StudentCoursesService } from '../../../../core/services/student-courses.service';
import { StudentCourse } from '../../../../core/models/studentCourse';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetStudentGradeService } from '../../../../core/services/get-student-grade.service';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [TableModule, CommonModule, RouterLink],
  templateUrl: './my-courses.component.html',
  styleUrls: [
    './my-courses.component.css',
    '../../dashboard.component.css',
    '../../instructor/my-courses/my-courses.component.css',
  ],
})
export class MyCoursesComponent {
  studentCourses: StudentCourse[] = [];
  virtualInstructorCourses: StudentCourse[] = [];
  grades: { [key: string]: number } = {};

  constructor(
    private studentCoursesService: StudentCoursesService,
    private getStudentGradeService: GetStudentGradeService
  ) {}

  ngOnInit() {
    this.fetchCourses();
    this.virtualInstructorCourses = Array.from({ length: 10 });
  }

  fetchCourses(): void {
    this.studentCoursesService.getStudentCourses().subscribe({
      next: (course) => {
        this.studentCourses = course?.data;
        this.studentCourses.forEach(course => {
          this.fetchGrades(course.id);
        });
      },
      error: (err) => {
        console.error(err?.message);
      },
    });
  }

  fetchGrades(courseId: any):void {
    this.getStudentGradeService.getStudentGrades(courseId).subscribe({
      next: (grade) => {
        this.grades[courseId] = grade?.grade[0].grade;
      },
      error: (err) => {
        console.error(err?.message);
      },
    });
  }

  getGrade(courseId: string): number | undefined {
    return this.grades[courseId];
  }

}
