import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from '../shared/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventSelectedEvent = new EventEmitter<Event[]>();
  eventChangedEvent= new Subject<Event[]>();
  private maxEventId: number;
  private events: Event[] = [];

  constructor(private http: HttpClient) {
    this.maxEventId = this.getMaxId();
  }

  storeEvents() {
    this.events = JSON.parse(JSON.stringify(this.events));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/events', this.events, {headers: header})
    .subscribe(
      (events: Event[]) => {
        this.eventChangedEvent.next(this.events.slice());
      }
    );
  }

  getEvents(){
    this.http.get<{message: string, events: Event[]}>('http://localhost:3000/events')
    .subscribe(
      (res) => {
        this.events = res.events;
        this.events.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
        this.eventChangedEvent.next(this.events.slice());
      }
    );
  }

  getEvent(id: string): Event {
    for( const event of this.events){
      if (event.id == id) {
        return event;
      }
    }
  }

  addEvent(newEvent: Event) {
    if (!newEvent) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newEvent.id = '';
    const strEvent = JSON.stringify(newEvent);

    this.http.post<{ message: string, event: Event}>
    ('http://localhost:3000/events', strEvent, { headers: headers })
     .subscribe(
       (responseData) => {
         this.events.push(responseData.event);
         this.eventChangedEvent.next(this.events.slice());
       });

  }

  updateEvent(originalEvent: Event, newEvent: Event) {
    if (!originalEvent || !newEvent) {
      return;
    }

    const pos = this.events.indexOf(originalEvent);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strEvent = JSON.stringify(newEvent);

    this.http.patch('http://localhost:3000/events' + originalEvent.id
                   , strEvent
                   , {headers: headers})
     .subscribe(
       (response: Response) => {
         this.events[pos] = newEvent;
         this.eventChangedEvent.next(this.events.slice());
       });
  }

  deleteEvent(event: Event) {
    if (!event) {
      return;
    }

    const pos = this.events.findIndex(d => d.id === event.id);

   this.http.delete('http://localhost:3000/events' + event.id)
     .subscribe(
       (response: Response) => {
         this.events.splice(pos, 1);
         this.eventChangedEvent.next(this.events.slice());
       });
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
