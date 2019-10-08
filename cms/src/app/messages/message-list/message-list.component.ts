import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(2, 'Free Pizza', 'Hey do you want some pizza?', 'Bro. Thayne'),
    new Message(3, 'Pizza Canceled', 'Never mind, I ate it.', 'Bro. Thayne'),
    new Message(4, 'Sup', 'Hey man hows it going', 'Bro. Thayne')
  ]

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
