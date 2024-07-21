import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../layout/nav-bar/nav-bar.component';
import { FooterComponent } from '../layout/footer/footer.component';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css',
})
export class WebsiteComponent {
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
