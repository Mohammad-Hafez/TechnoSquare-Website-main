import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorCourse } from '../../../../core/models/instructorCourse';
import { InstructorCoursesService } from './../../../../core/services/instructor-courses.service';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css', '../../dashboard.component.css'],
  standalone: true,
  imports: [TableModule, CommonModule, RouterLink],
})
export class MyCoursesComponent implements OnInit {
  instructorCourses: InstructorCourse[] = [];
  virtualInstructorCourses: InstructorCourse[] = [];

  constructor(private instructorCoursesService: InstructorCoursesService) {}

  ngOnInit() {
    this.fetchCourses();
    this.virtualInstructorCourses = Array.from({ length: 10 });
  }

  fetchCourses(): void {
    this.instructorCoursesService.getInstructorCourses().subscribe({
      next: (course) => {
        this.instructorCourses = course?.data;
      },
      error: (err) => {
        console.error(err?.message);
      },
    });
  }
}
