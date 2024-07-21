import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import {
  faWhatsapp,
  faFacebook,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faTty,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  faWhatsapp = faWhatsapp;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
  faMapMarkerAlt = faMapMarkerAlt;
  faPhoneAlt = faPhoneAlt;
  faTty = faTty;
  faEnvelope = faEnvelope;
}
