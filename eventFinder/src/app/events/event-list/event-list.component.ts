import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from 'src/app/shared/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {

  events: Event[] = [];
  private subscription: Subscription;

  constructor(private eventService: EventService) { 
  }

  ngOnInit() {
    this.eventService.getEvents();
    this.subscription = this.eventService.eventChangedEvent
      .subscribe(
        (eventsList: Event[]) => {
          this.events = eventsList;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
