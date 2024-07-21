import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NavBarComponent, HomeComponent, FooterComponent],
})
export class AppComponent {
  title = 'techno-square';
  ngOnInit() {
    AOS.init({
      // once: true,
      offset: 100,
      delay: 150,
      duration: 550,
      easing: 'ease-in-out',
    });
    AOS.refresh();
  }
}
