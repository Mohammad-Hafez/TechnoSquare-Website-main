import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CoursesSectionComponent } from './courses-section/courses-section.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { RouterOutlet } from '@angular/router';
import { WhyTechnosquareComponent } from './why-technosquare/why-technosquare.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { OurProgramComponent } from './our-program/our-program.component';
import { AchievementsComponent } from './achievements/achievements.component';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CoursesSectionComponent,
    GallerySectionComponent,
    TestimonialsSectionComponent,
    WhyTechnosquareComponent,
    FeaturesSectionComponent,
    OurProgramComponent,
    AchievementsComponent,
  ],
})
export class HomeComponent {}
