import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Event } from 'src/app/shared/event.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  originalEvent: Event;
  event: Event;
  editMode: boolean = false;
  id: string;

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          if (!this.id) {
            this.editMode = false;
            return;
          }
          this.eventService.getEvent(this.id)
            .subscribe(eventData => {
              console.log(eventData)
              this.originalEvent = eventData.event;
            
          if (!this.originalEvent) {
            return;
          }
          this.editMode = true;
          this.event = JSON.parse(JSON.stringify(this.originalEvent));
          console.log(this.event);
        }
      );
        });
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newEvent = new Event(null, value.id, value.name, value.date, value.description)

    if(this.editMode === true){
      this.eventService.updateEvent(this.originalEvent, newEvent);
    } else {
      this.eventService.addEvent(newEvent);
    }

    this.router.navigate(['/events']);
  }

  onCancel() {
    this.router.navigate(['/events']);
  }

}
