import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../layout/header/header.component';
import { Events } from '../../core/models/event';
import { EventsService } from '../../core/services/events.service';
import { EventsCardComponent } from './events-card/events-card.component';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  imports: [PageHeaderComponent, EventsCardComponent],
})
export class EventsComponent {
  events: Events[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (events) => {
        this.events = events.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
