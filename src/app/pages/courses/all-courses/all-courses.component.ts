import { Component } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { Course } from '../../../core/models/course';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css',
})
export class AllCoursesComponent {
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
