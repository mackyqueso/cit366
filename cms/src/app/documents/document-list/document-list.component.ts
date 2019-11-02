import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  private subcription: Subscription;

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
   }

  ngOnInit() {
    this.subcription = this.documentService.documentChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      )
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
