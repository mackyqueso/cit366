import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new Subject<Message[]>();
  private maxMessageId: number;
  private messages: Message[] = [];

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
   }

  storeMessages(){
    this.messages = JSON.parse(JSON.stringify(this.messages));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('http://localhost:3000/messages', this.messages, {headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  getMessages() {
    this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        (res) => {
          this.messages = res.messages;
          this.messages.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  getMessage(id:string): Message {
    for (const message of this.messages){
      if (message.id == id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newMessage.id = '';
    const strMessage = JSON.stringify(newMessage);

    this.http.post<{ jsMessage: string, message: Message}>
    ('http://localhost:3000/documents', strMessage, { headers: headers })
     .subscribe(
       (responseData) => {
         this.messages.push(responseData.message);
         this.messageChangedEvent.next(this.messages.slice());
       });
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

   return maxId;
  }

}
