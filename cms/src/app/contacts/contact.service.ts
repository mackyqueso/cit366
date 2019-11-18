import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  
  contacts: Contact[] = [];
  private maxId: number;
  private maxContactId: number;

  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
   }

   storeContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://mshcms-45003.firebaseio.com/contacts.json', this.contacts, {headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
   }

   getContacts() {
    this.http.get<Contact[]>('https://mshcms-45003.firebaseio.com/contacts.json')
    .subscribe(
      (res) => {
        this.contacts = res;
        this.contacts.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
      }
    );
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
    this.storeContacts();
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
    this.storeContacts();
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
    this.storeContacts();
  }
}
