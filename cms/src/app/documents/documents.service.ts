import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  private maxId: number;
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   storeDocuments() {
    this.documents = JSON.parse(JSON.stringify(this.documents));
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://mshcms-45003.firebaseio.com/documents.json', this.documents, {headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
   }

   getDocuments() {
     this.http.get<Document[]>('https://mshcms-45003.firebaseio.com/documents.json')
      .subscribe(
        (res) => {
          this.documents = res;
          this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
     
   }

   getDocument(id:string): Document {
    for (const document of this.documents){
      if (document.id == id) {
        return document;
      }
    }
    return null;
   }

   addDocument(newDocument: Document) {
     if (newDocument === null) {
       return;
     }
     
     this.maxDocumentId++;
     newDocument.id = this.maxDocumentId.toString();
     this.documents.push(newDocument);
     this.storeDocuments();

   }

   deleteDocument(document: Document) {
     if (document === null) {
       return;
     }

     const pos = this.documents.indexOf(document);
     if (pos < 0) {
       return;
     }

     this.documents.splice(pos, 1);
     this.storeDocuments();
     
   }

   getMaxId(): number {
     let maxId = 0;
     for (const document of this.documents) {
       const currentId = parseInt(document.id, 10);
       if (currentId > maxId) {
         maxId = currentId;
       }
     }

    return maxId;
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
     if (originalDocument === null || newDocument === null) {
       return;
     }

     let pos = this.documents.indexOf(originalDocument)
     if (pos < 0 ) {
       return;
     }

     newDocument.id = originalDocument.id;
     this.documents[pos] = newDocument;
     this.storeDocuments();
   }
}
