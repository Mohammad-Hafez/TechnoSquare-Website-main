import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-why-technosquare',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './why-technosquare.component.html',
  styleUrl: './why-technosquare.component.css',
})
export class WhyTechnosquareComponent {
  faCheck = faCheck;
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  faInstagram = faInstagram;
}
