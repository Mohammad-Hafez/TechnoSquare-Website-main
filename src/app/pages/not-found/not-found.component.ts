import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  imports: [PageHeaderComponent],
})
export class NotFoundComponent {}
