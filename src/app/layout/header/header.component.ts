import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class PageHeaderComponent {
  activatedRoute = '';

  constructor(private router: Router) {
    this.activatedRoute = this.router.url;
  }

  get headerTitle() {
    if (this.activatedRoute.includes('/courses')) {
      return 'Courses';
    } else if (this.activatedRoute.includes('events')) {
      return 'Events';
    } else if (this.activatedRoute.includes('contact-us')) {
      return 'Contact Us';
    } else if (this.activatedRoute.includes('about-us')) {
      return 'About Us';
    } else {
      return '404 Page Not Found';
    }
  }
}
