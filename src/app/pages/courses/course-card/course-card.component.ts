import { Component, Input } from '@angular/core';
import { Course } from '../../../core/models/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() course!: Course;
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
