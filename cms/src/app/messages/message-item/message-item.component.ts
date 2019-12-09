import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = "";

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    console.log(this.message.id);
    this.contactService.getContact(this.message.id)
    .subscribe(contactData => {
      this.messageSender = contactData.contact.name;
    });
    
  }


}
