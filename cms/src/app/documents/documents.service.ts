import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document[]>();
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
    this.http.put('http://localhost:3000/documents', this.documents, {headers: header})
      .subscribe(
        (documents: Document[]) => {
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
   }

   getDocuments() {
     this.http.get<{message: string, documents: Document[]}>('http://localhost:3000/documents')
      .subscribe(
        (res) => {
          this.documents = res.documents;
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
     if (!newDocument) {
       return;
     }

     const headers = new HttpHeaders({
       'Content-Type': 'application/json'
     });

     newDocument.id = '';
     const strDocument = JSON.stringify(newDocument);

     this.http.post<{ message: string, document: Document}>
     ('http://localhost:3000/documents', strDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.documentChangedEvent.next(this.documents.slice());
        }); 
   }

   deleteDocument(document: Document) {
     if (!document) {
       return;
     }

     const pos = this.documents.findIndex(d => d.id === document.id);

    this.http.delete('http://localhost:3000/documents' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documentChangedEvent.next(this.documents.slice());
        });   
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
     if (!originalDocument || !newDocument) {
       return;
     }

     const pos = this.documents.indexOf(originalDocument);
     if (pos < 0) {
       return;
     }

     const headers = new HttpHeaders({
       'Content-Type': 'application/json'
     });

     const strDocument = JSON.stringify(newDocument);

     this.http.patch('http://localhost:3000/documents' + originalDocument.id
                    , strDocument
                    , {headers: headers})
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

}
