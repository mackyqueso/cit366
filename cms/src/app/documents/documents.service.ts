import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxId: number;
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments(): Document[] {
     return this.documents.slice();
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
     let documentsListClone = this.documents.slice();

     this.documentChangedEvent.next(documentsListClone);

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
     this.documentChangedEvent.next(this.documents.slice());
     
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
     const documentListClone = this.documents.slice();
     this.documentChangedEvent.next(documentListClone);
   }
}
