import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  
  private contacts: Contact[] = [];
  private maxId: number;
  private maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
   }

   getContact(id:string): Contact {
     for (const contact of this.contacts){
       if (contact.id == id) {
         return contact;
       }
     }
     return null;
   }

   addContact(newContact) {
    if (newContact === null) {
      return;
    }
    
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();

    this.contactChangedEvent.next(contactsListClone);
   }

   deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
   }

   getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

   return maxId;
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact)
    if (pos < 0 ) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactListClone);
  }
}
