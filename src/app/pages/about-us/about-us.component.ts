import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../layout/header/header.component';
import { AccordionComponent } from './accordion/accordion.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  imports: [PageHeaderComponent, AccordionComponent],
})
export class AboutUsComponent {}
