import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/shared/event.model';
import { EventService } from '../event.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: string;
  eventDate: string;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.eventService.getEvent(this.id)
            .subscribe(eventData => {
              this.event = eventData.event;
              this.eventDate = new Date(eventData.event.date).toDateString();
            });
    });
  }

  onDelete() {
    this.eventService.deleteEvent(this.event);
    this.router.navigate(['/events'], {relativeTo: this.route});
  }
}
