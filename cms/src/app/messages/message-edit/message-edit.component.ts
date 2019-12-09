import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  public currentSender = new Contact(
    '5de2f5bbd2033e53d4a0cd5a',
    '101',
    'Mack Housewright',
    'hou16011@byui.edu',
    '760-574-6022',
    'https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/p960x960/57170631_10216412198209206_5717625983884853248_o.jpg?_nc_cat=106&_nc_ohc=LpYl9JbISXUAQnda1B2PZNcZbJ9Kxfg5-pdxuENzxwk9kEkMInlSZX_qg&_nc_ht=scontent-sea1-1.xx&oh=4ac3a3539ce45d9d3d74b247f57a5d81&oe=5E7752FA',
    null
  );

  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();



  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const message = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('','1', subject, message, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectRef = null;
    this.msgTextRef = null;
  }
}
