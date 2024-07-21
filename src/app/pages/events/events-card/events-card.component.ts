import { Component, Input } from '@angular/core';
import { Events } from '../../../core/models/event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './events-card.component.html',
  styleUrl: './events-card.component.css',
})
export class EventsCardComponent {
  @Input() event!: Events;
}
