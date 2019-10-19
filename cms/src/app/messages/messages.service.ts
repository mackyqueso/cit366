import { Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  
  private messages: Message[] = [];

  constructor() { }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id:string): Message {
    for (const message of this.messages){
      if (id = message.id) {
        return message;
      }
    }
    return null;
  }
}
