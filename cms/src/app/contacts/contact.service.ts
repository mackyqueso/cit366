import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact[]>();
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
    this.http.put('http://localhost:3000/contacts', this.contacts, {headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
   }

   getContacts() {
    this.http.get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe(
      (res) => {
        console.log("res", res)
        this.contacts = res.contacts;
        this.contacts.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
        this.contactChangedEvent.next(this.contacts.slice());
      }
    );
     }

   getContact(id:string) {
     return this.http.get<{message: string, contact: Contact}>('http://localhost:3000/contacts/' + id);
   }

   addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newContact.id = '';
    const strContact = JSON.stringify(newContact);

    this.http.post<{ message: string, contact: Contact}>
    ('http://localhost:3000/contacts', strContact, { headers: headers })
     .subscribe(
       (responseData) => {
         this.contacts.push(responseData.contact);
         this.contactChangedEvent.next(this.contacts.slice());
       }); 
  }
    

   deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

   this.http.delete('http://localhost:3000/contacts' + contact.id)
     .subscribe(
       (response: Response) => {
         this.contacts.splice(pos, 1);
         this.contactChangedEvent.next(this.contacts.slice());
       });
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
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/contact' + originalContact.id
                   , strContact
                   , {headers: headers})
     .subscribe(
       (response: Response) => {
         this.contacts[pos] = newContact;
         this.contactChangedEvent.next(this.contacts.slice());
       });
  }
}
