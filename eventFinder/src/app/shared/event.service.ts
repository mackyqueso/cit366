import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventChangedEvent= new Subject<Event[]>();
  private maxEventId: number;
  private events: Event[] = [];

  constructor(private http: HttpClient) {
    this.maxEventId = this.getMaxId();
  }

  storeEvents() {

  }

  getEvents(){

  }

  getEvent() {

  }

  addEvent() {

  }

  updateEvent() {
    
  }

  getMaxId(): number {
    let maxId = 0;
    for (const event of this.events) {
      const currentId = parseInt(event.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

   return maxId;
  }
}
