import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../layout/header/header.component';
import { CoursesService } from '../../core/services/courses.service';
import { CourseCardComponent } from './course-card/course-card.component';
import { Course } from '../../core/models/course';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [PageHeaderComponent, CourseCardComponent, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
