import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../core/models/course';
import { CoursesService } from '../../../core/services/courses.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  @Input() id?: number;
  course!: Course;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.fetchSingleCourse();
  }

  fetchSingleCourse(): void {
    this.coursesService.getSelectedCourse(this.id).subscribe({
      next: (course) => {
        this.course = course.data;
        console.log(course.data);
        
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  scrollToEnroll() {
    document.getElementById('enroll')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
