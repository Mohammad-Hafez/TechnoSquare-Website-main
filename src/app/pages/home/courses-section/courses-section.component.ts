import { CoursesService } from '../../../core/services/courses.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseCardComponent } from '../../courses/course-card/course-card.component';
import { Course } from '../../../core/models/course';

@Component({
  selector: 'app-courses-section',
  standalone: true,
  imports: [RouterLink, CommonModule, CourseCardComponent],
  templateUrl: './courses-section.component.html',
  styleUrl: './courses-section.component.css',
})
export class CoursesSectionComponent {
  courses: Course[] = [];
  constructor(private coursesService: CoursesService) {}
  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses.data.slice(0, 4);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
